const actions = {
  CONTENT_LO_LEGAL_PRIVACY: 'CONTENT_LO_LEGAL_PRIVACY',
  CONTENT_LO_LEGAL_PRIVACY_SUCCESS: 'CONTENT_LO_LEGAL_PRIVACY_SUCCESS',
  CONTENT_LO_LEGAL_PRIVACY_ERROR: 'CONTENT_LO_LEGAL_PRIVACY_ERROR',

  CONTENT_LO_LEGAL_DISCLAIMER: 'CONTENT_LO_LEGAL_DISCLAIMER',
  CONTENT_LO_LEGAL_DISCLAIMER_SUCCESS: 'CONTENT_LO_LEGAL_DISCLAIMER_SUCCESS',
  CONTENT_LO_LEGAL_DISCLAIMER_ERROR: 'CONTENT_LO_LEGAL_DISCLAIMER_ERROR',

  UPDATE_CONTENT_LO_LEGAL_PRIVACY: 'UPDATE_CONTENT_LO_LEGAL_PRIVACY',
  UPDATE_CONTENT_LO_LEGAL_PRIVACY_SUCCESS:
    'UPDATE_CONTENT_LO_LEGAL_PRIVACY_SUCCESS',
  UPDATE_CONTENT_LO_LEGAL_PRIVACY_ERROR:
    'UPDATE_CONTENT_LO_LEGAL_PRIVACY_ERROR',

  UPDATE_CONTENT_LO_LEGAL_DISCLAIMER: 'UPDATE_CONTENT_LO_LEGAL_DISCLAIMER',
  UPDATE_CONTENT_LO_LEGAL_DISCLAIMER_SUCCESS:
    'UPDATE_CONTENT_LO_LEGAL_DISCLAIMER_SUCCESS',
  UPDATE_CONTENT_LO_LEGAL_DISCLAIMER_ERROR:
    'UPDATE_CONTENT_LO_LEGAL_DISCLAIMER_ERROR',

  legalPrivacy: () => {
    return {
      type: actions.CONTENT_LO_LEGAL_PRIVACY,
    };
  },
  legalDisclaimer: () => ({
    type: actions.CONTENT_LO_LEGAL_DISCLAIMER,
  }),
  updateLegalPrivacy: (payload) => ({
    type: actions.UPDATE_CONTENT_LO_LEGAL_PRIVACY,
    payload,
  }),
  updateLegalDisclaimer: (payload) => ({
    type: actions.UPDATE_CONTENT_LO_LEGAL_DISCLAIMER,
    payload,
  }),
};

export default actions;