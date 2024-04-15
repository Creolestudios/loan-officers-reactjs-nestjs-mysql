import actions from './action';

const initState = {
  DashboardDataList: [],
};

export default function dashboardReducer(state = initState, action) {
  switch (action.type) {
    case actions.DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        DashboardDataList: action.list,
      };
    case actions.DASHBOARD_DATA_ERROR:
      return {
        ...state,
        DashboardDataList: [...state.DashboardDataList],
      };
    default:
      return state;
  }
}
