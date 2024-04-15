import actions from './action';

const initState = {
  CoBrandingDataList: [],
  pageCount: 1,
  total: 0,
  ErrorForRederect: '',
  CoBrandingOfficerData: {},
};

export default function CoBrandReducer(state = initState, action) {
  switch (action.type) {
    case actions.LO_CO_BRANDING_SUCCESS:
      return {
        ...state,
        CoBrandingDataList: action.list,
        pageCount: action.pageCount,
        total: action.total,
        CoBrandingOfficerData: {},
      };
    case actions.LO_CO_BRANDING_ERROR:
      return {
        ...state,
        CoBrandingDataList: [...state.CoBrandingDataList],
      };
    case actions.ADD_LO_CO_BRANDING_SUCCESS:
      return {
        ...state,
        ErrorForRederect: action.errorS,
      };
    case actions.ADD_LO_CO_BRANDING_ERROR:
      return {
        ...state,
        ErrorForRederect: action.errorS,
      };
    case actions.LO_CO_BRANDING_BY_ID_SUCCESS:
      return {
        ...state,
        CoBrandingOfficerData: action.list,
      };

    default:
      return state;
  }
}
