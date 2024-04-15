import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getTypesValues,
  editTypesValues,
  saveDisclaimer,
  restoreDefaultCalculator,
} from '@iso/lib/services/LO/calculatorTypes';
import actions from './action';
import { message, notification } from 'antd';

export function* getTypesData() {
  yield takeEvery(actions.CALCULATOR_TYPES, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getTypesValues);
      yield put({
        type: actions.CALCULATOR_TYPES_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.CALCULATOR_TYPES_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editTypesData() {
  yield takeEvery(actions.EDIT_CALCULATOR_TYPES, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(editTypesValues, payload);

      if (response.data.status) {
        yield put({
          type: actions.EDIT_CALCULATOR_TYPES_SUCCESS,
          list: response.data.data,
        });
      }
    } catch (error) {
      yield put({ type: actions.EDIT_CALCULATOR_TYPES_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* defaultCalculatorSagas() {
  yield takeEvery(actions.CALCULATOR_RESTORE_DEFAULT, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(restoreDefaultCalculator, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
      }
    } catch (error) {}
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveDisclaimerData() {
  yield takeEvery(actions.CALCULATOR_DISCLAIMER, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      yield call(saveDisclaimer, payload);
    } catch (error) {
      yield put({ type: actions.CALCULATOR_DISCLAIMER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getTypesData)]);
  yield all([fork(editTypesData)]);
  yield all([fork(saveDisclaimerData)]);
  yield all([fork(defaultCalculatorSagas)]);
}
