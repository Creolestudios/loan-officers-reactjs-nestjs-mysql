import actions from './action';

const initState = {
  calculatorTypes: [],
};

export default function calculatorTypesReducer(state = initState, action) {
  switch (action.type) {
    case actions.CALCULATOR_TYPES_SUCCESS:
      return {
        ...state,
        calculatorTypes: action.list,
      };

    case actions.CALCULATOR_TYPES_ERROR:
      return {
        ...state,
        calculatorTypes: [...state.calculatorTypes],
      };

    case actions.EDIT_CALCULATOR_TYPES_SUCCESS:
      return {
        ...state,
        calculatorTypes: state.calculatorTypes.map((x, index) =>
          x.calculation_name.toLowerCase() === action.list.type
            ? {
                ...x,
                is_enable: action.list.is_enable,
              }
            : x
        ),
      };
    case actions.EDIT_CALCULATOR_TYPES_ERROR:
      return {
        ...state,
        calculatorTypes: [...state.calculatorTypes],
      };

    default:
      return state;
  }
}
