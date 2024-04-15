import actions from './action';

const initState = {
  calculatorConventional: {},
};

export default function calculatorConventionalReducer(
  state = initState,
  action
) {
  switch (action.type) {
    case actions.CONVENTIONAL_CALCULATOR_ADMIN_SUCCESS:
      return {
        ...state,
        calculatorConventional: action.list,
      };

    case actions.CONVENTIONAL_CALCULATOR_ADMIN_ERROR:
      return {
        ...state,
        calculatorConventional: { ...state.calculatorConventional },
      };

    case actions.SAVE_CONVENTIONAL_CALCULATOR_ADMIN_SUCCESS:
      return {
        ...state,
        calculatorConventional: action.list,
      };
    case actions.SAVE_CONVENTIONAL_CALCULATOR_ADMIN_ERROR:
      return {
        ...state,
        calculatorConventional: { ...state.calculatorConventional },
      };

    case actions.DELETE_CONVENTIONAL_CALCULATOR_ADMIN_LOAN_FECTOR_ERROR:
      return {
        ...state,
        calculatorConventional: { ...state.calculatorConventional },
      };

    default:
      return state;
  }
}
