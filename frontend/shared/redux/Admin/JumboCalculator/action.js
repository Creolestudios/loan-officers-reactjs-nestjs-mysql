const actions = {
  JUMBO_CALCULATOR_ADMIN: 'JUMBO_CALCULATOR_ADMIN',
  JUMBO_CALCULATOR_ADMIN_SUCCESS: 'JUMBO_CALCULATOR_ADMIN_SUCCESS',
  JUMBO_CALCULATOR_ADMIN_ERROR: 'JUMBO_CALCULATOR_ADMIN_ERROR',

  SAVE_JUMBO_CALCULATOR_ADMIN: 'SAVE_JUMBO_CALCULATOR_ADMIN',
  SAVE_JUMBO_CALCULATOR_ADMIN_SUCCESS: 'SAVE_JUMBO_CALCULATOR_ADMIN_SUCCESS',
  SAVE_JUMBO_CALCULATOR_ADMIN_ERROR: 'SAVE_JUMBO_CALCULATOR_ADMIN_ERROR',

  DELETE_JUMBO_CALCULATOR_ADMIN_LOAN_FECTOR:
    'DELETE_JUMBO_CALCULATOR_ADMIN_LOAN_FACTOR',
  DELETE_JUMBO_CALCULATOR_ADMIN_LOAN_FECTOR_SUCCESS:
    'DELETE_JUMBO_CALCULATOR_ADMIN_LOAN_FECTOR_SUCCESS',
  DELETE_JUMBO_CALCULATOR_ADMIN_LOAN_FECTOR_ERROR:
    'DELETE_JUMBO_CALCULATOR_ADMIN_LOAN_FECTOR_ERROR',

  getJumbo: () => {
    return {
      type: actions.JUMBO_CALCULATOR_ADMIN,
    };
  },

  saveJumbo: (payload) => ({
    type: actions.SAVE_JUMBO_CALCULATOR_ADMIN,
    payload,
  }),
  deleteJumboLoanFector: (payload) => ({
    type: actions.DELETE_JUMBO_CALCULATOR_ADMIN_LOAN_FECTOR,
    payload,
  }),
};

export default actions;
