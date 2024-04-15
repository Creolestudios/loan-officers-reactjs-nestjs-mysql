import actions from './action';

const initState = {
  calculatorVA: {},
};

export default function calculatorVAReducer(state = initState, action) {
  switch (action.type) {
    case actions.CALCULATOR_VA_ADMIN_SUCCESS:
      return {
        ...state,
        calculatorVA: action.list,
      };

    case actions.CALCULATOR_VA_ADMIN_ERROR:
      return {
        ...state,
        calculatorVA: { ...state.calculatorVA },
      };

    case actions.SAVE_CALCULATOR_VA_ADMIN_SUCCESS:
      return {
        ...state,
        calculatorVA: action.list,
      };
    case actions.SAVE_CALCULATOR_VA_ADMIN_ERROR:
      return {
        ...state,
        calculatorVA: { ...state.calculatorVA },
      };

    default:
      return state;
  }
}
