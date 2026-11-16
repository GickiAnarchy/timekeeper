# Timekeeper

Timekeeper is Mosher Lawns Manager, a browser-based work-hour and job tracker with an Android project.

## Branch safety

Use `master` for ongoing work and testing. `live-stable` remains the production branch. Do not change `live-stable` unless Corey explicitly authorizes it. This checklist does not authorize changes to versions, APK assets or links, GitHub’s default branch, Pages publishing, Firebase settings or production data, or billing; each needs a separate explicit decision.

## Android release checklist

The version labels currently do not match. These are separate values in separate places, not one automatically synchronized version:

- The web app’s visible badge in `index.html` says **v1.7.5**.
- The app’s download link in `index.html` points to the APK asset **`Mosher_Lawns_Time_v1.5.1_1792472720850.apk`** (under the GitHub release tagged `v1.5`).
- Android’s `android/app/build.gradle` currently sets **`versionName "1.0"`** and **`versionCode 1`**.
- For context, `package.json` says **`1.0.0`**; that package value does not set the Android version.

Do not assume which label is the intended release version. Agree on the version separately before changing any of these values or replacing the APK/link. Android `versionCode` is the increasing build number used to distinguish Android releases; `versionName` is the readable version shown to people.

Before building or publishing an Android release:

1. **Confirm the release target.** Do the work and testing on `master`. Treat `live-stable` as production and get Corey’s explicit authorization before changing it.
2. **Run the project checks.** From the repository root, run `npm test`. If the Firebase emulator is available, also run `npm run test:firebase-emulator`. These checks do not replace testing the installed Android app.
3. **Resolve the missing web-assets folder.** `capacitor.config.json` sets Capacitor’s `webDir` to `www`, but this checkout currently has no `www/` directory, and there is no web build/copy script in `package.json`. Determine and approve the correct way to generate or copy the app into `www/`; make sure it contains `index.html` and all referenced scripts, styles, and images before running `npx cap sync android`. Do not assume Capacitor will create the web app for you. Until this is resolved, the Android package is not ready to build reliably.
4. **Check Android build readiness.** Confirm the Android SDK/JDK and project dependencies are available, review the application ID and SDK settings, and ensure the release build uses the intended signing key. Keep signing keys and passwords out of Git. Only after the web assets and signing are ready, build with Android Studio or `cd android && ./gradlew assembleRelease`.
5. **Test the actual APK.** Install it on a device or emulator, check that it opens and loads its web app, and exercise core tasks such as clocking in and out and checking saved data. Test an upgrade over the previous app when applicable.
6. **Review the artifact before publishing.** Confirm the APK is the intended signed release, its filename and version labels agree with the separately approved release version, and the download link points to that exact artifact. Verify the downloaded APK installs. Do not publish or update the existing asset/link as part of this documentation checklist.

A successful web test or Gradle build alone is not approval to publish to production. Keep any production changes on hold until they are explicitly authorized.
