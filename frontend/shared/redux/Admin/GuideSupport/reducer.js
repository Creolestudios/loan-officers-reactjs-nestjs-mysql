import actions from './action';

const initState = {
  SupprtGuideList: {},
  SupportGuideCategory: [],
  SupportFaqs: [],
  SupportRepsList: [],
};

export default function adminSupportGuideReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_ADMIN_SUPPORT_GUIDE_SUCCESS:
      return {
        ...state,
        SupprtGuideList: action.list,
      };

    case actions.GET_ADMIN_SUPPORT_GUIDE_CATEGORY_SUCCESS:
      return {
        ...state,
        SupportGuideCategory: action.list,
      };
    case actions.GET_ADMIN_SUPPORT_FAQS_SUCCESS:
      return {
        ...state,
        SupportFaqs: action.list,
      };
    case actions.GET_ADMIN_SUPPORT_REPS_SUCCESS:
      return {
        ...state,
        SupportRepsList: action.list,
      };

    default:
      return state;
  }
}
