import actions from './action';

const initState = {
  LOBillingHistory: [],
  pageCount: 1,
};

export default function BillingHistoryReducer(state = initState, action) {
  switch (action.type) {
    case actions.LO_BILLING_HISTORY_SUCCESS:
      return {
        ...state,
        LOBillingHistory: action.list,
        pageCount: action.pageCount,
      };

    default:
      return state;
  }
}
