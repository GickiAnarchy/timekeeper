import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Crypto from 'expo-crypto';
import * as SQLite from 'expo-sqlite';
import { ShiftService } from './src/services/shift-service.js';
import { SQLitePersistence } from './src/persistence/sqlite-persistence.js';

const COLORS = {
  ink: '#19332B', muted: '#61756D', green: '#1D604B', greenDark: '#164A39', mint: '#EAF4EF',
  canvas: '#F4F7F5', white: '#FFFFFF', line: '#DDE7E1', amber: '#9B5D12', amberBg: '#FFF3DD',
  red: '#A33B32', redBg: '#FCEDEA',
};
const TABS = [
  { id: 'clock', label: 'Clock', symbol: '◷' },
  { id: 'people', label: 'People', symbol: '◎' },
  { id: 'history', label: 'History', symbol: '▤' },
  { id: 'payroll', label: 'Payroll', symbol: '$' },
];

function formatMoney(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount) : '$0.00';
}
function formatHours(value) {
  const hours = Number(value);
  return Number.isFinite(hours) ? `${hours.toFixed(2)} hrs` : '—';
}
function formatDate(value, includeTime = true) {
  if (!value) return 'In progress';
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return 'Unknown date';
  return date.toLocaleString(undefined, includeTime
    ? { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }
    : { month: 'short', day: 'numeric', year: 'numeric' });
}
function employeeLabel(record) { return record?.name || 'Unknown employee'; }
function customerLabel(record) { return record?.name || 'Unknown customer'; }

