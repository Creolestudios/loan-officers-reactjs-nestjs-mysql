import actions from './action';

const initState = {
  calculatorJumbo: {},
};

export default function calculatorJumboReducer(state = initState, action) {
  switch (action.type) {
    case actions.JUMBO_CALCULATOR_SUCCESS:
      return {
        ...state,
        calculatorJumbo: action.list,
      };

    case actions.JUMBO_CALCULATOR_ERROR:
      return {
        ...state,
        calculatorJumbo: { ...state.calculatorJumbo },
      };

    case actions.SAVE_JUMBO_CALCULATOR_SUCCESS:
      return {
        ...state,
        calculatorJumbo: action.list,
      };
    case actions.SAVE_JUMBO_CALCULATOR_ERROR:
      return {
        ...state,
        calculatorJumbo: { ...state.calculatorJumbo },
      };

    case actions.DELETE_JUMBO_CALCULATOR_LOAN_FECTOR_ERROR:
      return {
        ...state,
        calculatorJumbo: { ...state.calculatorJumbo },
      };

    default:
      return state;
  }
}
