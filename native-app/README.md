# Timekeeper for Android (React Native)

This is a standalone Expo/React Native app for the `rework` v2.0 workflow. It includes four work tabs—Clock, People, History, and Payroll—plus a Style tab for appearance.

## What it does

- Add employees with a payroll wage and customers with a separate billing rate, location, and note.
- Clock employees in and out. Clock-in rounds forward and clock-out rounds backward to a 15-minute boundary; breaks must be in 15-minute increments.
- Keep active and completed shift history on the phone. Clocking out posts one payroll ledger entry using `Employee.wage`, not `Customer.hourlyRate`.
- Prevent a second active shift for the same employee and prevent duplicate payroll posting for a completed shift.
- Save the complete employee/customer/shift/ledger snapshot in the app's private SQLite database.
- Use a dark theme by default, with Midnight, Forest, Ocean, and Plum dark palettes and the Porcelain light palette.

The app is designed for phone use: prominent tap targets, a persistent bottom tab bar, clear selected and pressed states, visible input focus, and compact, readable cards. Existing work screens and their shift/payroll logic remain in place.

## Change the theme

1. Open the **Style** tab in the bottom navigation.
2. Tap a palette card to preview and apply it immediately.
3. The choice is saved on this phone and restored the next time the app opens. **Midnight** is used when no preference has been saved.

The palette preference uses its own row in SQLite; changing the theme does not rewrite or migrate employee, customer, shift, or payroll records.

## Run on an Android phone

1. Install Node.js (Node 20.19+ recommended) and npm.
2. From this folder, run `npm ci` (or `npm install` if the lockfile must be updated).
3. Install Expo Go on an Android phone. Put the phone and development computer on the same network.
4. Run `npm start`, then scan the QR code with Expo Go. If the network blocks local discovery, use the Expo CLI tunnel option.

For an Android emulator with Expo Go available, run `npm run android` after starting an emulator. For a locally built native app, install Android Studio and the Android SDK/JDK, then run `npx expo prebuild --platform android` followed by `npx expo run:android`. This project intentionally does not commit a generated `android/` directory; the app uses Expo's managed native modules.

## Tests and smoke test

- `npm test` runs the native app's focused Node tests. They exercise SQLite persistence, clock-in/out, quarter-hour rounding, break validation, payroll-rate separation, reload, idempotency, save-failure behavior, theme selection, theme persistence, and isolation of the theme preference from saved work data.
- `npx expo export --platform android` checks that Expo can bundle the Android JavaScript app. It does not compile or install an APK.
- From the repository root, `npm run test:rework` runs the original v2.0 web/domain tests.
- For a device smoke test, launch with `npm start`, open **Style**, choose a dark palette and Porcelain, then close and relaunch the app to verify the last choice is restored. On **Clock**, verify employee/customer selection and the active-shift clock-out controls remain easy to reach. If safe test records are available, clock in and out and confirm the same result appears in **History** and **Payroll** after switching themes. Theme changes must not change those records.

## Data and current limits

Records are local to this installation in SQLite. They do not sync to Firebase or another device, are not backed up to an account, and are removed if the app's data is cleared or the app is uninstalled. Existing browser `localStorage` records are not imported automatically; set up employees and customers in this app and enter new shifts here.

This is a focused native port of the requested timekeeping and payroll workflows. It does not yet include the web app's invoice/planned-job features, authentication, cloud sync, manual ledger adjustments, or employee/customer editing/deletion. No production Firebase rules, hosting configuration, or other branch was changed.