function SectionTitle({ title, detail }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {detail ? <Text style={styles.sectionDetail}>{detail}</Text> : null}
    </View>
  );
}
function Field({ label, value, onChangeText, placeholder, keyboardType = 'default', multiline = false }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#8B9A93"
        keyboardType={keyboardType} multiline={multiline} style={[styles.input, multiline && styles.multilineInput]} accessibilityLabel={label} />
    </View>
  );
}
function ActionButton({ label, onPress, secondary = false, disabled = false, destructive = false }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button"
      style={({ pressed }) => [styles.actionButton, secondary && styles.secondaryButton, destructive && styles.destructiveButton, disabled && styles.disabledButton, pressed && !disabled && styles.pressedButton]}>
      <Text style={[styles.actionButtonText, secondary && styles.secondaryButtonText, destructive && styles.destructiveButtonText]}>{label}</Text>
    </Pressable>
  );
}
function ChoiceChips({ items, selectedId, onSelect, emptyLabel }) {
  if (!items.length) return <Text style={styles.emptyInline}>{emptyLabel}</Text>;
  return (
    <View style={styles.chipWrap}>
      {items.map(item => (
        <Pressable key={item.id} onPress={() => onSelect(item.id)} style={[styles.choiceChip, selectedId === item.id && styles.choiceChipSelected]}>
          <Text style={[styles.choiceChipText, selectedId === item.id && styles.choiceChipTextSelected]}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}
function EmptyCard({ title, detail }) {
  return <View style={styles.emptyCard}><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyDetail}>{detail}</Text></View>;
}

function makeService(persistence) {
  return new ShiftService({ persistence, idFactory: () => Crypto.randomUUID() });
}

export default function App() {
  const persistenceRef = useRef(null);
  const [snapshot, setSnapshot] = useState(null);
  const [tab, setTab] = useState('clock');
  const [loadError, setLoadError] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [breakMinutesByEmployee, setBreakMinutesByEmployee] = useState({});
  const [employeeName, setEmployeeName] = useState('');
  const [employeeWage, setEmployeeWage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerRate, setCustomerRate] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [customerNote, setCustomerNote] = useState('');

  useEffect(() => {
    try {
      const database = SQLite.openDatabaseSync('timekeeper.db');
      persistenceRef.current = new SQLitePersistence(database);
      setSnapshot(makeService(persistenceRef.current).getSnapshot());
    } catch (error) {
      setLoadError(error?.message || 'The local Timekeeper database could not be opened.');
    }
  }, []);

  useEffect(() => {
    if (!snapshot) return;
    if (!snapshot.employees.some(item => item.id === employeeId)) setEmployeeId(snapshot.employees[0]?.id || '');
    if (!snapshot.customers.some(item => item.id === customerId)) setCustomerId(snapshot.customers[0]?.id || '');
  }, [snapshot, employeeId, customerId]);

  const employeeMap = useMemo(() => Object.fromEntries((snapshot?.employees || []).map(item => [item.id, item])), [snapshot]);
  const customerMap = useMemo(() => Object.fromEntries((snapshot?.customers || []).map(item => [item.id, item])), [snapshot]);
  const activeShifts = useMemo(() => (snapshot?.shifts || []).filter(shift => !shift.endTime)
    .sort((a, b) => a.startTime.localeCompare(b.startTime)), [snapshot]);
  const completedShifts = useMemo(() => (snapshot?.shifts || []).filter(shift => shift.endTime)
    .sort((a, b) => b.endTime.localeCompare(a.endTime)), [snapshot]);
  const ledgerEntries = useMemo(() => (snapshot?.ledgerEntries || [])
    .slice().sort((a, b) => `${b.date}${b.id}`.localeCompare(`${a.date}${a.id}`)), [snapshot]);

  function perform(action) {
    if (!persistenceRef.current) {
      Alert.alert('Not ready yet', 'The local database is still opening. Try again in a moment.');
      return null;
    }
    try {
      const service = makeService(persistenceRef.current);
      const result = action(service);
      setSnapshot(service.getSnapshot());
      return result;
    } catch (error) {
      Alert.alert('Could not complete that action', error?.message || 'Please check the values and try again.');
      return null;
    }
  }

  function addEmployee() {
    if (!employeeName.trim() || employeeWage.trim() === '') {
      Alert.alert('Missing details', 'Enter an employee name and hourly wage.');
      return;
    }
    const added = perform(service => service.addEmployee(employeeName, employeeWage));
    if (added) {
      setEmployeeName('');
      setEmployeeWage('');
      setEmployeeId(added.id);
      Alert.alert('Saved', 'Employee added.');
    }
  }

  function addCustomer() {
    if (!customerName.trim() || customerRate.trim() === '') {
      Alert.alert('Missing details', 'Enter a customer name and billing rate.');
      return;
    }
    const added = perform(service => service.addCustomer(customerName, customerRate, {
      loc: customerLocation.trim(), note: customerNote.trim(),
    }));
    if (added) {
      setCustomerName('');
      setCustomerRate('');
      setCustomerLocation('');
      setCustomerNote('');
      setCustomerId(added.id);
      Alert.alert('Saved', 'Customer added.');
    }
  }

  function clockIn() {
    if (!employeeId || !customerId) {
      Alert.alert('Choose people first', 'Select an employee and customer before clocking in.');
      return;
    }
    const started = perform(service => service.startShift({ employeeId, customerId }));
    if (started) Alert.alert('Clocked in', `${employeeLabel(employeeMap[employeeId])} started at ${formatDate(started.startTime)}.`);
  }

  function clockOut(activeEmployeeId) {
    const result = perform(service => service.stopShift(activeEmployeeId, {
      breakDurationMinutes: Number(breakMinutesByEmployee[activeEmployeeId] ?? '0'),
    }));
    if (result) {
      Alert.alert('Shift complete', `${employeeLabel(employeeMap[activeEmployeeId])}: ${formatHours(result.shift.paidHours)} recorded and ${formatMoney(result.ledgerEntry.amount)} added to payroll.`);
    }
  }

  function renderClock() {
    const selectedActive = activeShifts.find(shift => shift.employeeId === employeeId);
    return (
      <>
        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>TODAY</Text>
          <Text style={styles.heroTitle}>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
          <Text style={styles.heroDetail}>{activeShifts.length ? `${activeShifts.length} shift${activeShifts.length === 1 ? '' : 's'} in progress` : 'Ready when you are.'}</Text>
        </View>
        <View style={styles.card}>
          <SectionTitle title="Clock in" detail="Choose who is working and where." />
          <Text style={styles.fieldLabel}>EMPLOYEE</Text>
          <ChoiceChips items={snapshot.employees} selectedId={employeeId} onSelect={setEmployeeId} emptyLabel="Add an employee in People first." />
          <Text style={[styles.fieldLabel, styles.spacedLabel]}>CUSTOMER</Text>
          <ChoiceChips items={snapshot.customers} selectedId={customerId} onSelect={setCustomerId} emptyLabel="Add a customer in People first." />
          {selectedActive ? (
            <View style={styles.notice}><Text style={styles.noticeText}>{employeeLabel(employeeMap[employeeId])} already has an active shift. Clock out before starting another.</Text></View>
          ) : (
            <ActionButton label="Clock in · rounds forward to :00, :15, :30 or :45" onPress={clockIn} disabled={!employeeId || !customerId} />
          )}
        </View>
        <View style={styles.card}>
          <SectionTitle title="Active shifts" detail="Break minutes are subtracted at clock-out." />
          {activeShifts.length === 0 ? <EmptyCard title="No one is clocked in" detail="When a shift is active, it will appear here." /> : activeShifts.map(shift => (
            <View key={shift.id} style={styles.recordCard}>
              <View style={styles.recordTopRow}>
                <View style={styles.recordMain}><Text style={styles.recordTitle}>{employeeLabel(employeeMap[shift.employeeId])}</Text><Text style={styles.recordSubtitle}>{customerLabel(customerMap[shift.customerId])}</Text></View>
                <View style={styles.liveBadge}><Text style={styles.liveBadgeText}>ACTIVE</Text></View>
              </View>
              <Text style={styles.recordMeta}>Started {formatDate(shift.startTime)}</Text>
              <View style={styles.clockOutRow}>
                <View style={styles.breakField}>
                  <Text style={styles.fieldLabel}>BREAK (MIN)</Text>
                  <TextInput value={breakMinutesByEmployee[shift.employeeId] ?? '0'} onChangeText={value => setBreakMinutesByEmployee(current => ({ ...current, [shift.employeeId]: value }))} keyboardType="number-pad" placeholder="0" style={styles.compactInput} accessibilityLabel={`Break minutes for ${employeeLabel(employeeMap[shift.employeeId])}, in 15-minute increments`} />
                </View>
                <View style={styles.clockOutButton}><ActionButton label="Clock out" destructive onPress={() => clockOut(shift.employeeId)} /></View>
              </View>
              <Text style={styles.helperText}>Use 0, 15, 30 minutes, and so on. Clock-out rounds down to the prior quarter hour.</Text>
            </View>
          ))}
        </View>
      </>
    );
  }

  function renderPeople() {
    return (
      <>
        <View style={styles.card}>
          <SectionTitle title="Employees" detail="Their wage is used for payroll." />
          <Field label="Employee name" value={employeeName} onChangeText={setEmployeeName} placeholder="e.g. Alex" />
          <Field label="Hourly wage · USD" value={employeeWage} onChangeText={setEmployeeWage} placeholder="e.g. 20.00" keyboardType="decimal-pad" />
          <ActionButton label="Add employee" onPress={addEmployee} />
          <View style={styles.listDivider} />
          {snapshot.employees.length ? snapshot.employees.map(record => (
            <View key={record.id} style={styles.personRow}>
              <View style={styles.recordMain}><Text style={styles.recordTitle}>{record.name}</Text><Text style={styles.recordSubtitle}>Payroll wage · {formatMoney(record.wage)}/hr</Text></View>
              {employeeId === record.id ? <Text style={styles.selectedTag}>SELECTED</Text> : null}
            </View>
          )) : <EmptyCard title="No employees yet" detail="Add the first person above to enable clock-in." />}
        </View>
        <View style={styles.card}>
          <SectionTitle title="Customers" detail="Customer rates are for billing only; they never affect employee payroll." />
          <Field label="Customer name" value={customerName} onChangeText={setCustomerName} placeholder="e.g. Maple Street" />
          <Field label="Hourly billing rate · USD" value={customerRate} onChangeText={setCustomerRate} placeholder="e.g. 60.00" keyboardType="decimal-pad" />
          <Field label="Location (optional)" value={customerLocation} onChangeText={setCustomerLocation} placeholder="Street or neighborhood" />
          <Field label="Note (optional)" value={customerNote} onChangeText={setCustomerNote} placeholder="Access details or reminders" multiline />
          <ActionButton label="Add customer" onPress={addCustomer} />
          <View style={styles.listDivider} />
          {snapshot.customers.length ? snapshot.customers.map(record => (
            <View key={record.id} style={styles.personRow}>
              <View style={styles.recordMain}>
                <Text style={styles.recordTitle}>{record.name}</Text>
                <Text style={styles.recordSubtitle}>{formatMoney(record.hourlyRate)}/hr billing{record.loc ? ` · ${record.loc}` : ''}</Text>
                {record.note ? <Text style={styles.recordMeta}>{record.note}</Text> : null}
              </View>
              {customerId === record.id ? <Text style={styles.selectedTag}>SELECTED</Text> : null}
            </View>
          )) : <EmptyCard title="No customers yet" detail="Add a customer above to assign work." />}
        </View>
      </>
    );
  }

  function renderHistory() {
    return (
      <View style={styles.card}>
        <SectionTitle title="Shift history" detail={`${completedShifts.length} completed shift${completedShifts.length === 1 ? '' : 's'}`} />
        {completedShifts.length === 0 ? <EmptyCard title="No completed shifts" detail="Completed shifts will be listed here with their payroll record." /> : completedShifts.map(shift => {
          const ledgerEntry = snapshot.ledgerEntries.find(entry => entry.sourceShiftId === shift.id);
          return (
            <View key={shift.id} style={styles.recordCard}>
              <View style={styles.recordTopRow}>
                <View style={styles.recordMain}><Text style={styles.recordTitle}>{employeeLabel(employeeMap[shift.employeeId])}</Text><Text style={styles.recordSubtitle}>{customerLabel(customerMap[shift.customerId])}</Text></View>
                <Text style={styles.amountText}>{formatMoney(ledgerEntry?.amount)}</Text>
              </View>
              <Text style={styles.recordMeta}>{formatDate(shift.startTime)} – {formatDate(shift.endTime)}</Text>
              <View style={styles.metricsRow}><Text style={styles.metricText}>{formatHours(shift.paidHours)}</Text><Text style={styles.metricDivider}>·</Text><Text style={styles.metricText}>{shift.breakDurationMinutes || 0} min break</Text></View>
              {ledgerEntry ? <Text style={styles.payrollLinked}>Payroll posted · {ledgerEntry.note}</Text> : <Text style={styles.missingPayroll}>Payroll entry is missing</Text>}
            </View>
          );
        })}
      </View>
    );
  }

  function renderPayroll() {
    const total = ledgerEntries.reduce((sum, entry) => sum + (entry.entryType === 'advance' ? -Number(entry.amount) : Number(entry.amount)), 0);
    return (
      <>
        <View style={styles.payrollSummary}>
          <Text style={styles.heroEyebrow}>CURRENT LEDGER TOTAL</Text>
          <Text style={styles.payrollTotal}>{formatMoney(total)}</Text>
          <Text style={styles.heroDetail}>Employee wages only · USD</Text>
        </View>
        <View style={styles.card}>
          <SectionTitle title="Payroll ledger" detail="Completed shifts post once, automatically, when clocked out." />
          {ledgerEntries.length === 0 ? <EmptyCard title="No payroll entries yet" detail="Clock out a completed shift to create its payroll entry." /> : ledgerEntries.map(entry => (
            <View key={entry.id} style={styles.ledgerRow}>
              <View style={styles.recordMain}>
                <Text style={styles.recordTitle}>{employeeLabel(employeeMap[entry.employeeId])}</Text>
                <Text style={styles.recordSubtitle}>{entry.note || 'Payroll entry'}{entry.hours != null ? ` · ${formatHours(entry.hours)}` : ''}</Text>
                <Text style={styles.recordMeta}>{formatDate(entry.date, false)}</Text>
              </View>
              <Text style={styles.amountText}>{entry.entryType === 'advance' ? '−' : ''}{formatMoney(entry.amount)}</Text>
            </View>
          ))}
        </View>
        <View style={styles.infoNote}><Text style={styles.infoNoteText}>Customer hourly billing rates are kept separate from employee wages and are not used in these payroll calculations.</Text></View>
      </>
    );
  }

  if (loadError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.greenDark} />
        <View style={styles.errorScreen}><Text style={styles.brand}>Timekeeper</Text><Text style={styles.errorTitle}>Couldn’t open local data</Text><Text style={styles.errorText}>{loadError}</Text><Text style={styles.errorText}>Saved records were not changed. Restart the app after checking the device has free storage.</Text></View>
      </SafeAreaView>
    );
  }
  if (!snapshot) {
    return <SafeAreaView style={styles.safeArea}><StatusBar barStyle="light-content" backgroundColor={COLORS.greenDark} /><View style={styles.loading}><Text style={styles.brand}>Timekeeper</Text><Text style={styles.loadingText}>Opening your on-device records…</Text></View></SafeAreaView>;
  }

  const title = TABS.find(item => item.id === tab)?.label || 'Clock';
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.greenDark} />
      <View style={styles.topBar}>
        <View><Text style={styles.brand}>Timekeeper</Text><Text style={styles.topSubtitle}>Work hours & payroll</Text></View>
        <View style={styles.localBadge}><Text style={styles.localBadgeText}>ON DEVICE</Text></View>
      </View>
      <View style={styles.screenHeading}><Text style={styles.screenTitle}>{title}</Text><Text style={styles.screenSubtitle}>Saved locally on this phone</Text></View>
      <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {tab === 'clock' ? renderClock() : null}
          {tab === 'people' ? renderPeople() : null}
          {tab === 'history' ? renderHistory() : null}
          {tab === 'payroll' ? renderPayroll() : null}
          <Text style={styles.footer}>Local device storage only · Not synced or backed up to an account</Text>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.tabBar}>
        {TABS.map(item => (
          <Pressable key={item.id} onPress={() => setTab(item.id)} accessibilityRole="tab" accessibilityState={{ selected: tab === item.id }} style={styles.tabButton}>
            <Text style={[styles.tabSymbol, tab === item.id && styles.tabSelected]}>{item.symbol}</Text>
            <Text style={[styles.tabLabel, tab === item.id && styles.tabSelected]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.canvas },
  topBar: { backgroundColor: COLORS.greenDark, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: COLORS.white, fontSize: 22, fontWeight: '800', letterSpacing: 0.2 },
  topSubtitle: { color: '#C9DDD3', fontSize: 12, marginTop: 2 },
  localBadge: { borderColor: '#75A98F', borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 },
  localBadgeText: { color: '#D9EEE2', fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
  screenHeading: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  screenTitle: { color: COLORS.ink, fontSize: 25, fontWeight: '800' },
  screenSubtitle: { color: COLORS.muted, fontSize: 13, marginTop: 2 },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 20, gap: 14 },
  heroCard: { backgroundColor: COLORS.green, padding: 20, borderRadius: 18 },
  heroEyebrow: { color: '#CDE2D7', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: COLORS.white, fontSize: 22, fontWeight: '800', marginTop: 5 },
  heroDetail: { color: '#D2E6DC', fontSize: 13, marginTop: 6 },
  card: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.line },
  sectionHeading: { marginBottom: 14 },
  sectionTitle: { color: COLORS.ink, fontSize: 18, fontWeight: '800' },
  sectionDetail: { color: COLORS.muted, fontSize: 12, lineHeight: 17, marginTop: 4 },
  fieldLabel: { color: COLORS.muted, fontSize: 10, fontWeight: '800', letterSpacing: 0.7, marginBottom: 7 },
  spacedLabel: { marginTop: 14 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choiceChip: { borderColor: COLORS.line, borderWidth: 1, borderRadius: 24, paddingHorizontal: 13, paddingVertical: 9, backgroundColor: '#FAFCFB' },
  choiceChipSelected: { backgroundColor: COLORS.mint, borderColor: COLORS.green },
  choiceChipText: { color: COLORS.ink, fontSize: 13, fontWeight: '600' },
  choiceChipTextSelected: { color: COLORS.greenDark, fontWeight: '800' },
  emptyInline: { color: COLORS.muted, fontSize: 13, paddingBottom: 4 },
  actionButton: { backgroundColor: COLORS.green, borderRadius: 12, paddingVertical: 13, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', marginTop: 14, minHeight: 46 },
  actionButtonText: { color: COLORS.white, fontSize: 14, fontWeight: '800', textAlign: 'center' },
  secondaryButton: { backgroundColor: COLORS.mint },
  secondaryButtonText: { color: COLORS.greenDark },
  destructiveButton: { backgroundColor: COLORS.redBg, borderWidth: 1, borderColor: '#F1D2CC' },
  destructiveButtonText: { color: COLORS.red },
  disabledButton: { opacity: 0.5 },
  pressedButton: { opacity: 0.78 },
  fieldGroup: { marginBottom: 12 },
  input: { minHeight: 46, borderRadius: 10, borderColor: COLORS.line, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, color: COLORS.ink, fontSize: 15, backgroundColor: '#FBFDFC' },
  multilineInput: { minHeight: 70, textAlignVertical: 'top' },
  recordCard: { borderTopWidth: 1, borderTopColor: '#E8EFEB', paddingTop: 13, paddingBottom: 12 },
  recordTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  recordMain: { flex: 1 },
  recordTitle: { color: COLORS.ink, fontSize: 15, fontWeight: '800' },
  recordSubtitle: { color: COLORS.muted, fontSize: 13, marginTop: 3 },
  recordMeta: { color: COLORS.muted, fontSize: 11, lineHeight: 16, marginTop: 6 },
  liveBadge: { backgroundColor: COLORS.mint, borderRadius: 16, paddingHorizontal: 9, paddingVertical: 5 },
  liveBadgeText: { color: COLORS.green, fontSize: 9, letterSpacing: 0.5, fontWeight: '900' },
  notice: { backgroundColor: COLORS.amberBg, padding: 12, borderRadius: 10, marginTop: 14 },
  noticeText: { color: COLORS.amber, fontSize: 13, lineHeight: 18, fontWeight: '600' },
  clockOutRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 12 },
  breakField: { width: 105 },
  compactInput: { height: 44, borderWidth: 1, borderColor: COLORS.line, borderRadius: 10, paddingHorizontal: 12, color: COLORS.ink, fontSize: 16, backgroundColor: '#FBFDFC' },
  clockOutButton: { flex: 1 },
  helperText: { color: COLORS.muted, fontSize: 11, lineHeight: 16, marginTop: 8 },
  listDivider: { height: 1, backgroundColor: COLORS.line, marginVertical: 15 },
  personRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 11, borderTopWidth: 1, borderTopColor: '#EDF2EF' },
  selectedTag: { fontSize: 9, fontWeight: '900', letterSpacing: 0.4, color: COLORS.green, backgroundColor: COLORS.mint, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 5 },
  emptyCard: { paddingVertical: 14, paddingHorizontal: 13, backgroundColor: '#F8FAF9', borderRadius: 12, borderWidth: 1, borderColor: '#E9EFEB' },
  emptyTitle: { color: COLORS.ink, fontSize: 14, fontWeight: '800' },
  emptyDetail: { color: COLORS.muted, fontSize: 12, lineHeight: 17, marginTop: 4 },
  metricsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  metricText: { color: COLORS.ink, fontSize: 12, fontWeight: '700' },
  metricDivider: { color: '#94A49C' },
  amountText: { color: COLORS.greenDark, fontSize: 15, fontWeight: '900' },
  payrollLinked: { color: COLORS.green, fontSize: 11, marginTop: 8, fontWeight: '600' },
  missingPayroll: { color: COLORS.red, fontSize: 11, marginTop: 8, fontWeight: '700' },
  payrollSummary: { backgroundColor: COLORS.green, padding: 20, borderRadius: 18 },
  payrollTotal: { color: COLORS.white, fontSize: 32, fontWeight: '900', marginTop: 5 },
  ledgerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderTopWidth: 1, borderTopColor: '#E8EFEB', paddingVertical: 13 },
  infoNote: { backgroundColor: COLORS.amberBg, borderRadius: 12, padding: 13 },
  infoNoteText: { color: COLORS.amber, fontSize: 12, lineHeight: 18 },
  footer: { color: '#718178', fontSize: 10, textAlign: 'center', paddingVertical: 8, lineHeight: 15 },
  tabBar: { flexDirection: 'row', backgroundColor: COLORS.white, borderTopColor: COLORS.line, borderTopWidth: 1, paddingTop: 8, paddingBottom: Platform.OS === 'android' ? 7 : 4 },
  tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 48, gap: 2 },
  tabSymbol: { color: '#7D8C84', fontSize: 18, fontWeight: '700' },
  tabLabel: { color: '#7D8C84', fontSize: 10, fontWeight: '700' },
  tabSelected: { color: COLORS.green, fontWeight: '900' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.greenDark, padding: 24 },
  loadingText: { color: '#D2E6DC', fontSize: 14, marginTop: 10 },
  errorScreen: { flex: 1, justifyContent: 'center', backgroundColor: COLORS.greenDark, paddingHorizontal: 26 },
  errorTitle: { color: COLORS.white, fontSize: 22, fontWeight: '800', marginTop: 28, marginBottom: 10 },
  errorText: { color: '#D2E6DC', fontSize: 14, lineHeight: 21, marginBottom: 10 },
});
