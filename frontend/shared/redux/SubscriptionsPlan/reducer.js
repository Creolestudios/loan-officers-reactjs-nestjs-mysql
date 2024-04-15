import actions from './action';

const initState = {
  LOSubscription: {},
  LOSubscriptionPlans: [],
  LOSupportFaqs: [],
  LOSupportGuides: [],
  BrandedAppApplyStatus: false,
  customer_ID: '',
  status: false,
  SubscriptionApplyPromoCodeList: [],
};

export default function BillingHistoryReducer(state = initState, action) {
  switch (action.type) {
    case actions.LO_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        LOSubscription: action.list ? action.list : {},
        status: true,
        BrandedAppApplyStatus: action.BApp,
      };

    case actions.LO_SUBSCRIPTION_ERROR:
      return {
        ...state,
        LOSubscription: action.list,
        status: action.status,
      };
    case actions.GET_SUBSCRIPTION_APPLY_PROMO_CODE_SUCCESS:
      return {
        ...state,
        SubscriptionApplyPromoCodeList: action.list,
      };

    case actions.LO_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        customer_ID: action.Customer_ID,
      };

    case actions.CANCEL_LO_SUBSCRIPTION_ERROR:
      return {
        ...state,
        LOSubscription: {},
        status: false,
      };

    case actions.LO_ALL_PLAN_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        LOSubscriptionPlans: action.list,
        status: true,
      };

    case actions.LO_ALL_PLAN_SUBSCRIPTION_ERROR:
      return {
        ...state,
        LOSubscriptionPlans: [...state.LOSubscriptionPlans],
        status: action.status,
      };

    case actions.LO_SUPPORT_FAQS_SUCCESS:
      return {
        ...state,
        LOSupportFaqs: action.list,
      };

    case actions.LO_SUPPORT_FAQS_ERROR:
      return {
        ...state,
        LOSupportFaqs: [...state.LOSupportFaqs],
      };

    case actions.LO_SUPPORT_GUIDE_SUCCESS:
      return {
        ...state,
        LOSupportGuides: action.list,
      };

    default:
      return state;
  }
}
