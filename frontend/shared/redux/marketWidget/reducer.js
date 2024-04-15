import actions from './action';

const initState = {
  WidgetsDefaultData: {},
  widgateChartData: { fha: {}, usda: {}, jumbo: {}, va: {}, conventional: {} },
  sourcCodeName: 'fha',
  widgetsTypesListData: [],
};

export default function WidgetsReducer(state = initState, action) {
  switch (action.type) {
    case actions.WIDGETS_DEFAULT_SUCCESS:
      return {
        ...state,
        WidgetsDefaultData: action.list,
        sourcCodeName: action.pType,
      };

    case actions.WIDGETS_DEFAULT_ERROR:
      return {
        ...state,
        WidgetsDefaultData: { ...state.WidgetsDefaultData },
        sourcCodeName: action.pType,
      };

    case actions.CALCULATE_WIDGETS_SUCCESS:
      return {
        ...state,
        widgateChartData: {
          ...state.widgateChartData,
          [action.typeOFcalculation]: action.list,
        },
      };

    case actions.CALCULATE_WIDGETS_TYPE_LIST_SUCCESS:
      return {
        ...state,
        widgetsTypesListData: action.list,
      };
    case actions.CALCULATE_WIDGETS_ERROR:
      return {
        ...state,
        widgateChartData: { ...state.widgateChartData },
      };

    default:
      return state;
  }
}
