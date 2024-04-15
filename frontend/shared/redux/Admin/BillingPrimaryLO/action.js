const actions = {
  BILLING_LO_USERS: 'BILLING_LO_USERS',
  BILLING_LO_USERS_SUCCESS: 'BILLING_LO_USERS_SUCCESS',
  BILLING_LO_USERS_ERROR: 'BILLING_LO_USERS_ERROR',

  BILLING_LO_USERS_DETAILS: 'BILLING_LO_USERS_DETAILS',
  BILLING_LO_USERS_DETAILS_SUCCESS: 'BILLING_LO_USERS_DETAILS_SUCCESS',
  BILLING_LO_USERS_DETAILS_ERROR: 'BILLING_LO_USERS_DETAILS_ERROR',

  BILLING_LO_USER_DELETE_NOTE: 'BILLING_LO_USER_DELETE_NOTE',
  BILLING_LO_USER_DELETE_NOTE_SUCCESS: 'BILLING_LO_USER_DELETE_NOTE_SUCCESS',
  BILLING_LO_USER_DELETE_NOTE_ERROR: 'BILLING_LO_USER_DELETE_NOTE_ERROR',

  BILLING_LO_USER_DELETE_CREDITS: 'BILLING_LO_USER_DELETE_CREDITS',
  BILLING_LO_USER_DELETE_CREDITS_SUCCESS:
    'BILLING_LO_USER_DELETE_CREDITS_SUCCESS',
  BILLING_LO_USER_DELETE_CREDITS_ERROR: 'BILLING_LO_USER_DELETE_CREDITS_ERROR',

  BILLING_LO_USER_ADD_NOTE: 'BILLING_LO_USER_ADD_NOTE',
  BILLING_LO_USER_ADD_CREDITS: 'BILLING_LO_USER_ADD_CREDITS',

  BILLING_LO_USER_EDIT_NOTE: 'BILLING_LO_USER_EDIT_NOTE',
  BILLING_LO_USER_EDIT_CREDITS: 'BILLING_LO_USER_EDIT_CREDITS',

  BILLING_USERS_TRANSACTIONS: 'BILLING_USERS_TRANSACTIONS',
  BILLING_USERS_TRANSACTIONS_SUCCESS: 'BILLING_USERS_TRANSACTIONS_SUCCESS',
  BILLING_USERS_TRANSACTIONS_ERROR: 'BILLING_USERS_TRANSACTIONS_ERROR',
  BILLING_LO_USERS_PAGE_DETAILES: 'BILLING_LO_USERS_PAGE_DETAILES',
  BILLING_EMPLOYEE_PAGE_DETAILES: 'BILLING_EMPLOYEE_PAGE_DETAILES',

  getPrimaryLOUsers: (payload) => ({
    type: actions.BILLING_LO_USERS,
    payload,
  }),
  savePrimaryLOUsersPageDetailes: (payload) => ({
    type: actions.BILLING_LO_USERS_PAGE_DETAILES,
    payload,
  }),

  saveEmployeePageDetailes: (payload) => ({
    type: actions.BILLING_EMPLOYEE_PAGE_DETAILES,
    payload,
  }),
  getPrimaryLOUsersDetails: (payload) => ({
    type: actions.BILLING_LO_USERS_DETAILS,
    payload,
  }),
  getTransactions: (payload) => ({
    type: actions.BILLING_USERS_TRANSACTIONS,
    payload,
  }),

  deleteCredits: (payload) => ({
    type: actions.BILLING_LO_USER_DELETE_CREDITS,
    payload,
  }),

  deleteNotes: (payload) => ({
    type: actions.BILLING_LO_USER_DELETE_NOTE,
    payload,
  }),

  addNotes: (payload, id, employeeOrNot) => ({
    type: actions.BILLING_LO_USER_ADD_NOTE,
    payload,
    id,
    employeeOrNot,
  }),
  editNotes: (payload, id, employeeOrNot, rediretId) => ({
    type: actions.BILLING_LO_USER_EDIT_NOTE,
    payload,
    id,
    employeeOrNot,

    rediretId,
  }),
  addCredits: (payload, id, employeeOrNot) => ({
    type: actions.BILLING_LO_USER_ADD_CREDITS,
    payload,
    id,
    employeeOrNot,
  }),
  editCredits: (payload, id, employeeOrNot, rediretId) => ({
    type: actions.BILLING_LO_USER_EDIT_CREDITS,
    payload,
    id,
    employeeOrNot,
    rediretId,
  }),
};

export default actions;
