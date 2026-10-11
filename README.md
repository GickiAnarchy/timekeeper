# TIME KEEPER

A javascript project to keep track of hours working.

The workspace includes clock in/out, break tracking, shift history, employee
and customer records, invoices, an employee ledger, and planned jobs. The Home
dashboard summarizes today's and this week's break-adjusted hours, highlights
active shifts and upcoming jobs, and updates active totals every minute. Choose
Forest, Coastal, Harvest, or Midnight and select Standard, Large, or Extra large
text from Settings; these preferences are saved in the current browser.

*This is a work in progress*
<hr>

[Link to the site.](https://www.gickianarchy.github.io/timekeeper/)

## Local Firebase authentication and Firestore security

The app shell now provides **owner email/password sign-in only**; it has no public sign-up flow. The owner account must be created administratively. Before any future production use, disable end-user account creation and deletion in Firebase Authentication settings, and enable the Email/Password provider. This project setting was not changed as part of the local-only work. See [Firebase user self-service settings](https://firebase.google.com/docs/auth/users#user_self-service).

The supplied owner ID is now set in `scripts/firebase.js` and `firestore.rules` locally. Confirm it matches the UID shown under Firebase Console → Authentication → Users before relying on this setup. The app's client-side UID check improves the UI; Firestore Rules are the actual data-access boundary. No live rules have been deployed.

All workspace reads require that owner UID. Writes to employees, customers, payments, invoices, the ledger, and planned jobs require an owner ID token whose Auth `auth_time` is within five minutes of the Firestore request. The app explicitly asks for the owner password before the first protected write in a signed-in page session, then re-prompts before its four-minute local window expires; Firestore Rules enforce the five-minute server-side limit. The routine exception is deliberately narrow: creating a pristine active shift and updating only an active shift's breaks or clock-out time. Editing completed shifts, deleting shifts, importing/restoring records, and every non-shift mutation use the recent-auth path.

The Firebase CLI default project is the non-deployable `demo-timekeeper`; `firebase.json` configures only local Auth and Firestore emulators. These files and rules are for local testing only; no live rules, account, Auth setting, billing, API, or data were changed.
