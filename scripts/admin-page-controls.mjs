import { watchAdminOnlyControls } from './admin-controls.mjs';

const adminControls = watchAdminOnlyControls(document, false);

try {
  const authApi = await import('./admin-auth.mjs?v=owner-session-1');
  const currentUser = await authApi.prepareDailyQuotesAdminSignIn();
  adminControls.setAdmin(authApi.isDailyQuotesAdmin(currentUser));
  authApi.observeDailyQuotesAdminSession(user => {
    adminControls.setAdmin(authApi.isDailyQuotesAdmin(user));
  }, error => {
    console.warn('Unable to observe the owner session for admin-only controls.', error);
    adminControls.setAdmin(false);
  });
} catch (error) {
  console.warn('Admin-only controls remain disabled because owner status could not be checked.', error);
  adminControls.setAdmin(false);
}
