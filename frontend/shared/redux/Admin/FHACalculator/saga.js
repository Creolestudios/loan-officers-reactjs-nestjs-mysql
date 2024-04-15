import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getFHAValues,
  saveFHAValues,
  deleteLoanFectorforFHA,
} from '@iso/lib/services/Admin/FHACalculator';
import { message, notification } from 'antd';

import actions from './action';

export function* getFHAData() {
  yield takeEvery(actions.CALCULATOR_FHA_ADMIN, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getFHAValues);

      yield put({
        type: actions.CALCULATOR_FHA_ADMIN_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.CALCULATOR_FHA_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveFHAData() {
  yield takeEvery(actions.SAVE_CALCULATOR_FHA_ADMIN, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveFHAValues, payload);

      if (response.data.status) {
        notification.success({
          message: 'Calculation settings saved successfully',
        });
        yield put({
          type: actions.SAVE_CALCULATOR_FHA_ADMIN_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.CALCULATOR_FHA_ADMIN,
        });
      }
    } catch (error) {
      yield put({ type: actions.SAVE_CALCULATOR_FHA_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteLoanFector() {
  yield takeEvery(actions.DELETE_CALCULATOR_FHA_ADMIN_LOAN_FECTOR, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(deleteLoanFectorforFHA, payload);

      if (response.data.status) {
        notification.success({
          message: 'FHA Loan Fector deleted successfully',
        });
      }
    } catch (error) {
      yield put({
        type: actions.DELETE_CALCULATOR_FHA_ADMIN_LOAN_FECTOR_ERROR,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getFHAData)]);
  yield all([fork(deleteLoanFector)]);
  yield all([fork(saveFHAData)]);
}
