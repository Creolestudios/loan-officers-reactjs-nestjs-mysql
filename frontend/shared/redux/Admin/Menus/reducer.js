import actions from './action';

const initState = {
  appSettingsDashboardMenuList: [],
  appSettingsDashboardMenuCurrentLinks: [],
  appSettingsAppMenuList: [],
  appSettingsAppMenuCurrentLinks: [],
  appSettingsMortgageGuideList: [],
  appSettingsDashboardCompanyList: [],
  appSettingsAppCompanyList: [],
};

export default function appDefaultMenuReducer(state = initState, action) {
  switch (action.type) {
    case actions.APP_DEF_DASHBOARD_MENU_ADMIN:
      return {
        ...state,
        appSettingsDashboardMenuList: [...state.appSettingsDashboardMenuList],
        appSettingsDashboardMenuCurrentLinks: [
          ...state.appSettingsDashboardMenuCurrentLinks,
        ],
      };
    case actions.APP_DEF_DASHBOARD_MENU_ADMIN_SUCCESS:
      return {
        ...state,
        appSettingsDashboardMenuList: action.list,
        appSettingsDashboardMenuCurrentLinks: action.currentLinks,
        appSettingsDashboardCompanyList: action.company_list,
      };

    case actions.APP_DEF_MORTGAGE_GUIDE_ADMIN_SUCCESS:
      return {
        ...state,
        appSettingsMortgageGuideList: action.list,
      };
    case actions.APP_DEF_MORTGAGE_GUIDE_ADMIN_ERROR:
      return {
        ...state,
        appSettingsMortgageGuideList: [...state.appSettingsMortgageGuideList],
      };

    case actions.CHANGE_APP_DEF_MORTGAGE_GUIDE_ADMIN_SUCCESS:
      return {
        ...state,
        appSettingsMortgageGuideList: action.list,
      };
    case actions.CHANGE_APP_DEF_MORTGAGE_GUIDE_ADMIN_ERROR:
      return {
        ...state,
        appSettingsMortgageGuideList: [...state.appSettingsMortgageGuideList],
      };

    case actions.DELETE_APP_DEF_DASHBOARD_MENU_ADMIN_SUCCESS:
      return {
        ...state,
        appSettingsDashboardMenuList: state.appSettingsDashboardMenuList.filter(
          (item) => item.id !== action.del_id
        ),
        appSettingsDashboardMenuCurrentLinks: state.appSettingsDashboardMenuCurrentLinks.filter(
          (item) => item.id !== action.del_id
        ),
        appSettingsDashboardCompanyList: state?.appSettingsDashboardCompanyList?.filter(
          (item) => item.id !== action.del_id
        ),
      };

    case actions.DELETE_APP_DEF_APP_MENU_ADMIN_SUCCESS:
      return {
        ...state,
        appSettingsAppMenuList: state.appSettingsAppMenuList.filter(
          (item) => item.id !== action.del_id
        ),
        appSettingsAppMenuCurrentLinks: state.appSettingsAppMenuCurrentLinks.filter(
          (item) => item.id !== action.del_id
        ),
        appSettingsAppCompanyList: state?.appSettingsAppCompanyList?.filter(
          (item) => item.id !== action.del_id
        ),
      };

    case actions.APP_DEF_DASHBOARD_MENU_ADMIN_ERROR:
      return {
        ...state,
        appSettingsDashboardMenuList: [...state.appSettingsDashboardMenuList],
        appSettingsDashboardMenuCurrentLinks: [
          ...state.appSettingsDashboardMenuCurrentLinks,
        ],
      };
    case actions.SAVE_APP_DEF_DASHBOARD_MENU_ADMIN_SUCCESS:
      return {
        ...state,
        appSettingsDashboardMenuList: action.list,
        appSettingsDashboardCompanyList: action.company_list,
      };
    case actions.ADD_CUSTOM_LINK_DASHBOARD_ADMIN_SUCCESS:
      return {
        ...state,
        appSettingsDashboardMenuList: action.list,
        appSettingsDashboardMenuCurrentLinks: action.currentLinks,
      };
    case actions.ADD_CUSTOM_LINK_DASHBOARD_ADMIN_ERROR:
      return {
        ...state,
        appSettingsDashboardMenuList: [...state.appSettingsDashboardMenuList],
        appSettingsDashboardMenuCurrentLinks: [
          ...state.appSettingsDashboardMenuCurrentLinks,
        ],
      };
    case actions.ADD_CUSTOM_LINK_APP_ADMIN_SUCCESS:
      return {
        ...state,
        appSettingsAppMenuList: action.list,
        appSettingsAppMenuCurrentLinks: action.currentLinks,
      };
    case actions.ADD_CUSTOM_LINK_APP_ADMIN_ERROR:
      return {
        ...state,
        appSettingsAppMenuList: [...state.appSettingsAppMenuList],
        appSettingsAppMenuCurrentLinks: [
          ...state.appSettingsAppMenuCurrentLinks,
        ],
      };
    case actions.APP_DEF_MENU_ADMIN:
      return {
        ...state,
        appSettingsAppMenuList: [...state.appSettingsAppMenuList],
        appSettingsAppMenuCurrentLinks: [
          ...state.appSettingsAppMenuCurrentLinks,
        ],
      };
    case actions.APP_DEF_MENU_ADMIN_SUCCESS:
      return {
        ...state,
        appSettingsAppMenuList: action.list,
        appSettingsAppMenuCurrentLinks: action.currentLinks,
        appSettingsAppCompanyList: action.company_list,
      };
    case actions.APP_DEF_MENU_ADMIN_ERROR:
      return {
        ...state,
        appSettingsAppMenuList: [...state.appSettingsAppMenuList],
        appSettingsAppMenuCurrentLinks: [
          ...state.appSettingsAppMenuCurrentLinks,
        ],
      };
    case actions.SAVE_APP_DEF_MENU_ADMIN_SUCCESS:
      return {
        ...state,
        appSettingsAppMenuList: action.list,
        appSettingsAppCompanyList: action.company_list,
      };
    default:
      return state;
  }
}
