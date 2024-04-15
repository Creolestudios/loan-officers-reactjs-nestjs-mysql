const actions = {
  CALCULATOR_TYPES: 'CALCULATOR_TYPES',
  CALCULATOR_TYPES_SUCCESS: 'CALCULATOR_TYPES_SUCCESS',
  CALCULATOR_TYPES_ERROR: 'CALCULATOR_TYPES_ERROR',

  CALCULATOR_RESTORE_DEFAULT: 'CALCULATOR_RESTORE_DEFAULT',

  CALCULATOR_DISCLAIMER: 'CALCULATOR_DISCLAIMER',
  CALCULATOR_DISCLAIMER_SUCCESS: 'CALCULATOR_DISCLAIMER_SUCCESS',
  CALCULATOR_DISCLAIMER_ERROR: 'CALCULATOR_DISCLAIMER_ERROR',

  EDIT_CALCULATOR_TYPES: 'EDIT_CALCULATOR_TYPES',
  EDIT_CALCULATOR_TYPES_SUCCESS: 'EDIT_CALCULATOR_TYPES_SUCCESS',
  EDIT_CALCULATOR_TYPES_ERROR: 'EDIT_CALCULATOR_TYPES_ERROR',

  getTypes: () => {
    return {
      type: actions.CALCULATOR_TYPES,
    };
  },

  editTypes: (payload) => ({
    type: actions.EDIT_CALCULATOR_TYPES,
    payload,
  }),

  saveDisclaimer: (payload) => ({
    type: actions.CALCULATOR_DISCLAIMER,
    payload,
  }),

  saveDisclaimer: (payload) => ({
    type: actions.CALCULATOR_DISCLAIMER,
    payload,
  }),

  restoreDefaultCalculator: (payload) => ({
    type: actions.CALCULATOR_RESTORE_DEFAULT,
    payload,
  }),
};

export default actions;
