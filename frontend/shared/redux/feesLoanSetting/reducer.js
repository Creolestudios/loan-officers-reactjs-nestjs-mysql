import actions from './action';

const initState = {
  loanSettingFees: [],
};

export default function feesLoanSettingReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOAN_SETTINGS_FEES_SUCCESS:
      return {
        ...state,
        loanSettingFees: action.list,
      };

    case actions.LOAN_SETTINGS_FEES_ERROR:
      return {
        ...state,
        loanSettingFees: [...state.loanSettingFees],
      };

    case actions.EDIT_LOAN_SETTINGS_FEES_SUCCESS:
      return {
        ...state,
        loanSettingFees: [...state.loanSettingFees, action.list],
      };
    case actions.EDIT_LOAN_SETTINGS_FEES_ERROR:
      return {
        ...state,
        loanSettingFees: [...state.loanSettingFees],
      };

    case actions.DELETE_LOAN_SETTINGS_FEES_SUCCESS:
      return {
        ...state,
        loanSettingFees: state.loanSettingFees.filter(
          (item) => item.id !== Number(action.id)
        ),
      };
    // case actions.SAVE_LOAN_SETTINGS_FEES_SUCCESS:
    //   return {
    //     ...state,
    //     loanSettingFees: [...state.loanSettingFees, action.list],
    //   };
    // case actions.SAVE_LOAN_SETTINGS_FEES_ERROR:
    //   return {
    //     ...state,
    //     loanSettingFees: [...state.loanSettingFees],
    //   };

    default:
      return state;
  }
}
