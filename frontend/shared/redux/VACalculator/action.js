const actions = {
  CALCULATOR_VA: 'CALCULATOR_VA',
  CALCULATOR_VA_SUCCESS: 'CALCULATOR_VA_SUCCESS',
  CALCULATOR_VA_ERROR: 'CALCULATOR_VA_ERROR',

  SAVE_CALCULATOR_VA: 'SAVE_CALCULATOR_VA',
  SAVE_CALCULATOR_VA_SUCCESS: 'SAVE_CALCULATOR_VA_SUCCESS',
  SAVE_CALCULATOR_VA_ERROR: 'SAVE_CALCULATOR_VA_ERROR',

  getVA: () => {
    return {
      type: actions.CALCULATOR_VA,
    };
  },

  saveVA: (payload) => ({
    type: actions.SAVE_CALCULATOR_VA,
    payload,
  }),
};

export default actions;
