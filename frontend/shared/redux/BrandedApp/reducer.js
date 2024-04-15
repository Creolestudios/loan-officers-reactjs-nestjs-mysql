import actions from './action';

const initState = {
  BrandedAppBillingHistory: [],
  BrandedAppUser: [],
  adminApproved: false,
  BrandedAppSubscription: {},
  BillingDetailes: {},
  BrandedAppInfoDetails: {},
  PlayStore_Status: '--',
  Branded_user_ID: null,
};

export default function BrandedAppReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_BRANDED_APP_BILLING_HISTORY_SUCCESS:
      return {
        ...state,
        BrandedAppBillingHistory: action.list,
      };
    case actions.GET_APPROVED_BRANDED_APP_SUCCESS:
      return {
        ...state,
        adminApproved: true,
      };

    case actions.GET_APPROVED_BRANDED_APP_INFO_SUCCESS:
      return {
        ...state,
        BrandedAppInfoDetails: action.list,
      };

    case actions.GET_PLAYSTORE_STATUS_SUCCESS:
      return {
        ...state,
        PlayStore_Status: action.play_store_status,
      };

    case actions.GET_APPROVED_BRANDED_APP_ERROR:
      return {
        ...state,
        adminApproved: false,
      };

    case actions.GET_BRANDED_APP_BILLING_HISTORY_ERROR:
      return {
        ...state,
        BrandedAppBillingHistory: [...state.BrandedAppBillingHistory],
        pageCount: action.pageCount,
      };
    case actions.GET_BRANDED_APP_USER_SUCCESS:
      return {
        ...state,
        BrandedAppUser: action.list,
      };

    case actions.CANCEL_SUBSCRIPTIO_BRANDED_APP_SUCCESS:
      return {
        ...state,
        BrandedAppSubscription: {},
      };

    case actions.DELETE_LO_BRANDED_APP_SUCCESS:
      return {
        ...state,
        BrandedAppUser: state.BrandedAppUser.filter(
          (item) => item.id !== action.id
        ),
      };

    case actions.APPLY_BRANDED_APP_SUCCESS:
      return {
        ...state,
        adminApproved: action.adminApproved,
      };

    case actions.GET_SUBSCRIPTIO_BRANDED_APP_SUCCESS:
      return {
        ...state,
        BrandedAppSubscription: action.list,
        Branded_user_ID: action.b_id,
      };

    case actions.GET_SUBSCRIPTIO_BRANDED_APP_ERROR:
      return {
        ...state,
        BrandedAppSubscription: {},
        Branded_user_ID: null,
      };

    case actions.GET_BILLING_DETAIL_SUCCESS:
      return {
        ...state,
        BillingDetailes: action.list,
      };

    default:
      return state;
  }
}
