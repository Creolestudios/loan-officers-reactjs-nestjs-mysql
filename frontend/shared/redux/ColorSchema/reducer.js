import actions from './action';

const initState = {
  ColorSchemaTheme: [],
};

export default function CoBrandReducer(state = initState, action) {
  switch (action.type) {
    case actions.LO_COLOR_SCHEMA_SUCCESS:
      return {
        ...state,
        ColorSchemaTheme: action.list,
      };
    case actions.LO_COLOR_SCHEMA_ERROR:
      return {
        ...state,
        ColorSchemaTheme: [...state.ColorSchemaTheme],
      };
    case actions.UPDATE_LO_COLOR_SCHEMA_SUCCESS:
      return {
        ...state,
        ColorSchemaTheme: action.list,
      };
    case actions.UPDATE_LO_COLOR_SCHEMA_ERROR:
      return {
        ...state,
        ColorSchemaTheme: [...state.ColorSchemaTheme],
      };
    default:
      return state;
  }
}
