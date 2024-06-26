const actions = {
  ACTIVITY_USERS: 'ACTIVITY_USERS',
  ACTIVITY_USERS_SUCCESS: 'ACTIVITY_USERS_SUCCESS',
  ACTIVITY_USERS_ERROR: 'ACTIVITY_USERS_ERROR',

  ACTIVITY_USERS_UPLOAD_CHAT_DOCS: 'ACTIVITY_USERS_UPLOAD_CHAT_DOCS',
  ACTIVITY_USERS_UPLOAD_CHAT_DOCS_SUCCESS:
    'ACTIVITY_USERS_UPLOAD_CHAT_DOCS_SUCCESS',
  ACTIVITY_USERS_UPLOAD_CHAT_DOCS_ERROR:
    'ACTIVITY_USERS_UPLOAD_CHAT_DOCS_ERROR',

  ACTIVITY_USERS_CREATE_CHAT_ID: 'ACTIVITY_USERS_CREATE_CHAT_ID',
  ACTIVITY_USERS_CREATE_CHAT_ID_SUCCESS:
    'ACTIVITY_USERS_CREATE_CHAT_ID_SUCCESS',

  ACTIVITY_USERS_PUSH_NOTIFICATION: 'ACTIVITY_USERS_PUSH_NOTIFICATION',

  ACTIVITY_USERS_DETAILES: 'ACTIVITY_USERS_DETAILES',
  ACTIVITY_USERS_DETAILES_SUCCESS: 'ACTIVITY_USERS_DETAILES_SUCCESS',
  ACTIVITY_USERS_DETAILES_ERROR: 'ACTIVITY_USERS_ERROR',

  ACTIVITY_USERS_CALCULATIONS: 'ACTIVITY_USERS_CALCULATIONS',
  ACTIVITY_USERS_CALCULATIONS_SUCCESS: 'ACTIVITY_USERS_CALCULATIONS_SUCCESS',
  ACTIVITY_USERS_CALCULATIONS_ERROR: 'ACTIVITY_USERS_CALCULATIONS_ERROR',

  ACTIVITY_USER_DOCUMENTS: 'ACTIVITY_USERS_DOCUMENTS',
  ACTIVITY_USER_DOCUMENTS_SUCCESS: 'ACTIVITY_USERS_DOCUMENTS_SUCCESS',
  ACTIVITY_USER_DOCUMENTS_ERROR: 'ACTIVITY_USERS_DOCUMENTS_ERROR',

  ACTIVITY_USER_CAL_DETAIL: 'ACTIVITY_USER_CAL_DETAIL',
  ACTIVITY_USER_CAL_DETAIL_SUCCESS: 'ACTIVITY_USER_CAL_DETAIL_SUCCESS',
  ACTIVITY_USER_CAL_DETAIL_ERROR: 'ACTIVITY_USER_CAL_DETAIL_ERROR',

  ACTIVITY_USERS_GENERATE_REPORT: 'ACTIVITY_USERS_GENERATE_REPORT',
  ACTIVITY_USERS_GENERATE_REPORT_SUCCESS:
    'ACTIVITY_USERS_GENERATE_REPORT_SUCCESS',
  ACTIVITY_USERS_GENERATE_REPORT_ERROR: 'ACTIVITY_USERS_GENERATE_REPORT_ERROR',

  ACTIVITY_USERS_EXPORT_SUCCESS: 'ACTIVITY_USERS_EXPORT_SUCCESS',

  ACTIVITY_USERS_URL_EMPTY: 'ACTIVITY_USERS_URL_EMPTY',

  ACTIVITY_USERS_MESSAGE_NOTIFICATION: 'ACTIVITY_USERS_MESSAGE_NOTIFICATION',

  getUsers: (payload) => ({
    type: actions.ACTIVITY_USERS,
    payload,
  }),
  chatURLEmpty: () => ({
    type: actions.ACTIVITY_USERS_URL_EMPTY,
  }),
  createChatId: (payload) => ({
    type: actions.ACTIVITY_USERS_CREATE_CHAT_ID,
    payload,
  }),
  sendPushNotification: (payload) => ({
    type: actions.ACTIVITY_USERS_PUSH_NOTIFICATION,
    payload,
  }),
  sendMessageNotification: (payload) => ({
    type: actions.ACTIVITY_USERS_MESSAGE_NOTIFICATION,
    payload,
  }),
  uploadChatDocs: (payload) => ({
    type: actions.ACTIVITY_USERS_UPLOAD_CHAT_DOCS,
    payload,
  }),
  getUserDetailes: (payload) => ({
    type: actions.ACTIVITY_USERS_DETAILES,
    payload,
  }),
  getUserCalculations: (payload) => ({
    type: actions.ACTIVITY_USERS_CALCULATIONS,
    payload,
  }),
  getUserUploadDocuments: (payload) => ({
    type: actions.ACTIVITY_USER_DOCUMENTS,
    payload,
  }),
  getUserCalculationDetail: (payload) => ({
    type: actions.ACTIVITY_USER_CAL_DETAIL,
    payload,
  }),

  getGenerateReport: (payload) => ({
    type: actions.ACTIVITY_USERS_GENERATE_REPORT,
    payload,
  }),
};

export default actions;
