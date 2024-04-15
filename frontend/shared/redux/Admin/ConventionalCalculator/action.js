const actions = {
  CONVENTIONAL_CALCULATOR_ADMIN: 'CONVENTIONAL_CALCULATOR_ADMIN',
  CONVENTIONAL_CALCULATOR_ADMIN_SUCCESS:
    'CONVENTIONAL_CALCULATOR_ADMIN_SUCCESS',
  CONVENTIONAL_CALCULATOR_ADMIN_ERROR: 'CONVENTIONAL_CALCULATOR_ADMIN_ERROR',

  SAVE_CONVENTIONAL_CALCULATOR_ADMIN: 'EDIT_CONVENTIONAL_CALCULATOR_ADMIN',
  SAVE_CONVENTIONAL_CALCULATOR_ADMIN_SUCCESS:
    'EDIT_CONVENTIONAL_CALCULATOR_ADMIN_SUCCESS',
  SAVE_CONVENTIONAL_CALCULATOR_ADMIN_ERROR:
    'EDIT_CONVENTIONAL_CALCULATOR_ADMIN_ERROR',

  DELETE_CONVENTIONAL_CALCULATOR_ADMIN_LOAN_FECTOR:
    'DELETE_CONVENTIONAL_CALCULATOR_ADMIN_LOAN_FACTOR',
  DELETE_CONVENTIONAL_CALCULATOR_ADMIN_LOAN_FECTOR_SUCCESS:
    'DELETE_CONVENTIONAL_CALCULATOR_ADMIN_LOAN_FECTOR_SUCCESS',
  DELETE_CONVENTIONAL_CALCULATOR_ADMIN_LOAN_FECTOR_ERROR:
    'DELETE_CONVENTIONAL_CALCULATOR_ADMIN_LOAN_FECTOR_ERROR',

  getConventional: () => {
    return {
      type: actions.CONVENTIONAL_CALCULATOR_ADMIN,
    };
  },

  saveConventional: (payload) => ({
    type: actions.SAVE_CONVENTIONAL_CALCULATOR_ADMIN,
    payload,
  }),
  deleteConventionalLoanFector: (payload) => ({
    type: actions.DELETE_CONVENTIONAL_CALCULATOR_ADMIN_LOAN_FECTOR,
    payload,
  }),
};

export default actions;
