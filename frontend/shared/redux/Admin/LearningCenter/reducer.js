import actions from './action';

const initState = {
  contentLearningCenterList: [],
  contentDefaultLearningCenterList: [],
  isDefaultDataEmpty: false,
  pageCount: 1,
};

export default function learningCenterAppDefaultReducer(
  state = initState,
  action
) {
  switch (action.type) {
    case actions.APP_DEFAULT_LEARNING_CENTER_SUCCESS:
      return {
        ...state,
        contentLearningCenterList: action.list,
        pageCount: action.pageCount,
      };

    case actions.APP_DEFAULT_LEARNING_CENTER_ERROR:
      return {
        ...state,
        contentLearningCenterList: [...state.contentLearningCenterList],
        contentDefaultLearningCenterList: [
          ...state.contentDefaultLearningCenterList,
        ],
      };
    case actions.SAVE_APP_DEFAULT_LEARNING_CENTER_SUCCESS:
      return {
        ...state,
        contentLearningCenterList: [
          ...state.contentLearningCenterList,
          action.list,
        ],
      };
    case actions.SAVE_APP_DEFAULT_LEARNING_CENTER_ERROR:
      return {
        ...state,
        contentLearningCenterList: [...state.contentLearningCenterList],
      };
    case actions.DEFAULT_APP_DEFAULT_LEARNING_CENTER_SUCCESS:
      return {
        ...state,
        contentDefaultLearningCenterList: action.list,
      };
    case actions.DEFAULT_APP_DEFAULT_LEARNING_CENTER_ERROR:
      return {
        ...state,
        isDefaultDataEmpty: action.payload,
      };
    case actions.EDIT_APP_DEFAULT_LEARNING_CENTER_SUCCESS:
      return {
        ...state,
        contentLearningCenterList: [
          ...state.contentLearningCenterList.slice(0, action.index),
          {
            ...state.contentLearningCenterList[action.index],
            description: action.list.description,
            title: action.list.title,
          },
          ...state.contentLearningCenterList.slice(action.index + 1),
        ],
      };
    case actions.EDIT_APP_DEFAULT_LEARNING_CENTER_ERROR:
      return {
        ...state,
        contentLearningCenterList: [...state.contentLearningCenterList],
      };
    case actions.DELETE_APP_DEFAULT_LEARNING_CENTER_SUCCESS:
      return {
        ...state,
        contentLearningCenterList: state.contentLearningCenterList.filter(
          (item) => item.id !== action.id
        ),
      };
    case actions.DELETE_APP_DEFAULT_LEARNING_CENTER_ERROR:
      return {
        ...state,
        contentLearningCenterList: [...state.contentLearningCenterList],
      };

    default:
      return state;
  }
}
