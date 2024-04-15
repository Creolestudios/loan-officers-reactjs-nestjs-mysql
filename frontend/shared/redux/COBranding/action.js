const actions = {
  LO_CO_BRANDING: 'LO_CO_BRANDING',
  LO_CO_BRANDING_SUCCESS: 'LO_CO_BRANDING_SUCCESS',
  LO_CO_BRANDING_ERROR: 'LO_CO_BRANDING_ERROR',

  LO_CO_BRANDING_BY_ID: 'LO_CO_BRANDING_BY_ID',
  LO_CO_BRANDING_BY_ID_SUCCESS: 'LO_CO_BRANDING_BY_ID_SUCCESS',
  LO_CO_BRANDING_BY_ID_ERROR: 'LO_CO_BRANDING_BY_ID_ERROR',

  ADD_LO_CO_BRANDING: 'ADD_LO_CO_BRANDING',
  ADD_LO_CO_BRANDING_SUCCESS: 'ADD_LO_CO_BRANDING_SUCCESS',
  ADD_LO_CO_BRANDING_ERROR: 'ADD_LO_CO_BRANDING_ERROR',

  SHARE_APP_LINK: 'SHARE_APP_LINK',
  EDIT_LO_CO_BRANDING: 'EDIT_LO_CO_BRANDING',
  EDIT_LO_CO_BRANDING_SUCCESS: 'EDIT_LO_CO_BRANDING_SUCCESS',
  EDIT_LO_CO_BRANDING_ERROR: 'EDIT_LO_CO_BRANDING_ERROR',

  DELETE_LO_CO_BRANDING: 'DELETE_LO_CO_BRANDING',
  DELETE_LO_CO_BRANDING_SUCCESS: 'DELETE_LO_CO_BRANDING_SUCCESS',
  DELETE_LO_CO_BRANDING_ERROR: 'DELETE_LO_CO_BRANDING_ERROR',

  getCoBranding: (payload) => ({
    type: actions.LO_CO_BRANDING,
    payload,
  }),
  getCoBrandingById: (payload) => ({
    type: actions.LO_CO_BRANDING_BY_ID,
    payload,
  }),
  addCoBranding: (payload, edit) => ({
    type: actions.ADD_LO_CO_BRANDING,
    payload,
    edit,
  }),
  shareAppLink: (payload) => ({
    type: actions.SHARE_APP_LINK,
    payload,
  }),
  deleteCoBranding: (payload) => ({
    type: actions.DELETE_LO_CO_BRANDING,
    payload,
  }),
  editCoBranding: (payload, id) => ({
    type: actions.EDIT_LO_CO_BRANDING,
    payload,
    id,
  }),
};

export default actions;
