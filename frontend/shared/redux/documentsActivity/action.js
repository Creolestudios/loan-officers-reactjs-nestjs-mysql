const actions = {
  ACTIVITY_DOCUMENTS: 'ACTIVITY_DOCUMENTS',
  ACTIVITY_DOCUMENTS_SUCCESS: 'ACTIVITY_DOCUMENTS_SUCCESS',
  ACTIVITY_DOCUMENTS_ERROR: 'ACTIVITY_DOCUMENTS_ERROR',

  getDocuments: (payload) => ({
    type: actions.ACTIVITY_DOCUMENTS,
    payload,
  }),
};

export default actions;
