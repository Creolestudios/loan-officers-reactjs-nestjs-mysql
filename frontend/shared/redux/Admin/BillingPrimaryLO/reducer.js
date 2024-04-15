import actions from './action';

const initState = {
  BillingPrimaryLOUserList: [],
  BillingTransactionList: [],
  pageCount: 1,
  primaryLOUserDetailes: {},
  activityUserName: null,
  activityAllUserList: [],
  pageDetailes: {},
  pageDetailesForEmployee: {},
};

export default function BillingPrimaryLOReducer(state = initState, action) {
  switch (action.type) {
    case actions.BILLING_LO_USERS_SUCCESS:
      return {
        ...state,
        BillingPrimaryLOUserList: action.list,
        primaryLOUserDetailes: {},
        pageCount: action.pageCount,
      };
    case actions.BILLING_LO_USERS_ERROR:
      return {
        ...state,
        BillingPrimaryLOUserList: [...state.BillingPrimaryLOUserList],
      };

    case actions.BILLING_LO_USERS_PAGE_DETAILES:
      return {
        ...state,
        pageDetailes: action.payload,
      };

    case actions.BILLING_EMPLOYEE_PAGE_DETAILES:
      return {
        ...state,
        pageDetailesForEmployee: action.payload,
      };

    case actions.BILLING_LO_USERS_DETAILS_SUCCESS:
      return {
        ...state,
        primaryLOUserDetailes: action.list,
      };

    case actions.BILLING_USERS_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        BillingTransactionList: action.list,
        pageCount: action.pageCount,
      };
    case actions.BILLING_USERS_TRANSACTIONS_ERROR:
      return {
        ...state,
        BillingTransactionList: [...state.BillingTransactionList],
      };

    case actions.BILLING_LO_USER_DELETE_NOTE_SUCCESS:
      return {
        ...state,
        primaryLOUserDetailes: {
          ...state.primaryLOUserDetailes,
          Notes: state.primaryLOUserDetailes.Notes.filter(
            (i) => i.id != action.id
          ),
        },
      };

    case actions.BILLING_LO_USER_DELETE_CREDITS_SUCCESS:
      return {
        ...state,
        primaryLOUserDetailes: {
          ...state.primaryLOUserDetailes,
          Credits: state.primaryLOUserDetailes.Credits.filter(
            (i) => i.id != action.id
          ),
        },
      };

    default:
      return state;
  }
}
