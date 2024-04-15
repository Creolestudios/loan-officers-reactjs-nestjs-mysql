import actions from './action';

const initState = {
  calculatorAffordability: {},
};

export default function calculatorAffordabilityAdminReducer(
  state = initState,
  action
) {
  switch (action.type) {
    case actions.CALCULATOR_AFFORDABILITY_ADMIN_SUCCESS:
      return {
        ...state,
        calculatorAffordability: action.list,
      };

    case actions.CALCULATOR_AFFORDABILITY_ADMIN_ERROR:
      return {
        ...state,
        calculatorAffordability: { ...state.calculatorAffordability },
      };

    case actions.SAVE_CALCULATOR_AFFORDABILITY_ADMIN_SUCCESS:
      return {
        ...state,
        calculatorAffordability: action.list,
      };
    case actions.SAVE_CALCULATOR_AFFORDABILITY_ADMIN_ERROR:
      return {
        ...state,
        calculatorAffordability: { ...state.calculatorAffordability },
      };

    case actions.DELETE_CALCULATOR_AFFORDABILITY_ADMIN_LOAN_FECTOR_ERROR:
      return {
        ...state,
        calculatorAffordability: { ...state.calculatorAffordability },
      };

    default:
      return state;
  }
}
