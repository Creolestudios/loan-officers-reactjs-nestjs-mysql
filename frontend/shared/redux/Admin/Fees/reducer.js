import actions from './action';

const initState = {
  loanSettingFees: [],
};

export default function feesLoanSettingReducer(state = initState, action) {
  switch (action.type) {
    case actions.APP_DEFAULT_FEES_SUCCESS:
      return {
        ...state,
        loanSettingFees: action.list,
      };

    case actions.APP_DEFAULT_FEES_ERROR:
      return {
        ...state,
        loanSettingFees: [...state.loanSettingFees],
      };

    case actions.EDIT_APP_DEFAULT_FEES_SUCCESS:
      return {
        ...state,
        loanSettingFees: [...state.loanSettingFees, action.list],
      };
    case actions.EDIT_APP_DEFAULT_FEES_ERROR:
      return {
        ...state,
        loanSettingFees: [...state.loanSettingFees],
      };
    case actions.SAVE_APP_DEFAULT_FEES_SUCCESS:
      return {
        ...state,
        loanSettingFees: [...state.loanSettingFees, action.list],
      };
    case actions.SAVE_APP_DEFAULT_FEES_ERROR:
      return {
        ...state,
        loanSettingFees: [...state.loanSettingFees],
      };

    case actions.DELETE_APP_DEFAULT_FEES_SUCCESS:
      return {
        ...state,
        loanSettingFees: state.loanSettingFees.filter(
          (item) => item.id !== Number(action.id)
        ),
      };

    default:
      return state;
  }
}
