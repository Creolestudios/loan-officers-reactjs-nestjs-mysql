import actions from './action';

const initState = {
  contentCheckList: [],
  contentDefaultCheckList: [],
  pageCount: 1,
  error: false,
};

export default function checklistAppDefaultReducer(state = initState, action) {
  switch (action.type) {
    case actions.APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS:
      return {
        ...state,
        contentCheckList: action.list,
        pageCount: action.pageCount,
      };

    case actions.APP_DEFAULT_ADMIN_CHECKLIST_ERROR:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList],
        contentDefaultCheckList: [...state.contentDefaultCheckList],
      };
    case actions.SAVE_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList, action.list],
        error: false,
      };
    case actions.SAVE_APP_DEFAULT_ADMIN_CHECKLIST_ERROR:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList],
        error: true,
      };
    case actions.EDIT_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS:
      return {
        ...state,
        contentCheckList: [
          ...state.contentCheckList.slice(0, action.index),
          {
            ...state.contentCheckList[action.index],
            checklist_name: action.list.checklist_name,
            checklist_items: action.list.items,
          },
          ...state.contentCheckList.slice(action.index + 1),
        ],
      };
    case actions.EDIT_APP_DEFAULT_ADMIN_CHECKLIST_ERROR:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList],
      };

    case actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS:
      return {
        ...state,
        contentCheckList: state.contentCheckList.filter(
          (item) => item.id !== action.id
        ),
        // pageCount: state.pageCount - 1,
      };
    case actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ERROR:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList],
      };

    case actions.DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS:
      return {
        ...state,
        contentDefaultCheckList: action.list,
      };
    case actions.DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST_ERROR:
      return {
        ...state,
        isDefaultDataEmpty: action.payload,
      };
    case actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM_SUCCESS:
      return {
        ...state,
        contentCheckList: state.contentCheckList
          .filter((item) => Number(item.id) !== Number(action.Ids.id))
          .filter((x) => x.id !== action.Ids.item_id),
      };
    case actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM_ERROR:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList],
      };
    default:
      return state;
  }
}
