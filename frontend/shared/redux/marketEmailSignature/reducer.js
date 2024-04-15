import actions from './action';

const initState = {
  marketEmailSignatureData: [],
};

export default function marketEmailSignatureReducer(state = initState, action) {
  switch (action.type) {
    case actions.MARKETING_EMAIL_SIGNATURE_SUCCESS:
      return {
        ...state,
        marketEmailSignatureData: action.list,
      };

    case actions.MARKETING_EMAIL_SIGNATURE_ERROR:
      return {
        ...state,
        marketEmailSignatureData: [...state.marketEmailSignatureData],
      };

    case actions.MARKETING_EMAIL_DELETE_SIGNATURE_SUCCESS:
      return {
        ...state,
        marketEmailSignatureData: state.marketEmailSignatureData.filter(
          (element) => element.id !== action.id
        ),
      };

    case actions.MARKETING_EMAIL_DELETE_SIGNATURE_ERROR:
      return {
        ...state,
        marketEmailSignatureData: [...state.marketEmailSignatureData],
      };

    default:
      return state;
  }
}
