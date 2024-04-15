import actions from './action';

const initState = {
  LegalDataList: {},
  //   isDefaultDataEmpty: false,
};

export default function legalAppDefaultReducer(state = initState, action) {
  switch (action.type) {
    case actions.APP_DEFAULT_LEGAL_SUCCESS:
      return {
        ...state,
        LegalDataList: action.data,
      };

    case actions.APP_DEFAULT_LEGAL_ERROR:
      return {
        ...state,
        LegalDataList: { ...state.LegalDataList },
      };

    case actions.UPDATE_APP_DEFAULT_LEGAL_SUCCESS:
      return {
        ...state,
        LegalDataList: action.data,
      };
    case actions.UPDATE_APP_DEFAULT_LEGAL_ERROR:
      return {
        ...state,
        LegalDataList: { ...state.LegalDataList },
      };

    default:
      return state;
  }
}
