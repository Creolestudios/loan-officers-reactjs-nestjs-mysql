import actions from './action';

const initState = {};

export default function webLinkReducer(state = initState, action) {
  switch (action.type) {
    case actions.WEB_LINK_SUCCESS:
      return {
        ...state,
      };
    case actions.WEB_LINK_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}
