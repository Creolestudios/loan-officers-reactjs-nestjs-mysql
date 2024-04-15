import actions from './action';

const initState = {
  BrandedAppList: [],
  BrandedAppClientsList: [],
  BrandedAppEmployeesList: [],
  BrandedAppUserById: {},
  BrandedAppInfoDetail: {},
  pageCount: 1,
  pageDetailes: {},
};

export default function AdminBrandedAppReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_BRANDED_APP_SUCCESS:
      return {
        ...state,
        BrandedAppList: action.list,
        pageCount: action.pageCount,
      };
    case actions.GET_BRANDED_APP_ERROR:
      return {
        ...state,
        BrandedAppList: [...state.BrandedAppList],
      };
    case actions.GET_BRANDED_APP_CLIENTS_SUCCESS:
      return {
        ...state,
        BrandedAppClientsList: action.list,
        pageCount: action.pageCount,
      };
    case actions.GET_BRANDED_APP_CLIENTS_ERROR:
      return {
        ...state,
        BrandedAppClientsList: [...state.BrandedAppClientsList],
      };
    case actions.GET_BRANDED_APP_EMPLOYEES_SUCCESS:
      return {
        ...state,
        BrandedAppEmployeesList: action.list,
        pageCount: action.pageCount,
      };
    case actions.GET_BRANDED_APP_EMPLOYEES_ERROR:
      return {
        ...state,
        BrandedAppEmployeesList: [...state.BrandedAppEmployeesList],
      };
    case actions.GET_BRANDED_APP_BY_ID_SUCCESS:
      return {
        ...state,
        BrandedAppUserById: action.list,
      };
    case actions.GET_BRANDED_APP_INFO_SUCCESS:
      return {
        ...state,
        BrandedAppInfoDetail: action.list,
      };
    case actions.BRANDED_APP_PAGE_DETAILES:
      return {
        ...state,
        pageDetailes: action.payload,
      };

    default:
      return state;
  }
}
