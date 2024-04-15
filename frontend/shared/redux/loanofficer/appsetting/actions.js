const actions = {
  APP_SETTING_DASHBOARD_MENU: 'APP_SETTING_DASHBOARD_MENU',
  APP_SETTING_DASHBOARD_MENU_SUCCESS: 'APP_SETTING_DASHBOARD_MENU_SUCCESS',
  APP_SETTING_DASHBOARD_MENU_ERROR: 'APP_SETTING_DASHBOARD_MENU_ERROR',
  CO_BRAND_CUSTOM_LINKS: 'CO_BRAND_CUSTOM_LINKS',
  CO_BRAND_CUSTOM_LINKS_SUCCESS: 'CO_BRAND_CUSTOM_LINKS_SUCCESS',
  APP_SETTING_MENU: 'APP_SETTING_MENU',
  APP_SETTING_MENU_SUCCESS: 'APP_SETTING_MENU_SUCCESS',
  APP_SETTING_MENU_ERROR: 'APP_SETTING_MENU_ERROR',
  ADD_CUSTOM_LINK_DASHBOARD: 'ADD_CUSTOM_LINK_DASHBOARD',
  ADD_CUSTOM_LINK_DASHBOARD_SUCCESS: 'ADD_CUSTOM_LINK_DASHBOARD_SUCCESS',
  ADD_CUSTOM_LINK_DASHBOARD_ERROR: 'ADD_CUSTOM_LINK_DASHBOARD_ERROR',
  ADD_CUSTOM_LINK_APP: 'ADD_CUSTOM_LINK_APP',
  ADD_CUSTOM_LINK_APP_SUCCESS: 'ADD_CUSTOM_LINK_APP_SUCCESS',
  ADD_CUSTOM_LINK_APP_ERROR: 'ADD_CUSTOM_LINK_APP_ERROR',
  ADD_CUSTOM_LINK_CO_BRAND_OFFICER: 'ADD_CUSTOM_LINK_CO_BRAND_OFFICER',
  ADD_CUSTOM_LINK_CO_BRAND_OFFICER_SUCCESS:
    'ADD_CUSTOM_LINK_CO_BRAND_OFFICER_SUCCESS',
  ADD_CUSTOM_LINK_CO_BRAND_OFFICER_ERROR:
    'ADD_CUSTOM_LINK_CO_BRAND_OFFICER_ERROR',
  SAVE_APP_SETTING_DASHBOARD_MENU: 'SAVE_APP_SETTING_DASHBOARD_MENU',
  SAVE_APP_SETTING_DASHBOARD_MENU_SUCCESS:
    'SAVE_APP_SETTING_DASHBOARD_MENU_SUCCESS',
  SAVE_APP_SETTING_DASHBOARD_MENU_ERROR:
    'SAVE_APP_SETTING_DASHBOARD_MENU_ERROR',
  SAVE_APP_SETTING_MENU: 'SAVE_APP_SETTING_MENU',
  SAVE_APP_SETTING_MENU_SUCCESS: 'SAVE_APP_SETTING_MENU_SUCCESS',
  SAVE_APP_SETTING_MENU_ERROR: 'SAVE_APP_SETTING_MENU_ERROR',

  APP_SETTING_MORTGAGE_GUIDE: 'APP_SETTING_MORTGAGE_GUIDE',
  APP_SETTING_MORTGAGE_GUIDE_SUCCESS: 'APP_SETTING_MORTGAGE_GUIDE_SUCCESS',
  APP_SETTING_MORTGAGE_GUIDE_ERROR: 'APP_SETTING_MORTGAGE_GUIDE_ERROR',

  CHANGE_APP_SETTING_MORTGAGE_GUIDE: 'CHANGE_APP_SETTING_MORTGAGE_GUIDE',
  CHANGE_APP_SETTING_MORTGAGE_GUIDE_SUCCESS:
    'CHANGE_APP_SETTING_MORTGAGE_GUIDE_SUCCESS',
  CHANGE_APP_SETTING_MORTGAGE_GUIDE_ERROR:
    'CHANGE_APP_SETTING_MORTGAGE_GUIDE_ERROR',

  DELETE_APP_SETTING_MENU: 'DELETE_APP_SETTING_MENU',
  DELETE_APP_SETTING_APP_MENU_SUCCESS: 'DELETE_APP_SETTING_APP_MENU_SUCCESS',
  DELETE_APP_SETTING_DASHBOARD_MENU_SUCCESS:
    'DELETE_APP_SETTING_DASHBOARD_MENU_SUCCESS',
  DELETE_CUSTOM_LINK_CO_BRAND_OFFICER: 'DELETE_CUSTOM_LINK_CO_BRAND_OFFICER',

  coBrandCustomLinksList: (payload) => ({
    type: actions.CO_BRAND_CUSTOM_LINKS,
    payload,
  }),
  appDashboardMenuList: () => ({
    type: actions.APP_SETTING_DASHBOARD_MENU,
  }),
  appMortgageGuide: () => ({
    type: actions.APP_SETTING_MORTGAGE_GUIDE,
  }),
  deleteCoBrandCustomLink: (payload, id) => ({
    type: actions.DELETE_CUSTOM_LINK_CO_BRAND_OFFICER,
    payload,
    id,
  }),
  deleteAppSettingMenu: (payload) => ({
    type: actions.DELETE_APP_SETTING_MENU,
    payload,
  }),
  addCustomLinkForCoBrandOfficer: (payload, id) => ({
    type: actions.ADD_CUSTOM_LINK_CO_BRAND_OFFICER,
    payload,
    id,
  }),
  appMenuList: () => ({
    type: actions.APP_SETTING_MENU,
  }),
  addCustomLinkDashboard: (payload) => ({
    type: actions.ADD_CUSTOM_LINK_DASHBOARD,
    payload,
  }),
  addCustomLinkApp: (payload) => ({
    type: actions.ADD_CUSTOM_LINK_APP,
    payload,
  }),
  appDashboardMenuSave: (payload) => ({
    type: actions.SAVE_APP_SETTING_DASHBOARD_MENU,
    payload,
  }),
  appMortgageGuideChange: (payload) => ({
    type: actions.CHANGE_APP_SETTING_MORTGAGE_GUIDE,
    payload,
  }),
  appMenuSave: (payload) => ({
    type: actions.SAVE_APP_SETTING_MENU,
    payload,
  }),
};
export default actions;
