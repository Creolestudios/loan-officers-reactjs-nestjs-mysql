import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOMarketWidgets,
  calculateLOMarketWidgets,
  getLOMarketWidgetsList,
} from '@iso/lib/services/LO/marketWidgets';

import actions from './action';

export function* getMarketWidget() {
  yield takeEvery(actions.WIDGETS_DEFAULT, function* ({ payload }) {
    const cs = payload.types;
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOMarketWidgets, payload);

      yield put({
        type: actions.WIDGETS_DEFAULT_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({
        type: actions.WIDGETS_DEFAULT_ERROR,
        pType: cs,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getMarketWidgetTypeList() {
  yield takeEvery(actions.CALCULATE_WIDGETS_TYPE_LIST, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLOMarketWidgetsList, payload.id);
      yield put({
        type: actions.CALCULATE_WIDGETS_TYPE_LIST_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {}
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* calculateMarketWidget() {
  yield takeEvery(actions.CALCULATE_WIDGETS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const types = payload.types;
      const response = yield call(calculateLOMarketWidgets, payload);

      if (response.data.status) {
        yield put({
          type: actions.CALCULATE_WIDGETS_SUCCESS,
          list: response.data.data,
          typeOFcalculation: types,
        });
      }
    } catch (error) {
      yield put({ type: actions.CALCULATE_WIDGETS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getMarketWidget)]);
  yield all([fork(calculateMarketWidget)]);
  yield all([fork(getMarketWidgetTypeList)]);
}
