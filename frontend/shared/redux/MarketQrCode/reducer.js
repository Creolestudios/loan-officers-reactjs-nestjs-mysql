import actions from './action';

const initState = {
  marketQRCodeData: [],
};

export default function marketQRCodeReducer(state = initState, action) {
  switch (action.type) {
    case actions.MARKETING_QRCODE_SUCCESS:
      return {
        ...state,
        marketQRCodeData: action.list,
      };

    case actions.MARKETING_QRCODE_ERROR:
      return {
        ...state,
        marketQRCodeData: [...state.marketQRCodeData],
      };

    default:
      return state;
  }
}
