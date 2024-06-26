const actions = {
  LO_COLOR_SCHEMA: 'LO_COLOR_SCHEMA',
  LO_COLOR_SCHEMA_SUCCESS: 'LO_COLOR_SCHEMA_SUCCESS',
  LO_COLOR_SCHEMA_ERROR: 'LO_COLOR_SCHEMA_ERROR',

  UPDATE_LO_COLOR_SCHEMA: 'UPDATE_LO_COLOR_SCHEMA',
  UPDATE_LO_COLOR_SCHEMA_SUCCESS: 'UPDATE_LO_COLOR_SCHEMA_SUCCESS',
  UPDATE_LO_COLOR_SCHEMA_ERROR: 'LO_COLOR_SCHEMA_ERROR',

  getColorSchema: () => ({
    type: actions.LO_COLOR_SCHEMA,
  }),
  updateColorSchema: (payload) => ({
    type: actions.UPDATE_LO_COLOR_SCHEMA,
    payload,
  }),
};

export default actions;
