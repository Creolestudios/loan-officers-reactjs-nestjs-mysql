const actions = {
  CALCULATOR_FHA: 'CALCULATOR_FHA',
  CALCULATOR_FHA_SUCCESS: 'CALCULATOR_FHA_SUCCESS',
  CALCULATOR_FHA_ERROR: 'CALCULATOR_FHA_ERROR',

  SAVE_CALCULATOR_FHA: 'EDIT_CALCULATOR_FHA',
  SAVE_CALCULATOR_FHA_SUCCESS: 'EDIT_CALCULATOR_FHA_SUCCESS',
  SAVE_CALCULATOR_FHA_ERROR: 'EDIT_CALCULATOR_FHA_ERROR',

  DELETE_CALCULATOR_FHA_LOAN_FECTOR: 'DELETE_CALCULATOR_FHA_LOAN_FACTOR',
  DELETE_CALCULATOR_FHA_LOAN_FECTOR_SUCCESS:
    'DELETE_CALCULATOR_FHA_LOAN_FECTOR_SUCCESS',
  DELETE_CALCULATOR_FHA_LOAN_FECTOR_ERROR:
    'DELETE_CALCULATOR_FHA_LOAN_FECTOR_ERROR',

  getFHA: () => {
    return {
      type: actions.CALCULATOR_FHA,
    };
  },

  saveFHA: (payload) => ({
    type: actions.SAVE_CALCULATOR_FHA,
    payload,
  }),
  deleteFHALoanFector: (payload) => ({
    type: actions.DELETE_CALCULATOR_FHA_LOAN_FECTOR,
    payload,
  }),
};

export default actions;
