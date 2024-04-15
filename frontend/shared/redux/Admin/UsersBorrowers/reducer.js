import actions from './action';

const initState = {
  UsersBorrowersList: [],
  pageCount: 1,
  UserBorrowerDetailes: {},
  activityUserName: null,
  activityAllUserList: [],
  pageDetailes: {},
};

export default function UsersBorrowerReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_USERS_BORROWER_SUCCESS:
      return {
        ...state,
        UsersBorrowersList: action.list,
        pageCount: action.pageCount,
      };
    case actions.GET_USERS_BORROWER_ERROR:
      return {
        ...state,
        UsersBorrowersList: [...state.UsersBorrowersList],
      };
    case actions.ADMIN_ACTIVITY_USERS_DETAILES:
      return {
        ...state,
        UserBorrowerDetailes: {},
      };

    case actions.USERS_BORROWER_PAGE_DETAILES:
      return {
        ...state,
        pageDetailes: action.payload,
      };

    case actions.ADMIN_ACTIVITY_USERS_DETAILES_SUCCESS:
      return {
        ...state,
        UserBorrowerDetailes: action.payload,
      };
    case actions.ADMIN_ACTIVITY_USERS_DETAILES_ERROR:
      return {
        ...state,
        UserBorrowerDetailes: { ...state.UserBorrowerDetailes },
      };

    default:
      return state;
  }
}
