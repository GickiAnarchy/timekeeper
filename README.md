# Timekeeper

Timekeeper is Mosher Lawns Manager, a browser-based work-hour and job tracker with an Android project.

## Branch safety

Use `master` for ongoing work and testing. `live-stable` remains the production branch. Do not change `live-stable` unless Corey explicitly authorizes it. This version-alignment change does not authorize changes to APK assets or links, GitHub’s default branch, Pages publishing, Firebase settings or production data, or billing.

## Source version and APK status

The selected canonical source version is **1.8.0**. The web app badge, `package.json` and `package-lock.json`, and Android `versionName` are aligned to this value. Android `versionCode` is **10800**, which is higher than the **10501** code read from the manifest of the previously released APK.

The existing **Get the app** link in `index.html` is intentionally unchanged. It still points to `Mosher_Lawns_Time_v1.5.1_1792472720850.apk` under the GitHub release tagged `v1.5`; that downloadable APK is the previous artifact, not a 1.8.0 build. No APK was built or uploaded as part of this source-version update. The link and downloadable artifact must remain understood as the old release until a replacement APK is separately built and published.

Before shipping an Android update, review an app-identity mismatch: the previous APK manifest reports package name `com.gickistudios.timekeeper`, while the current `android/app/build.gradle` declares `applicationId "com.gickistudios.moshertime"`. These IDs may cause Android to treat a future build as a different app instead of an in-place upgrade. This change deliberately does not alter the application ID; resolve and test the intended upgrade behavior before publishing.

## Android release checklist

1. **Keep production separate.** Do the work and testing on `master`. Treat `live-stable` as production and get Corey’s explicit authorization before changing it.
2. **Run the project checks.** From the repository root, run `npm test`. If the Firebase emulator is available, also run `npm run test:firebase-emulator`. These checks do not replace testing the installed Android app.
3. **Resolve the missing web-assets folder.** `capacitor.config.json` sets Capacitor’s `webDir` to `www`, but this checkout currently has no `www/` directory, and there is no web build/copy script in `package.json`. Determine and approve the correct way to generate or copy the app into `www/`; make sure it contains `index.html` and all referenced scripts, styles, and images before running `npx cap sync android`. Do not assume Capacitor will create the web app for you. Until this is resolved, the Android package is not ready to build reliably.
4. **Check Android build readiness.** Confirm the Android SDK/JDK and project dependencies are available, review the application ID and SDK settings, resolve the package-ID mismatch above, and ensure the release build uses the intended signing key. Keep signing keys and passwords out of Git. Only after the web assets and signing are ready, build with Android Studio or `cd android && ./gradlew assembleRelease`.
5. **Test the actual APK.** Install it on a device or emulator, check that it opens and loads its web app, and exercise core tasks such as clocking in and out and checking saved data. Test an upgrade over the previous app when applicable.
6. **Review the artifact before publishing.** Confirm the APK is the intended signed release, its filename and version labels agree with the selected source version, and the download link points to that exact artifact. Verify the downloaded APK installs. Do not publish or update the existing asset/link as part of this source-version update.

A successful web test or Gradle build alone is not approval to publish to production. Keep any production changes on hold until they are explicitly authorized.
