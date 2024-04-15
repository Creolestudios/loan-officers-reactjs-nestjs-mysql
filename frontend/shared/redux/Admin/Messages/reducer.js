import actions from './action';

const initState = {
  MessagesList: [],
};

export default function AdminMessagesReducer(state = initState, action) {
  switch (action.type) {
    case actions.ADMIN_MESSAGES_SUCCESS:
      return {
        ...state,
        MessagesList: action.data,
      };

    case actions.DELETE_ADMIN_MESSAGES_SUCCESS:
      return {
        ...state,
        MessagesList: state.MessagesList.filter(
          (item) => item.id !== Number(action.id)
        ),
      };

    default:
      return state;
  }
}
