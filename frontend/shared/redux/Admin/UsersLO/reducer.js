import actions from './action';

const initState = {
  pageCount: 1,
  UserLODetailes: {},
  defaultData: [],
  UsersLOList: [],
  pageDetailes: {},
};

export default function UsersLOReducer(state = initState, action) {
  switch (action.type) {
    case actions.USERS_LO_DETAILS_SUCCESS:
      return {
        ...state,
        UserLODetailes: action.list,
      };
    case actions.GET_DEFAULT_DATA_SUCCESS:
      return {
        ...state,
        defaultData: action.list,
      };

    case actions.USERS_LO_PAGE_DETAILES:
      return {
        ...state,
        pageDetailes: action.payload,
      };

    case actions.GET_USERS_LO_SUCCESS:
      return {
        ...state,
        UsersLOList: action.list,
        pageCount: action.pageCount,
        UserLODetailes: {},
      };
    case actions.GET_USERS_LO_ERROR:
      return {
        ...state,
        UsersLOList: [...state.UsersLOList],
        UserLODetailes: {},
      };
    default:
      return state;
  }
}
