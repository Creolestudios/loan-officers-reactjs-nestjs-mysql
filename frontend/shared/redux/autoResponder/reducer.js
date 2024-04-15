import actions from './action';

const initState = {
  marketingAutoResponder: {},
  //   isDefaultDataEmpty: false,
};

export default function autoResponderReducer(state = initState, action) {
  switch (action.type) {
    case actions.MARKETING_AUTO_RESPONDER_SUCCESS:
      return {
        ...state,
        marketingAutoResponder: action.data,
      };

    case actions.MARKETING_AUTO_RESPONDER_ERROR:
      return {
        ...state,
        marketingAutoResponder: { ...state.marketingAutoResponder },
      };

    case actions.UPDATE_MARKETING_AUTO_RESPONDER_SUCCESS:
      return {
        ...state,
        marketingAutoResponder: action.data,
      };
    case actions.UPDATE_MARKETING_AUTO_RESPONDER_ERROR:
      return {
        ...state,
        marketingAutoResponder: { ...state.marketingAutoResponder },
      };

    default:
      return state;
  }
}
