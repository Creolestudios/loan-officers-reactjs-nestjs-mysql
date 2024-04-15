const actions = {
  DASHBOARD_DATA: 'DASHBOARD_DATA',
  DASHBOARD_DATA_SUCCESS: 'DASHBOARD_DATA_SUCCESS',
  DASHBOARD_DATA_ERROR: 'DASHBOARD_DATA_ERROR',

  getDashboardData: () => ({
    type: actions.DASHBOARD_DATA,
  }),
};

export default actions;
