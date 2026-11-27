import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Crypto from 'expo-crypto';
import * as SQLite from 'expo-sqlite';
import { ShiftService } from './src/services/shift-service.js';
import { SQLitePersistence } from './src/persistence/sqlite-persistence.js';
import { ThemePreference } from './src/persistence/theme-preference.js';
import { DEFAULT_THEME_ID, getTheme, THEMES } from './src/theme/themes.js';

const ThemeUiContext = createContext(null);
const TABS = [
  { id: 'clock', label: 'Clock', symbol: '◷' },
  { id: 'people', label: 'People', symbol: '◎' },
  { id: 'history', label: 'History', symbol: '▤' },
  { id: 'payroll', label: 'Payroll', symbol: '$' },
  { id: 'appearance', label: 'Style', symbol: '◉' },
];

function useThemeUi() {
  return useContext(ThemeUiContext);
}

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
  const { styles } = useThemeUi();
  return (
    <View style={styles.sectionHeading}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>
      {detail ? <Text style={styles.sectionDetail}>{detail}</Text> : null}
    </View>
  );
}

function Field({ label, value, onChangeText, placeholder, keyboardType = 'default', multiline = false }) {
  const { styles, theme } = useThemeUi();
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        keyboardType={keyboardType}
        multiline={multiline}
        selectionColor={theme.colors.accent}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.input, multiline && styles.multilineInput, focused && styles.inputFocused]}
        accessibilityLabel={label}
      />
    </View>
  );
}

