import actions from './action';

const initState = {
  contentCheckList: [],
  contentDefaultCheckList: [],
  pageCount: 1,
  error: false,
};

export default function checklistReducer(state = initState, action) {
  switch (action.type) {
    case actions.CONTENT_LO_CHECKLIST_SUCCESS:
      return {
        ...state,
        contentCheckList: action.list,
        pageCount: action.pageCount,
      };

    case actions.CONTENT_LO_CHECKLIST_ERROR:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList],
        contentDefaultCheckList: [...state.contentDefaultCheckList],
      };
    case actions.SAVE_CONTENT_LO_CHECKLIST_SUCCESS:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList, action.list],
        error: false,
      };
    case actions.SAVE_CONTENT_LO_CHECKLIST_ERROR:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList],
        error: true,
      };
    case actions.EDIT_CONTENT_LO_CHECKLIST_SUCCESS:
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
    case actions.EDIT_CONTENT_LO_CHECKLIST_ERROR:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList],
      };

    case actions.DELETE_CONTENT_LO_CHECKLIST_SUCCESS:
      return {
        ...state,
        contentCheckList: state.contentCheckList.filter(
          (item) => item.id !== action.id
        ),
        // pageCount: state.pageCount - 1,
      };
    case actions.DELETE_CONTENT_LO_CHECKLIST_ERROR:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList],
      };

    // case actions.DELETE_CONTENT_LO_CHECKLIST_ITEM_SUCCESS:
    //   return {
    //     ...state,
    //     contentCheckList: state.contentCheckList.map((item, index) =>
    //       Number(item.id) === Number(action.Ids.id)
    //         ? state.contentCheckList[index]?.checklist_items.filter(
    //             (x) => x.id !== action.Ids.item_id
    //           )
    //         : item
    //     ),
    //   };
    case actions.DELETE_CONTENT_LO_CHECKLIST_ITEM_ERROR:
      return {
        ...state,
        contentCheckList: [...state.contentCheckList],
      };
    default:
      return state;
  }
}
