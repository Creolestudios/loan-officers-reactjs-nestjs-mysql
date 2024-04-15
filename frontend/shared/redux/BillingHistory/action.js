const actions = {
  LO_BILLING_HISTORY: 'LO_BILLING_HISTORY',
  LO_BILLING_HISTORY_SUCCESS: 'LO_BILLING_HISTORY_SUCCESS',
  LO_BILLING_HISTORY_ERROR: 'LO_BILLING_HISTORY_ERROR',

  getBillingHistory: (payload) => ({
    type: actions.LO_BILLING_HISTORY,
    payload,
  }),
};

export default actions;
