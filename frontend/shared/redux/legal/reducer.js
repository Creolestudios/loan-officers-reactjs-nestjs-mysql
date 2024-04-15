import actions from './action';

const initState = {
  contentLegalPrivacy: {},
  contentLegalDisclaimer: {},
  //   isDefaultDataEmpty: false,
};

export default function legalReducer(state = initState, action) {
  switch (action.type) {
    case actions.CONTENT_LO_LEGAL_PRIVACY_SUCCESS:
      return {
        ...state,
        contentLegalPrivacy: action.data,
      };

    case actions.CONTENT_LO_LEGAL_PRIVACY_ERROR:
      return {
        ...state,
        contentLegalPrivacy: { ...state.contentLegalPrivacy },
      };
    case actions.CONTENT_LO_LEGAL_DISCLAIMER_SUCCESS:
      return {
        ...state,
        contentLegalDisclaimer: action.data,
      };
    case actions.CONTENT_LO_LEGAL_DISCLAIMER_ERROR:
      return {
        ...state,
        contentLegalDisclaimer: { ...state.contentLegalDisclaimer },
      };
    case actions.UPDATE_CONTENT_LO_LEGAL_PRIVACY_SUCCESS:
      return {
        ...state,
        contentLegalPrivacy: action.data,
      };
    case actions.UPDATE_CONTENT_LO_LEGAL_PRIVACY_ERROR:
      return {
        ...state,
        contentLegalPrivacy: { ...state.contentLegalPrivacy },
      };
    case actions.UPDATE_CONTENT_LO_LEGAL_DISCLAIMER_SUCCESS:
      return {
        ...state,
        contentLegalDisclaimer: action.data,
      };
    case actions.UPDATE_CONTENT_LO_LEGAL_DISCLAIMER_ERROR:
      return {
        ...state,
        contentLegalDisclaimer: { ...state.contentLegalDisclaimer },
      };
    default:
      return state;
  }
}
