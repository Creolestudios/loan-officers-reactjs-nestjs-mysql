const actions = {
  GET_DEFAULT_DATA: 'GET_DEFAULT_DATA',
  GET_DEFAULT_DATA_SUCCESS: 'GET_DEFAULT_DATA_SUCCESS',
  GET_DEFAULT_DATA_ERROR: 'GET_DEFAULT_DATA_ERROR',

  USERS_LO_DETAILS: 'USERS_LO_DETAILS',
  USERS_LO_DETAILS_SUCCESS: 'USERS_LO_DETAILS_SUCCESS',
  USERS_LO_DETAILS_ERROR: 'USERS_LO_DETAILS_ERROR',

  GET_USERS_LO: 'GET_USERS_LO',
  GET_USERS_LO_SUCCESS: 'GET_USERS_LO_SUCCESS',
  GET_USERS_LO_ERROR: 'GET_USERS_LO_ERROR',

  ADMIN_USERS_LO_DISABLE: 'ADMIN_USERS_LO_DISABLE',
  ADMIN_USERS_LO_DISABLE_SUCCESS: 'ADMIN_USERS_LO_DISABLE_SUCCESS',
  ADMIN_USERS_LO_DISABLE_ERROR: 'ADMIN_USERS_LO_DISABLE_ERROR',
  USERS_LO_PAGE_DETAILES: 'USERS_LO_PAGE_DETAILES',

  getLOUsers: (payload) => ({
    type: actions.GET_USERS_LO,
    payload,
  }),
  saveUserLOPageDetailes: (payload) => ({
    type: actions.USERS_LO_PAGE_DETAILES,
    payload,
  }),
  getDefaultData: (payload) => ({
    type: actions.GET_DEFAULT_DATA,
    payload,
  }),
  getUsersLODetails: (payload) => ({
    type: actions.USERS_LO_DETAILS,
    payload,
  }),
  disableLOUsers: (payload) => ({
    type: actions.ADMIN_USERS_LO_DISABLE,
    payload,
  }),
};

export default actions;
