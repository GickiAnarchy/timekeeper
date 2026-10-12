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

The app shell provides **owner email/password sign-in only**; it has no public sign-up flow. Both owner accounts must be created administratively. Firebase Authentication account-management settings are managed separately and are not changed by this application. See [Firebase user self-service settings](https://firebase.google.com/docs/auth/users#user_self-service).

The approved owner UIDs are `N9fh9kr98neSYBSNdyDHBZn9IGv1` and `S7v71Kjhesf4oWv1qTzsN8zcIZm1`. They are checked by the frontend and Firestore Rules; the client-side check improves the UI, while Firestore Rules are the data-access boundary. Keep `firestore.rules` and `proposals/firestore.guest-proposal.rules` aligned so a future deployment does not revert guest-kiosk access or owner authorization.

All private workspace reads require one of the configured owner UIDs. Writes to employees, customers, payments, invoices, the ledger, and planned jobs require an owner ID token whose Auth `auth_time` is within five minutes of the Firestore request. The app explicitly asks for the owner password before the first protected write in a signed-in page session, then re-prompts before its four-minute local window expires; Firestore Rules enforce the five-minute server-side limit. The routine exception is deliberately narrow: creating a pristine active shift and updating only an active shift's breaks or clock-out time. Editing completed shifts, deleting shifts, importing/restoring records, and every non-shift mutation use the recent-auth path.

The Firebase CLI default project remains the local `demo-timekeeper` emulator project. Production rules deployments must explicitly select `timekeeper-ad253` with `--project`; do not change the default project to production.
