import actions from './action';

const initState = {
  contentLoanProgramList: [],
  contentDefaultLoanProgramList: [],
  isDefaultDataEmpty: false,
  pageCount: 1,
};

export default function loanProgramAppDefaultReducer(
  state = initState,
  action
) {
  switch (action.type) {
    case actions.APP_DEF_LOAN_PROGRAM_SUCCESS:
      return {
        ...state,
        contentLoanProgramList: action.list,
        pageCount: action.pageCount,
      };
    case actions.APP_DEF_LOAN_PROGRAM_ERROR:
      return {
        ...state,
        contentLoanProgramList: [...state.contentLoanProgramList],
        contentDefaultLoanProgramList: [...state.contentDefaultLoanProgramList],
      };
    case actions.SAVE_APP_DEF_LOAN_PROGRAM_SUCCESS:
      return {
        ...state,
        contentLoanProgramList: [...state.contentLoanProgramList, action.list],
      };
    case actions.SAVE_APP_DEF_LOAN_PROGRAM_ERROR:
      return {
        ...state,
        contentLoanProgramList: [...state.contentLoanProgramList],
      };
    case actions.DEFAULT_APP_DEF_LOAN_PROGRAM_SUCCESS:
      return {
        ...state,
        contentDefaultLoanProgramList: action.list,
      };
    case actions.DEFAULT_APP_DEF_LOAN_PROGRAM_ERROR:
      return {
        ...state,
        isDefaultDataEmpty: action.payload,
      };
    case actions.EDIT_APP_DEF_LOAN_PROGRAM_SUCCESS:
      return {
        ...state,
        contentLoanProgramList: [
          ...state.contentLoanProgramList.slice(0, action.index),
          {
            ...state.contentLoanProgramList[action.index],
            program_description: action.list.program_description,
            program_icon: action.list.program_icon,
            program_name: action.list.program_name,
          },
          ...state.contentLoanProgramList.slice(action.index + 1),
        ],
      };
    case actions.EDIT_APP_DEF_LOAN_PROGRAM_ERROR:
      return {
        ...state,
        contentLoanProgramList: [...state.contentLoanProgramList],
      };
    case actions.DELETE_APP_DEF_LOAN_PROGRAM_SUCCESS:
      return {
        ...state,
        contentLoanProgramList: state.contentLoanProgramList.filter(
          (item) => item.id !== action.id
        ),
      };
    case actions.DELETE_APP_DEF_LOAN_PROGRAM_ERROR:
      return {
        ...state,
        contentLoanProgramList: [...state.contentLoanProgramList],
      };

    default:
      return state;
  }
}
