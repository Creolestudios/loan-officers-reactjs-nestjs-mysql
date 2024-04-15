const actions = {
  APP_DEFAULT_ADMIN_CHECKLIST: 'APP_DEFAULT_ADMIN_CHECKLIST',
  APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS: 'APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS',
  APP_DEFAULT_ADMIN_CHECKLIST_ERROR: 'APP_DEFAULT_ADMIN_CHECKLIST_ERROR',

  DELETE_APP_DEFAULT_ADMIN_CHECKLIST: 'DELETE_APP_DEFAULT_ADMIN_CHECKLIST',
  DELETE_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS:
    'DELETE_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS',
  DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ERROR:
    'DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ERROR',

  DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM:
    'DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM',
  DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM_SUCCESS:
    'DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM_SUCCESS',
  DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM_ERROR:
    'DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM_ERROR',

  DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST: 'DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST',
  DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS:
    'DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS',
  DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST_ERROR:
    'DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST_ERROR',

  SAVE_APP_DEFAULT_ADMIN_CHECKLIST: 'SAVE_APP_DEFAULT_ADMIN_CHECKLIST',
  SAVE_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS:
    'SAVE_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS',
  SAVE_APP_DEFAULT_ADMIN_CHECKLIST_ERROR:
    'SAVE_APP_DEFAULT_ADMIN_CHECKLIST_ERROR',

  EDIT_APP_DEFAULT_ADMIN_CHECKLIST: 'EDIT_APP_DEFAULT_ADMIN_CHECKLIST',
  EDIT_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS:
    'EDIT_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS',
  EDIT_APP_DEFAULT_ADMIN_CHECKLIST_ERROR:
    'EDIT_APP_DEFAULT_ADMIN_CHECKLIST_ERROR',

  getCheckList: (page) => {
    return {
      type: actions.APP_DEFAULT_ADMIN_CHECKLIST,
      payload: page,
    };
  },

  editCheckList: (payload) => ({
    type: actions.EDIT_APP_DEFAULT_ADMIN_CHECKLIST,
    payload,
  }),

  saveNewCheckList: (payload) => ({
    type: actions.SAVE_APP_DEFAULT_ADMIN_CHECKLIST,
    payload,
  }),

  defaultCheckList: () => ({
    type: actions.DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST,
  }),
  setIsDefaultDataEmpty: (payload) => ({
    type: actions.DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST_ERROR,
    payload,
  }),
  deleteCheckList: (payload) => ({
    type: actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST,
    payload,
  }),
  deleteCheckListItems: (payload) => ({
    type: actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM,
    payload,
  }),
};

export default actions;