import actions from './action';

const initState = {
  SubscriptionPlanList: [],
  SubscriptionPlan: {},
};

export default function learningCenterReducer(state = initState, action) {
  switch (action.type) {
    case actions.ADMIN_SUBSCRIPTION_PLAN_SUCCESS:
      return {
        ...state,
        SubscriptionPlanList: action.list,
      };

    case actions.ADMIN_SUBSCRIPTION_PLAN_ERROR:
      return {
        ...state,
        SubscriptionPlanList: [...state.SubscriptionPlanList],
      };

    case actions.VIEW_ADMIN_SUBSCRIPTION_PLAN_SUCCESS:
      return {
        ...state,
        SubscriptionPlan: action.list,
      };

    default:
      return state;
  }
}
