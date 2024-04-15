import actions from './action';

const initState = {
  GlossaryList: [],
  //   isDefaultDataEmpty: false,
};

export default function GlossaryAppDefaultReducer(state = initState, action) {
  switch (action.type) {
    case actions.APP_DEFAULT_GLOSSARY_SUCCESS:
      return {
        ...state,
        GlossaryList: action.data,
      };

    case actions.ADD_APP_DEFAULT_GLOSSARY_SUCCESS:
      return {
        ...state,
        GlossaryList: action.data,
      };

    case actions.DELETE_APP_DEFAULT_GLOSSARY_SUCCESS:
      return {
        ...state,
        GlossaryList: state.GlossaryList.filter(
          (item) => item.id !== Number(action.id)
        ),
      };

    default:
      return state;
  }
}
