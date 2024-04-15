import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getUSDAValues,
  saveUSDAValues,
  deleteLoanFectorforUSDA,
} from '@iso/lib/services/Admin/UsdaCalculator';
import actions from './action';
import { message, notification } from 'antd';

export function* getUSDAData() {
  yield takeEvery(actions.CALCULATOR_USDA_ADMIN, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getUSDAValues);
      yield put({
        type: actions.CALCULATOR_USDA_ADMIN_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.CALCULATOR_USDA_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveUSDAData() {
  yield takeEvery(actions.SAVE_CALCULATOR_USDA_ADMIN, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveUSDAValues, payload);

      if (response.data.status) {
        notification.success({
          message: 'Calculation settings saved successfully',
        });
        yield put({
          type: actions.SAVE_CALCULATOR_USDA_ADMIN_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.CALCULATOR_USDA_ADMIN,
        });
      }
    } catch (error) {
      yield put({ type: actions.SAVE_CALCULATOR_USDA_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteLoanFector() {
  yield takeEvery(actions.DELETE_CALCULATOR_USDA_ADMIN_LOAN_FECTOR, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteLoanFectorforUSDA, payload);
      if (response.data.status) {
        notification.success({
          message: 'USDA Loan Fector deleted successfully',
        });
      }
    } catch (error) {
      yield put({
        type: actions.DELETE_CALCULATOR_USDA_ADMIN_LOAN_FECTOR_ERROR,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getUSDAData)]);
  yield all([fork(deleteLoanFector)]);
  yield all([fork(saveUSDAData)]);
}
