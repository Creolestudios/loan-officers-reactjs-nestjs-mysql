import actions from './action';

const initState = {
  activityCallbackRequestList: [],
  pageCount: 1,
};

export default function callbackRequestReducer(state = initState, action) {
  switch (action.type) {
    case actions.ACTIVITY_CALLBACK_REQUEST_SUCCESS:
      return {
        ...state,
        activityCallbackRequestList: action.list,
        pageCount: action.pageCount,
      };
    case actions.ACTIVITY_CALLBACK_REQUEST_ERROR:
      return {
        ...state,
        activityCallbackRequestList: [],
      };
    default:
      return state;
  }
}
