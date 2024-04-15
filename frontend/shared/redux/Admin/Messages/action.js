const actions = {
  ADMIN_MESSAGES: 'ADMIN_MESSAGES',
  ADMIN_MESSAGES_SUCCESS: 'ADMIN_MESSAGES_SUCCESS',

  EDIT_ADMIN_MESSAGES: 'EDIT_ADMIN_MESSAGES',

  DELETE_ADMIN_MESSAGES: 'DELETE_ADMIN_MESSAGES',
  DELETE_ADMIN_MESSAGES_SUCCESS: 'DELETE_ADMIN_MESSAGES_SUCCESS',

  ADD_ADMIN_MESSAGES: 'ADD_ADMIN_MESSAGES',

  getMessages: () => {
    return {
      type: actions.ADMIN_MESSAGES,
    };
  },

  addNewMessage: (payload) => ({
    type: actions.ADD_ADMIN_MESSAGES,
    payload,
  }),

  editMessage: (payload) => ({
    type: actions.EDIT_ADMIN_MESSAGES,
    payload,
  }),
  deleteMessage: (id) => ({
    type: actions.DELETE_ADMIN_MESSAGES,
    id,
  }),
};

export default actions;
