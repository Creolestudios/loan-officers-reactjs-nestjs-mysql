const actions = {
  GET_ADMIN_MY_ACCOUNT: 'GET_ADMIN_MY_ACCOUNT',
  GET_ADMIN_MY_ACCOUNT_SUCCESS: 'GET_ADMIN_MY_ACCOUNT_SUCCESS',
  GET_ADMIN_MY_ACCOUNT_ERROR: 'GET_ADMIN_MY_ACCOUNT_ERROR',

  EDIT_ADMIN_MY_ACCOUNT: 'EDIT_ADMIN_MY_ACCOUNT',
  EDIT_ADMIN_MY_ACCOUNT_SUCCESS: 'EDIT_ADMIN_MY_ACCOUNT_SUCCESS',
  EDIT_ADMIN_MY_ACCOUNT_ERROR: 'EDIT_ADMIN_MY_ACCOUNT_ERROR',

  EDIT_ADMIN_PROFILE_PHOTO: 'EDIT_ADMIN_PROFILE_PHOTO',
  EDIT_ADMIN_PROFILE_PHOTO_SUCCESS: 'EDIT_ADMIN_PROFILE_PHOTO_SUCCESS',
  EDIT_ADMIN_PROFILE_PHOTO_ERROR: 'EDIT_ADMIN_PROFILE_PHOTO_ERROR',

  getMyAccount: () => {
    return {
      type: actions.GET_ADMIN_MY_ACCOUNT,
    };
  },
  editPfofilePhoto: (payload) => {
    return {
      type: actions.EDIT_ADMIN_PROFILE_PHOTO,
      payload,
    };
  },

  editMyAccount: (payload) => ({
    type: actions.EDIT_ADMIN_MY_ACCOUNT,
    payload,
  }),
};

export default actions;