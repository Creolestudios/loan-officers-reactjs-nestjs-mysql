const actions = {
  WEB_LINK: 'WEB_LINK',
  WEB_LINK_SUCCESS: 'WEB_LINK_SUCCESS',
  WEB_LINK_ERROR: 'WEB_LINK_ERROR',

  saveWebLink: (payload) => ({
    type: actions.WEB_LINK,
    payload,
  }),
};

export default actions;
