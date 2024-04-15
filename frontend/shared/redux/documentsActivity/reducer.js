import actions from './action';

const initState = {
  activityDocumentsList: [],
  pageCount: 1,
};

export default function callbackRequestReducer(state = initState, action) {
  switch (action.type) {
    case actions.ACTIVITY_DOCUMENTS_SUCCESS:
      return {
        ...state,
        activityDocumentsList: action.list,
        pageCount: action.pageCount,
      };
    case actions.ACTIVITY_DOCUMENTS_ERROR:
      return {
        ...state,
        activityDocumentsList: [...state.activityDocumentsList],
      };
    default:
      return state;
  }
}
