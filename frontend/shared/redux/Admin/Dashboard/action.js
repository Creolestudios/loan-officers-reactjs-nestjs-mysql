const actions = {
  DASHBOARD_TOTAL_USER: 'DASHBOARD_TOTAL_USER',
  DASHBOARD_TOTAL_USER_SUCCESS: 'DASHBOARD_TOTAL_USER_SUCCESS',
  DASHBOARD_TOTAL_USER_ERROR: 'DASHBOARD_TOTAL_USER_ERROR',

  DASHBOARD_NEW_ACCOUNTS: 'DASHBOARD_NEW_ACCOUNTS',
  DASHBOARD_NEW_ACCOUNTS_SUCCESS: 'DASHBOARD_NEW_ACCOUNTS_SUCCESS',
  DASHBOARD_NEW_ACCOUNTS_ERROR: 'DASHBOARD_NEW_ACCOUNTS_ERROR',

  DASHBOARD_RECENT_ACTIVITY: 'DASHBOARD_RECENT_ACTIVITY',
  DASHBOARD_RECENT_ACTIVITY_SUCCESS: 'DASHBOARD_RECENT_ACTIVITY_SUCCESS',

  DASHBOARD_APP_INSTALLTION: 'DASHBOARD_APP_INSTALLTION',
  DASHBOARD_APP_INSTALLTION_SUCCESS: 'DASHBOARD_APP_INSTALLTION_SUCCESS',

  getDashboardTotalUser: (payload) => ({
    type: actions.DASHBOARD_TOTAL_USER,
    payload,
  }),

  getDashboardNewAccounts: (payload) => ({
    type: actions.DASHBOARD_NEW_ACCOUNTS,
    payload,
  }),
  getDashboardRecentActivity: () => ({
    type: actions.DASHBOARD_RECENT_ACTIVITY,
  }),
  getDashboardAppInstalltion: () => ({
    type: actions.DASHBOARD_APP_INSTALLTION,
  }),
};

export default actions;
