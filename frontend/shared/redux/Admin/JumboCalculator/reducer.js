import actions from './action';

const initState = {
  calculatorJumbo: {},
};

export default function calculatorJumboAdminReducer(state = initState, action) {
  switch (action.type) {
    case actions.JUMBO_CALCULATOR_ADMIN_SUCCESS:
      return {
        ...state,
        calculatorJumbo: action.list,
      };

    case actions.JUMBO_CALCULATOR_ADMIN_ERROR:
      return {
        ...state,
        calculatorJumbo: { ...state.calculatorJumbo },
      };

    case actions.SAVE_JUMBO_CALCULATOR_ADMIN_SUCCESS:
      return {
        ...state,
        calculatorJumbo: action.list,
      };
    case actions.SAVE_JUMBO_CALCULATOR_ADMIN_ERROR:
      return {
        ...state,
        calculatorJumbo: { ...state.calculatorJumbo },
      };

    case actions.DELETE_JUMBO_CALCULATOR_ADMIN_LOAN_FECTOR_ERROR:
      return {
        ...state,
        calculatorJumbo: { ...state.calculatorJumbo },
      };

    default:
      return state;
  }
}
