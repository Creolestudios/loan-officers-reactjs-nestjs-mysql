import actions from './action';

const initState = {
  activityUserList: [],
  pageCount: 1,
  pagecountforUserCalculation: 1,
  activityUserDetailes: {},
  activityUserCalculationList: [],
  pageCalculationCount: 1,
  activityUserDocumentList: [],
  pageUserDocumentCount: 1,
  activityUserName: null,
  activityUserCalculationDetail: {},
  activityAllUserList: [],
  Chat_ID: null,
  Chat_Docs_URL: '',
};

export default function callbackRequestReducer(state = initState, action) {
  switch (action.type) {
    case actions.ACTIVITY_USERS_SUCCESS:
      return {
        ...state,
        activityUserList: action.list,
        pageCount: action.pageCount,
        Chat_ID: null,
      };
    case actions.ACTIVITY_USERS_ERROR:
      return {
        ...state,
        activityUserList: [...state.activityUserList],
      };
    case actions.ACTIVITY_USERS_EXPORT_SUCCESS:
      return {
        ...state,
        activityAllUserList: action.list,
        pageCount: action.pageCount,
        Chat_ID: null,
      };
    case actions.ACTIVITY_USERS_URL_EMPTY:
      return {
        ...state,
        Chat_Docs_URL: '',
      };
    case actions.ACTIVITY_USERS_DETAILES_SUCCESS:
      return {
        ...state,
        activityUserDetailes: action.list,
        pagecountforUserCalculation: action.pagecountforUserCalculation,
      };
    case actions.ACTIVITY_USERS_CREATE_CHAT_ID_SUCCESS:
      return {
        ...state,
        Chat_ID: action.ChatID,
      };
    case actions.ACTIVITY_USERS_UPLOAD_CHAT_DOCS_SUCCESS:
      return {
        ...state,
        Chat_Docs_URL: action.ChatDocs_URL,
      };

    case actions.ACTIVITY_USERS_DETAILES_ERROR:
      return {
        ...state,
        activityUserDetailes: { ...state.activityUserDetailes },
      };
    case actions.ACTIVITY_USERS_CALCULATIONS_SUCCESS:
      return {
        ...state,
        activityUserCalculationList: action.list,
        pageCalculationCount: action.pageCount,
        activityUserName: action.name,
      };
    case actions.ACTIVITY_USERS_CALCULATIONS_ERROR:
      return {
        ...state,
        activityUserCalculationList: [...state.activityUserCalculationList],
      };
    case actions.ACTIVITY_USER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        activityUserDocumentList: action.list,
        pageUserDocumentCount: action.pageCount,
        activityUserName: action.name,
      };
    case actions.ACTIVITY_USER_DOCUMENTS_ERROR:
      return {
        ...state,
        activityUserDocumentList: [...state.activityUserDocumentList],
      };
    case actions.ACTIVITY_USER_CAL_DETAIL_SUCCESS:
      return {
        ...state,
        activityUserCalculationDetail: action.data,
      };
    case actions.ACTIVITY_USER_CAL_DETAIL_ERROR:
      return {
        ...state,
        activityUserCalculationDetail: {
          ...state.activityUserCalculationDetail,
        },
      };
    default:
      return state;
  }
}
