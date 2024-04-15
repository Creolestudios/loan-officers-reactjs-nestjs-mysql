import actions from './action';

const initState = {
  DashboardTotalUsers: [],
  DashboardNewAccounts: [],
  DashboardRecentActivity: [],
  DashboardAppInstalltion: {},
};

export default function dashboardReducer(state = initState, action) {
  switch (action.type) {
    case actions.DASHBOARD_TOTAL_USER_SUCCESS:
      return {
        ...state,
        DashboardTotalUsers: action.list,
      };
    case actions.DASHBOARD_NEW_ACCOUNTS_SUCCESS:
      return {
        ...state,
        DashboardNewAccounts: action.list,
      };
    case actions.DASHBOARD_RECENT_ACTIVITY_SUCCESS:
      return {
        ...state,
        DashboardRecentActivity: action.list,
      };
    case actions.DASHBOARD_APP_INSTALLTION_SUCCESS:
      return {
        ...state,
        DashboardAppInstalltion: action.list,
      };
    default:
      return state;
  }
}
