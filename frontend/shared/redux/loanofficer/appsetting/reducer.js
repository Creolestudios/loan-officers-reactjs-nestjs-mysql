import actions from './actions';

const initState = {
  appSettingsDashboardMenuList: [],
  appSettingsDashboardMenuCurrentLinks: [],
  appSettingsAppMenuList: [],
  appSettingsAppMenuCurrentLinks: [],
  appSettingsMortgageGuideList: [],
  appSettingsDashboardCompanyList: [],
  appSettingsAppCompanyList: [],
  coBrandCustomLinks: [],
};

export default function appSettingReducer(state = initState, action) {
  switch (action.type) {
    case actions.APP_SETTING_DASHBOARD_MENU:
      return {
        ...state,
        appSettingsDashboardMenuList: [...state.appSettingsDashboardMenuList],
        appSettingsDashboardMenuCurrentLinks: [
          ...state.appSettingsDashboardMenuCurrentLinks,
        ],
      };
    case actions.APP_SETTING_DASHBOARD_MENU_SUCCESS:
      return {
        ...state,
        appSettingsDashboardMenuList: action.list,
        appSettingsDashboardMenuCurrentLinks: action.currentLinks,
        appSettingsDashboardCompanyList: action.company_list,
      };
    /* CO-BRAND  */
    case actions.CO_BRAND_CUSTOM_LINKS:
      return {
        ...state,
        coBrandCustomLinks: [...state.coBrandCustomLinks],
      };
    case actions.CO_BRAND_CUSTOM_LINKS_SUCCESS:
      return {
        ...state,
        coBrandCustomLinks: action.list,
      };
    /* END  */
    case actions.APP_SETTING_MORTGAGE_GUIDE_SUCCESS:
      return {
        ...state,
        appSettingsMortgageGuideList: action.list,
      };
    case actions.APP_SETTING_MORTGAGE_GUIDE_ERROR:
      return {
        ...state,
        appSettingsMortgageGuideList: [...state.appSettingsMortgageGuideList],
      };

    case actions.CHANGE_APP_SETTING_MORTGAGE_GUIDE_SUCCESS:
      return {
        ...state,
        appSettingsMortgageGuideList: action.list,
      };
    case actions.CHANGE_APP_SETTING_MORTGAGE_GUIDE_ERROR:
      return {
        ...state,
        appSettingsMortgageGuideList: [...state.appSettingsMortgageGuideList],
      };

    case actions.DELETE_APP_SETTING_DASHBOARD_MENU_SUCCESS:
      return {
        ...state,
        appSettingsDashboardMenuList: state.appSettingsDashboardMenuList.filter(
          (item) => item.id !== action.del_id
        ),
        appSettingsDashboardCompanyList: state?.appSettingsDashboardCompanyList?.filter(
          (item) => item.id !== action.del_id
        ),
        appSettingsDashboardMenuCurrentLinks: state.appSettingsDashboardMenuCurrentLinks.filter(
          (item) => item.id !== action.del_id
        ),
      };

    case actions.DELETE_APP_SETTING_APP_MENU_SUCCESS:
      return {
        ...state,
        appSettingsAppMenuList: state.appSettingsAppMenuList.filter(
          (item) => item.id !== action.del_id
        ),
        appSettingsAppCompanyList: state?.appSettingsAppCompanyList?.filter(
          (item) => item.id !== action.del_id
        ),
        appSettingsAppMenuCurrentLinks: state.appSettingsAppMenuCurrentLinks.filter(
          (item) => item.id !== action.del_id
        ),
      };

    case actions.APP_SETTING_DASHBOARD_MENU_ERROR:
      return {
        ...state,
        appSettingsDashboardMenuList: [...state.appSettingsDashboardMenuList],
        appSettingsDashboardMenuCurrentLinks: [
          ...state.appSettingsDashboardMenuCurrentLinks,
        ],
      };
    case actions.SAVE_APP_SETTING_DASHBOARD_MENU_SUCCESS:
      return {
        ...state,
        appSettingsDashboardMenuList: action.list,
        appSettingsDashboardCompanyList: action.company_list,
      };
    case actions.ADD_CUSTOM_LINK_DASHBOARD_SUCCESS:
      return {
        ...state,
        appSettingsDashboardMenuCurrentLinks: action.currentLinks,
      };
    case actions.ADD_CUSTOM_LINK_DASHBOARD_ERROR:
      return {
        ...state,
        appSettingsDashboardMenuList: [...state.appSettingsDashboardMenuList],
        appSettingsDashboardMenuCurrentLinks: [
          ...state.appSettingsDashboardMenuCurrentLinks,
        ],
      };
    case actions.ADD_CUSTOM_LINK_APP_SUCCESS:
      return {
        ...state,
        appSettingsAppMenuCurrentLinks: action.currentLinks,
      };
    case actions.ADD_CUSTOM_LINK_APP_ERROR:
      return {
        ...state,
        appSettingsAppMenuList: [...state.appSettingsAppMenuList],
        appSettingsAppMenuCurrentLinks: [
          ...state.appSettingsAppMenuCurrentLinks,
        ],
      };
    case actions.APP_SETTING_MENU:
      return {
        ...state,
        appSettingsAppMenuList: [...state.appSettingsAppMenuList],
        appSettingsAppMenuCurrentLinks: [
          ...state.appSettingsAppMenuCurrentLinks,
        ],
      };
    case actions.APP_SETTING_MENU_SUCCESS:
      return {
        ...state,
        appSettingsAppMenuList: action.list,
        appSettingsAppCompanyList: action.company_list,
        appSettingsAppMenuCurrentLinks: action.currentLinks,
      };
    case actions.APP_SETTING_MENU_ERROR:
      return {
        ...state,
        appSettingsAppMenuList: [...state.appSettingsAppMenuList],
        appSettingsAppMenuCurrentLinks: [
          ...state.appSettingsAppMenuCurrentLinks,
        ],
      };
    case actions.SAVE_APP_SETTING_MENU_SUCCESS:
      return {
        ...state,
        appSettingsAppMenuList: action.list,
        appSettingsAppCompanyList: action.company_list,
      };
    default:
      return state;
  }
}
