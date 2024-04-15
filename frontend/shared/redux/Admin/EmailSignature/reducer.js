import actions from './action';

const initState = {
  appDefaultEmailSignatureData: [],
};

export default function AppDefaultEmailSignatureReducer(
  state = initState,
  action
) {
  switch (action.type) {
    case actions.APP_DEFAULT__EMAIL_SIGNATURE_SUCCESS:
      return {
        ...state,
        appDefaultEmailSignatureData: action.list,
      };

    case actions.APP_DEFAULT__EMAIL_SIGNATURE_ERROR:
      return {
        ...state,
        appDefaultEmailSignatureData: [...state.appDefaultEmailSignatureData],
      };

    case actions.APP_DEFAULT_EMAIL_DELETE_SIGNATURE_SUCCESS:
      return {
        ...state,
        appDefaultEmailSignatureData: state.appDefaultEmailSignatureData.filter(
          (element) => element.id !== action.id
        ),
      };

    case actions.APP_DEFAULT_EMAIL_DELETE_SIGNATURE_ERROR:
      return {
        ...state,
        appDefaultEmailSignatureData: [...state.appDefaultEmailSignatureData],
      };

    default:
      return state;
  }
}
