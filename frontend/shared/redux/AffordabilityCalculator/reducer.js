import actions from './action';

const initState = {
  calculatorAffordability: {},
};

export default function calculatorAffordabilityReducer(
  state = initState,
  action
) {
  switch (action.type) {
    case actions.CALCULATOR_AFFORDABILITY_SUCCESS:
      return {
        ...state,
        calculatorAffordability: action.list,
      };

    case actions.CALCULATOR_AFFORDABILITY_ERROR:
      return {
        ...state,
        calculatorAffordability: { ...state.calculatorAffordability },
      };

    case actions.SAVE_CALCULATOR_AFFORDABILITY_SUCCESS:
      return {
        ...state,
        calculatorAffordability: action.list,
      };
    case actions.SAVE_CALCULATOR_AFFORDABILITY_ERROR:
      return {
        ...state,
        calculatorAffordability: { ...state.calculatorAffordability },
      };

    case actions.DELETE_CALCULATOR_AFFORDABILITY_LOAN_FECTOR_ERROR:
      return {
        ...state,
        calculatorAffordability: { ...state.calculatorAffordability },
      };

    default:
      return state;
  }
}
