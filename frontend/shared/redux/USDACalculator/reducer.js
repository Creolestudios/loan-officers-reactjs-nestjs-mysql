import actions from './action';

const initState = {
  calculatorUSDA: {},
};

export default function calculatorUSDAReducer(state = initState, action) {
  switch (action.type) {
    case actions.CALCULATOR_USDA_SUCCESS:
      return {
        ...state,
        calculatorUSDA: action.list,
      };

    case actions.CALCULATOR_USDA_ERROR:
      return {
        ...state,
        calculatorUSDA: { ...state.calculatorUSDA },
      };

    case actions.SAVE_CALCULATOR_USDA_SUCCESS:
      return {
        ...state,
        calculatorUSDA: action.list,
      };
    case actions.SAVE_CALCULATOR_USDA_ERROR:
      return {
        ...state,
        calculatorUSDA: { ...state.calculatorUSDA },
      };

    case actions.DELETE_CALCULATOR_USDA_LOAN_FECTOR_ERROR:
      return {
        ...state,
        calculatorUSDA: { ...state.calculatorUSDA },
      };

    default:
      return state;
  }
}