function ActionButton({ label, onPress, secondary = false, disabled = false, destructive = false, hint }) {
  const { styles, theme } = useThemeUi();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      android_ripple={{ color: theme.colors.ripple }}
      style={({ pressed }) => [
        styles.actionButton,
        secondary && styles.secondaryButton,
        destructive && styles.destructiveButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <Text style={[styles.actionButtonText, secondary && styles.secondaryButtonText, destructive && styles.destructiveButtonText]}>{label}</Text>
    </Pressable>
  );
}

function ChoiceChips({ items, selectedId, onSelect, emptyLabel }) {
  const { styles, theme } = useThemeUi();
  if (!items.length) return <Text style={styles.emptyInline}>{emptyLabel}</Text>;
  return (
    <View style={styles.chipWrap}>
      {items.map(item => {
        const selected = selectedId === item.id;
        return (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item.id)}
            accessibilityRole="radio"
            accessibilityLabel={item.name}
            accessibilityState={{ selected }}
            android_ripple={{ color: theme.colors.ripple }}
            style={({ pressed }) => [styles.choiceChip, selected && styles.choiceChipSelected, pressed && styles.pressedChoice]}
          >
            <Text style={[styles.choiceChipText, selected && styles.choiceChipTextSelected]}>{item.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function EmptyCard({ title, detail }) {
  const { styles } = useThemeUi();
  return (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDetail}>{detail}</Text>
    </View>
  );
}

function makeService(persistence) {
  return new ShiftService({ persistence, idFactory: () => Crypto.randomUUID() });
}

export default function App() {
  const persistenceRef = useRef(null);
  const themePreferenceRef = useRef(null);
  const [snapshot, setSnapshot] = useState(null);
  const [tab, setTab] = useState('clock');
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
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

  const theme = getTheme(themeId);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const themeUi = useMemo(() => ({ styles, theme }), [styles, theme]);

  useEffect(() => {
    try {
      const database = SQLite.openDatabaseSync('timekeeper.db');
      persistenceRef.current = new SQLitePersistence(database);
      themePreferenceRef.current = new ThemePreference(database);
      setThemeId(themePreferenceRef.current.load());
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

  function selectTheme(nextThemeId) {
    if (!themePreferenceRef.current) {
      Alert.alert('Not ready yet', 'The local database is still opening. Try again in a moment.');
      return;
    }
    try {
      themePreferenceRef.current.save(nextThemeId);
      setThemeId(nextThemeId);
    } catch (error) {
      Alert.alert('Could not save theme', error?.message || 'Your current theme has not changed.');
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
          <Text style={styles.fieldLabel}>Employee</Text>
          <ChoiceChips items={snapshot.employees} selectedId={employeeId} onSelect={setEmployeeId} emptyLabel="Add an employee in People first." />
          <Text style={[styles.fieldLabel, styles.spacedLabel]}>Customer</Text>
          <ChoiceChips items={snapshot.customers} selectedId={customerId} onSelect={setCustomerId} emptyLabel="Add a customer in People first." />
          {selectedActive ? (
            <View style={styles.notice}>
              <Text style={styles.noticeText}>{employeeLabel(employeeMap[employeeId])} already has an active shift. Clock out before starting another.</Text>
            </View>
          ) : (
            <>
              <Text style={styles.helperText}>Clock-in rounds forward to the next 15-minute mark.</Text>
              <ActionButton label="Clock in" hint="Start a shift for the selected employee and customer." onPress={clockIn} disabled={!employeeId || !customerId} />
            </>
          )}
        </View>
        <View style={styles.card}>
          <SectionTitle title="Active shifts" detail="Break minutes are subtracted at clock-out." />
          {activeShifts.length === 0 ? <EmptyCard title="No one is clocked in" detail="When a shift is active, it will appear here." /> : activeShifts.map(shift => (
            <View key={shift.id} style={styles.recordCard}>
              <View style={styles.recordTopRow}>
                <View style={styles.recordMain}>
                  <Text style={styles.recordTitle}>{employeeLabel(employeeMap[shift.employeeId])}</Text>
                  <Text style={styles.recordSubtitle}>{customerLabel(customerMap[shift.customerId])}</Text>
                </View>
                <View style={styles.liveBadge}><Text style={styles.liveBadgeText}>ACTIVE</Text></View>
              </View>
              <Text style={styles.recordMeta}>Started {formatDate(shift.startTime)}</Text>
              <View style={styles.clockOutRow}>
                <View style={styles.breakField}>
                  <Text style={styles.fieldLabel}>Break (min)</Text>
                  <BreakInput
                    value={breakMinutesByEmployee[shift.employeeId] ?? '0'}
                    onChangeText={value => setBreakMinutesByEmployee(current => ({ ...current, [shift.employeeId]: value }))}
                    label={`Break minutes for ${employeeLabel(employeeMap[shift.employeeId])}, in 15-minute increments`}
                  />
                </View>
                <View style={styles.clockOutButton}>
                  <ActionButton label="Clock out" hint="Finish this shift and post the calculated payroll entry." destructive onPress={() => clockOut(shift.employeeId)} />
                </View>
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
          <SectionTitle title="Employees" detail="Their hourly wage is used for payroll." />
          <Field label="Employee name" value={employeeName} onChangeText={setEmployeeName} placeholder="e.g. Alex" />
          <Field label="Hourly wage · USD" value={employeeWage} onChangeText={setEmployeeWage} placeholder="e.g. 20.00" keyboardType="decimal-pad" />
          <ActionButton label="Add employee" onPress={addEmployee} hint="Save this employee to the on-device list." />
          <View style={styles.listDivider} />
          {snapshot.employees.length ? snapshot.employees.map(record => (
            <View key={record.id} style={styles.personRow}>
              <View style={styles.recordMain}>
                <Text style={styles.recordTitle}>{record.name}</Text>
                <Text style={styles.recordSubtitle}>Payroll wage · {formatMoney(record.wage)}/hr</Text>
              </View>
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
          <ActionButton label="Add customer" onPress={addCustomer} hint="Save this customer to the on-device list." />
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
                <View style={styles.recordMain}>
                  <Text style={styles.recordTitle}>{employeeLabel(employeeMap[shift.employeeId])}</Text>
                  <Text style={styles.recordSubtitle}>{customerLabel(customerMap[shift.customerId])}</Text>
                </View>
                <Text style={styles.amountText}>{formatMoney(ledgerEntry?.amount)}</Text>
              </View>
              <Text style={styles.recordMeta}>{formatDate(shift.startTime)} – {formatDate(shift.endTime)}</Text>
              <View style={styles.metricsRow}>
                <Text style={styles.metricText}>{formatHours(shift.paidHours)}</Text>
                <Text style={styles.metricDivider}>·</Text>
                <Text style={styles.metricText}>{shift.breakDurationMinutes || 0} min break</Text>
              </View>
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
        <View style={styles.infoNote}>
          <Text style={styles.infoNoteText}>Customer hourly billing rates are kept separate from employee wages and are not used in these payroll calculations.</Text>
        </View>
      </>
    );
  }

  function renderAppearance() {
    return (
      <View style={styles.card}>
        <SectionTitle title="Color theme" detail="Dark by default. Choose a palette; it is saved on this phone." />
        <View style={styles.themeOptions}>
          {THEMES.map(option => {
            const selected = themeId === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => selectTheme(option.id)}
                accessibilityRole="radio"
                accessibilityLabel={`${option.name} theme. ${option.description}`}
                accessibilityState={{ selected }}
                android_ripple={{ color: theme.colors.ripple }}
                style={({ pressed }) => [styles.themeOption, selected && styles.themeOptionSelected, pressed && styles.pressedThemeOption]}
              >
                <View style={styles.themeSwatches} accessible={false}>
                  <View style={[styles.themeSwatch, { backgroundColor: option.colors.background, borderColor: option.colors.border }]} />
                  <View style={[styles.themeSwatch, { backgroundColor: option.colors.surface, borderColor: option.colors.border }]} />
                  <View style={[styles.themeSwatch, styles.accentSwatch, { backgroundColor: option.colors.accent }]} />
                </View>
                <View style={styles.themeCopy}>
                  <Text style={styles.themeName}>{option.name}</Text>
                  <Text style={styles.themeDescription}>{option.description}</Text>
                </View>
                <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                  {selected ? <View style={styles.radioInner} /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.themeNote}>
          <Text style={styles.themeNoteText}>Themes change only the app’s appearance. Your saved employees, customers, shifts, and payroll stay as they are.</Text>
        </View>
      </View>
    );
  }

  const title = tab === 'appearance' ? 'Appearance' : (TABS.find(item => item.id === tab)?.label || 'Clock');
  const barStyle = theme.mode === 'light' ? 'dark-content' : 'light-content';

  if (loadError) {
    return (
      <ThemeUiContext.Provider value={themeUi}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle={barStyle} backgroundColor={theme.colors.header} />
          <View style={styles.errorScreen}>
            <Text style={styles.brand}>Timekeeper</Text>
            <Text style={styles.errorTitle}>Couldn’t open local data</Text>
            <Text style={styles.errorText}>{loadError}</Text>
            <Text style={styles.errorText}>Saved records were not changed. Restart the app after checking the device has free storage.</Text>
          </View>
        </SafeAreaView>
      </ThemeUiContext.Provider>
    );
  }
  if (!snapshot) {
    return (
      <ThemeUiContext.Provider value={themeUi}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle={barStyle} backgroundColor={theme.colors.header} />
          <View style={styles.loading}>
            <Text style={styles.brand}>Timekeeper</Text>
            <Text style={styles.loadingText}>Opening your on-device records…</Text>
          </View>
        </SafeAreaView>
      </ThemeUiContext.Provider>
    );
  }

  return (
    <ThemeUiContext.Provider value={themeUi}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle={barStyle} backgroundColor={theme.colors.header} />
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brand}>Timekeeper</Text>
            <Text style={styles.topSubtitle}>Work hours & payroll</Text>
          </View>
          <View style={styles.localBadge}><Text style={styles.localBadgeText}>ON DEVICE</Text></View>
        </View>
        <View style={styles.screenHeading}>
          <Text accessibilityRole="header" style={styles.screenTitle}>{title}</Text>
          <Text style={styles.screenSubtitle}>{tab === 'appearance' ? 'Personalize this phone' : 'Saved locally on this phone'}</Text>
        </View>
        <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
            {tab === 'clock' ? renderClock() : null}
            {tab === 'people' ? renderPeople() : null}
            {tab === 'history' ? renderHistory() : null}
            {tab === 'payroll' ? renderPayroll() : null}
            {tab === 'appearance' ? renderAppearance() : null}
            <Text style={styles.footer}>Local device storage only · Not synced or backed up to an account</Text>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.tabBar} accessibilityRole="tablist">
          {TABS.map(item => {
            const selected = tab === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setTab(item.id)}
                accessibilityRole="tab"
                accessibilityLabel={`${item.label} tab`}
                accessibilityState={{ selected }}
                android_ripple={{ color: theme.colors.ripple }}
                style={({ pressed }) => [styles.tabButton, selected && styles.tabButtonSelected, pressed && styles.pressedTab]}
              >
                <Text style={[styles.tabSymbol, selected && styles.tabSelected]}>{item.symbol}</Text>
                <Text style={[styles.tabLabel, selected && styles.tabSelected]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </ThemeUiContext.Provider>
  );
}

function BreakInput({ value, onChangeText, label }) {
  const { styles, theme } = useThemeUi();
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      keyboardType="number-pad"
      placeholder="0"
      placeholderTextColor={theme.colors.muted}
      selectionColor={theme.colors.accent}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[styles.compactInput, focused && styles.inputFocused]}
      accessibilityLabel={label}
    />
  );
}

function createStyles(theme) {
  const colors = theme.colors;
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    topBar: {
      backgroundColor: colors.header, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14,
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 68,
    },
    brand: { color: colors.text, fontSize: 21, fontWeight: '800', letterSpacing: 0.15 },
    topSubtitle: { color: colors.muted, fontSize: 12, marginTop: 2 },
    localBadge: { borderColor: colors.border, borderWidth: 1, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 7 },
    localBadgeText: { color: colors.accent, fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
    screenHeading: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 },
    screenTitle: { color: colors.text, fontSize: 28, fontWeight: '800', letterSpacing: -0.35 },
    screenSubtitle: { color: colors.muted, fontSize: 13, marginTop: 3 },
    body: { flex: 1 },
    content: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 22, gap: 13 },
    heroCard: { backgroundColor: colors.hero, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
    heroEyebrow: { color: colors.accent, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
    heroTitle: { color: colors.text, fontSize: 22, fontWeight: '800', marginTop: 6 },
    heroDetail: { color: colors.muted, fontSize: 14, marginTop: 6 },
    card: { backgroundColor: colors.surface, borderRadius: 18, padding: 17, borderWidth: 1, borderColor: colors.border },
    sectionHeading: { marginBottom: 15 },
    sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', letterSpacing: -0.1 },
    sectionDetail: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 5 },
    fieldLabel: { color: colors.muted, fontSize: 12, fontWeight: '700', marginBottom: 8 },
    spacedLabel: { marginTop: 17 },
    chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
    choiceChip: {
      borderColor: colors.border, borderWidth: 1, borderRadius: 16, paddingHorizontal: 15,
      paddingVertical: 12, minHeight: 48, justifyContent: 'center', backgroundColor: colors.raised,
    },
    choiceChipSelected: { backgroundColor: colors.accentSoft, borderColor: colors.accent, borderWidth: 1.5 },
    choiceChipText: { color: colors.text, fontSize: 14, fontWeight: '600' },
    choiceChipTextSelected: { color: colors.accent, fontWeight: '800' },
    pressedChoice: { opacity: 0.76 },
    emptyInline: { color: colors.muted, fontSize: 14, paddingBottom: 4, lineHeight: 20 },
    actionButton: {
      backgroundColor: colors.accent, borderRadius: 14, paddingVertical: 15, paddingHorizontal: 17,
      alignItems: 'center', justifyContent: 'center', marginTop: 14, minHeight: 52,
    },
    actionButtonText: { color: colors.accentText, fontSize: 15, fontWeight: '800', textAlign: 'center' },
    secondaryButton: { backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: colors.border },
    secondaryButtonText: { color: colors.accent },
    destructiveButton: { backgroundColor: colors.dangerSurface, borderWidth: 1, borderColor: colors.danger },
    destructiveButtonText: { color: colors.danger },
    disabledButton: { opacity: 0.42 },
    pressedButton: { opacity: 0.76 },
    fieldGroup: { marginBottom: 13 },
    input: {
      minHeight: 52, borderRadius: 13, borderColor: colors.border, borderWidth: 1,
      paddingHorizontal: 14, paddingVertical: 12, color: colors.text, fontSize: 16, backgroundColor: colors.input,
    },
    inputFocused: { borderColor: colors.accent, borderWidth: 2 },
    multilineInput: { minHeight: 88, textAlignVertical: 'top' },
    recordCard: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 15, paddingBottom: 13 },
    recordTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
    recordMain: { flex: 1 },
    recordTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
    recordSubtitle: { color: colors.muted, fontSize: 14, marginTop: 4, lineHeight: 19 },
    recordMeta: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 7 },
    liveBadge: { backgroundColor: colors.accentSoft, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 6 },
    liveBadgeText: { color: colors.accent, fontSize: 10, letterSpacing: 0.55, fontWeight: '900' },
    notice: { backgroundColor: colors.warningSurface, padding: 14, borderRadius: 13, marginTop: 16, borderWidth: 1, borderColor: colors.warning },
    noticeText: { color: colors.warning, fontSize: 14, lineHeight: 20, fontWeight: '600' },
    clockOutRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 12, marginTop: 14 },
    breakField: { width: 112 },
    compactInput: {
      minHeight: 52, borderWidth: 1, borderColor: colors.border, borderRadius: 13,
      paddingHorizontal: 14, color: colors.text, fontSize: 16, backgroundColor: colors.input,
    },
    clockOutButton: { flex: 1 },
    helperText: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 10 },
    listDivider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },
    personRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 14, borderTopWidth: 1, borderTopColor: colors.border },
    selectedTag: { fontSize: 10, fontWeight: '900', letterSpacing: 0.45, color: colors.accent, backgroundColor: colors.accentSoft, borderRadius: 12, paddingHorizontal: 9, paddingVertical: 6 },
    emptyCard: { paddingVertical: 16, paddingHorizontal: 14, backgroundColor: colors.raised, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
    emptyTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
    emptyDetail: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 5 },
    metricsRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 10 },
    metricText: { color: colors.text, fontSize: 13, fontWeight: '700' },
    metricDivider: { color: colors.muted },
    amountText: { color: colors.accent, fontSize: 16, fontWeight: '900' },
    payrollLinked: { color: colors.accent, fontSize: 12, marginTop: 9, fontWeight: '600' },
    missingPayroll: { color: colors.danger, fontSize: 12, marginTop: 9, fontWeight: '700' },
    payrollSummary: { backgroundColor: colors.hero, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
    payrollTotal: { color: colors.text, fontSize: 34, fontWeight: '900', marginTop: 7 },
    ledgerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 15 },
    infoNote: { backgroundColor: colors.warningSurface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.warning },
    infoNoteText: { color: colors.warning, fontSize: 13, lineHeight: 19 },
    footer: { color: colors.muted, fontSize: 11, textAlign: 'center', paddingVertical: 10, lineHeight: 17 },
    tabBar: {
      flexDirection: 'row', backgroundColor: colors.header, borderTopColor: colors.border, borderTopWidth: 1,
      paddingHorizontal: 5, paddingTop: 7, paddingBottom: Platform.OS === 'android' ? 7 : 4,
    },
    tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 58, borderRadius: 14, gap: 3, paddingHorizontal: 2 },
    tabButtonSelected: { backgroundColor: colors.accentSoft },
    tabSymbol: { color: colors.muted, fontSize: 19, fontWeight: '700' },
    tabLabel: { color: colors.muted, fontSize: 10, fontWeight: '700' },
    tabSelected: { color: colors.accent, fontWeight: '900' },
    pressedTab: { opacity: 0.75 },
    themeOptions: { gap: 10 },
    themeOption: {
      flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 76, paddingHorizontal: 12,
      paddingVertical: 12, backgroundColor: colors.raised, borderColor: colors.border, borderWidth: 1, borderRadius: 15,
    },
    themeOptionSelected: { borderColor: colors.accent, borderWidth: 2, backgroundColor: colors.accentSoft },
    pressedThemeOption: { opacity: 0.78 },
    themeSwatches: { flexDirection: 'row', alignItems: 'center', width: 54 },
    themeSwatch: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, marginRight: -6 },
    accentSwatch: { width: 24, height: 24, borderWidth: 2 },
    themeCopy: { flex: 1 },
    themeName: { color: colors.text, fontSize: 15, fontWeight: '800' },
    themeDescription: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 3 },
    radioOuter: { width: 23, height: 23, borderRadius: 12, borderWidth: 2, borderColor: colors.muted, alignItems: 'center', justifyContent: 'center' },
    radioOuterSelected: { borderColor: colors.accent },
    radioInner: { width: 11, height: 11, borderRadius: 6, backgroundColor: colors.accent },
    themeNote: { backgroundColor: colors.surface, borderRadius: 13, padding: 13, marginTop: 15, borderWidth: 1, borderColor: colors.border },
    themeNoteText: { color: colors.muted, fontSize: 12, lineHeight: 18 },
    loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, padding: 24 },
    loadingText: { color: colors.muted, fontSize: 14, marginTop: 10 },
    errorScreen: { flex: 1, justifyContent: 'center', backgroundColor: colors.background, paddingHorizontal: 26 },
    errorTitle: { color: colors.text, fontSize: 23, fontWeight: '800', marginTop: 28, marginBottom: 10 },
    errorText: { color: colors.muted, fontSize: 15, lineHeight: 22, marginBottom: 10 },
  });
}
