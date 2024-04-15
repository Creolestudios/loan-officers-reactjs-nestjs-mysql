const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_WITH_OTHER: 'LOGIN_WITH_OTHER',
  SIGNUP: 'SIGNUP',
  VERIFICATION: 'VERIFICATION',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  VERIFICATION_SUCCESS: 'VERIFICATION_SUCCESS',
  RESET_PASSWORD: 'RESET_PASSWORD',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',

  CHANGE_REPORT: 'CHANGE_REPORT',
  CHANGE_REPORT_SUCCESS: 'CHANGE_REPORT_SUCCESS',

  GET_REPORT: 'GET_REPORT',
  GET_REPORT_SUCCESS: 'GET_REPORT_SUCCESS',

  GET_NOTIFICATION: 'GET_NOTIFICATION',
  GET_NOTIFICATION_SUCCESS: 'GET_NOTIFICATION_SUCCESS',

  GET_NOTIFICATION_LISTING: 'GET_NOTIFICATION_LISTING',
  GET_NOTIFICATION_LISTING_SUCCESS: 'GET_NOTIFICATION_LISTING_SUCCESS',

  CHANGE_NOTIFICATION: 'CHANGE_NOTIFICATION',
  CHANGE_NOTIFICATION_SUCCESS: 'CHANGE_NOTIFICATION_SUCCESS',

  FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
  RESEND: 'RESEND',
  SAVE_PROFILE: 'SAVE_PROFILE',
  GET_PROFILE: 'GET_PROFILE',
  GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
  SAVE_BIO: 'SAVE_BIO',
  SAVE_BIO_STATE: 'SAVE_BIO_STATE',
  SAVE_LINKS: 'SAVE_LINKS',
  SAVE_DASH_LINKS: 'SAVE_DASH_LINKS',
  SAVE_LINKS_SUCCESS: 'SAVE_LINK_SUCCESS',
  SAVE_IMAGE: 'SAVE_IMAGE',
  SAVE_IMAGE_STATE: 'SAVE_IMAGE_STATE',
  SAVE_LOGO: 'SAVE_LOGO',
  SAVE_LOGO_STATE: 'SAVE_LOGO_STATE',

  SAT_INTERVAL: 'SAT_INTERVAL',

  checkAuthorization: () => {
    return { type: actions.CHECK_AUTHORIZATION };
  },
  login: (type, history, from) => ({
    type: actions.LOGIN_REQUEST,
    payload: { type },
    history: history,
    from: from,
  }),
  logout: (type, history) => ({
    type: actions.LOGOUT,
    payload: { type },
    history: history,
  }),
  signup: (type, history) => ({
    type: actions.SIGNUP,
    payload: { type },
    history: history,
  }),
  verify: (type, history) => ({
    type: actions.VERIFICATION,
    payload: { type },
    history: history,
  }),
  resend: (type) => ({
    type: actions.RESEND,
    payload: { type },
  }),
  forgotPassword: (type, history) => ({
    type: actions.FORGOT_PASSWORD,
    payload: type,
    history: history,
  }),
  changePassword: (type) => ({
    type: actions.CHANGE_PASSWORD,
    payload: type,
  }),
  changeReport: (type) => ({
    type: actions.CHANGE_REPORT,
    payload: type,
  }),
  getReport: (type) => ({
    type: actions.GET_REPORT,
  }),
  changeNotification: (type) => ({
    type: actions.CHANGE_NOTIFICATION,
    payload: type,
  }),
  getNotification: (type) => ({
    type: actions.GET_NOTIFICATION,
  }),
  getNotificationListing: (type) => ({
    type: actions.GET_NOTIFICATION_LISTING,
  }),
  resetPassword: (type, history) => ({
    type: actions.RESET_PASSWORD,
    payload: type,
    history: history,
  }),

  setIntID: (type) => ({
    type: actions.SAT_INTERVAL,
    payload: type,
  }),

  saveProfile: (type) => ({
    type: actions.SAVE_PROFILE,
    payload: type,
  }),
  getProfile: () => ({
    type: actions.GET_PROFILE,
  }),
  saveBio: (type) => ({
    type: actions.SAVE_BIO,
    payload: type,
  }),
  saveLinks: (type) => ({
    type: actions.SAVE_LINKS,
    payload: type,
  }),
  saveDashLinks: (payload) => ({
    type: actions.SAVE_DASH_LINKS,
    payload,
  }),
  saveImage: (type) => ({
    type: actions.SAVE_IMAGE,
    payload: type,
  }),
  saveLogo: (type) => ({
    type: actions.SAVE_LOGO,
    payload: type,
  }),
};
export default actions;
