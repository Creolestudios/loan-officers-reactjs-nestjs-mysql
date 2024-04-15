import actions from './action';

const initState = {
  calculatorFHA: {},
};

export default function calculatorFHAAdminReducer(state = initState, action) {
  switch (action.type) {
    case actions.CALCULATOR_FHA_ADMIN_SUCCESS:
      return {
        ...state,
        calculatorFHA: action.list,
      };

    case actions.CALCULATOR_FHA_ADMIN_ERROR:
      return {
        ...state,
        calculatorFHA: { ...state.calculatorFHA },
      };

    case actions.SAVE_CALCULATOR_FHA_ADMIN_SUCCESS:
      return {
        ...state,
        calculatorFHA: action.list,
      };
    case actions.SAVE_CALCULATOR_FHA_ADMIN_ERROR:
      return {
        ...state,
        calculatorFHA: { ...state.calculatorFHA },
      };

    case actions.DELETE_CALCULATOR_FHA_ADMIN_LOAN_FECTOR_ERROR:
      return {
        ...state,
        calculatorFHA: { ...state.calculatorFHA },
      };

    default:
      return state;
  }
}
