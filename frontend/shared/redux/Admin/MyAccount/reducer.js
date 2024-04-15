import actions from './action';

const initState = {
  AdminProfileDetailes: {},
};

export default function AdminAccontReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_ADMIN_MY_ACCOUNT_SUCCESS:
      return {
        ...state,
        AdminProfileDetailes: action.list,
      };

    default:
      return state;
  }
}
