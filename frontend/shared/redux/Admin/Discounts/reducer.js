import actions from './action';

const initState = {
  loanSettingFees: [],
  DiscountsList: [],
  Counpon: {},
  promoCode: [],
};

export default function feesLoanSettingReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_DISCOUNT_SUCCESS:
      return {
        ...state,
        DiscountsList: action.list,
      };

    case actions.VIEW_COUPONS_SUCCESS:
      return {
        ...state,
        Counpon: action.list,
      };

    case actions.VIEW_PROMO_CODE_SUCCESS:
      return {
        ...state,
        promoCode: action.list,
      };
    case actions.DELETE_DISCOUNT_CODE_SUCCESS:
      return {
        ...state,
        DiscountsList: state.DiscountsList.filter(
          (item) => item.id !== Number(action.id)
        ),
      };

    default:
      return state;
  }
}
