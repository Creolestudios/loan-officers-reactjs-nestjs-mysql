const actions = {
  CALCULATOR_AFFORDABILITY: 'CALCULATOR_AFFORDABILITY',
  CALCULATOR_AFFORDABILITY_SUCCESS: 'CALCULATOR_AFFORDABILITY_SUCCESS',
  CALCULATOR_AFFORDABILITY_ERROR: 'CALCULATOR_AFFORDABILITY_ERROR',

  SAVE_CALCULATOR_AFFORDABILITY: 'SAVE_CALCULATOR_AFFORDABILITY',
  SAVE_CALCULATOR_AFFORDABILITY_SUCCESS:
    'SAVE_CALCULATOR_AFFORDABILITY_SUCCESS',
  SAVE_CALCULATOR_AFFORDABILITY_ERROR: 'SAVE_CALCULATOR_AFFORDABILITY_ERROR',

  DELETE_CALCULATOR_AFFORDABILITY_LOAN_FECTOR:
    'DELETE_CALCULATOR_AFFORDABILITY_LOAN_FACTOR',
  DELETE_CALCULATOR_AFFORDABILITY_LOAN_FECTOR_SUCCESS:
    'DELETE_CALCULATOR_AFFORDABILITY_LOAN_FECTOR_SUCCESS',
  DELETE_CALCULATOR_AFFORDABILITY_LOAN_FECTOR_ERROR:
    'DELETE_CALCULATOR_AFFORDABILITY_LOAN_FECTOR_ERROR',

  getAffordability: () => {
    return {
      type: actions.CALCULATOR_AFFORDABILITY,
    };
  },

  saveAffordability: (payload) => ({
    type: actions.SAVE_CALCULATOR_AFFORDABILITY,
    payload,
  }),
  deleteAffordabilityLoanFector: (payload) => ({
    type: actions.DELETE_CALCULATOR_AFFORDABILITY_LOAN_FECTOR,
    payload,
  }),
};

export default actions;
