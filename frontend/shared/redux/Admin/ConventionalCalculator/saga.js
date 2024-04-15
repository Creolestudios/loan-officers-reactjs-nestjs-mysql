import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getConventionalValues,
  saveConventionalValues,
  deleteLoanFectorforConventional,
} from '@iso/lib/services/Admin/ConventionCalculator';
import actions from './action';
import { message, notification } from 'antd';

export function* getConventionalData() {
  yield takeEvery(actions.CONVENTIONAL_CALCULATOR_ADMIN, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getConventionalValues);
      yield put({
        type: actions.CONVENTIONAL_CALCULATOR_ADMIN_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.CONVENTIONAL_CALCULATOR_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveConventionalData() {
  yield takeEvery(actions.SAVE_CONVENTIONAL_CALCULATOR_ADMIN, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveConventionalValues, payload);

      if (response.data.status) {
        notification.success({
          message: 'Calculation settings saved successfully',
        });
        yield put({
          type: actions.SAVE_CONVENTIONAL_CALCULATOR_ADMIN_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.CONVENTIONAL_CALCULATOR_ADMIN,
        });
      }
    } catch (error) {
      yield put({ type: actions.SAVE_CONVENTIONAL_CALCULATOR_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteLoanFectorConventional() {
  yield takeEvery(
    actions.DELETE_CONVENTIONAL_CALCULATOR_ADMIN_LOAN_FECTOR,
    function* ({ payload }) {
      try {
        yield put(authActions.globalLoaderHandler(true));
        const response = yield call(deleteLoanFectorforConventional, payload);
        if (response.data.status) {
          notification.success({
            message: 'Conventional Loan Fector deleted successfully',
          });
        }
      } catch (error) {
        yield put({
          type: actions.DELETE_CONVENTIONAL_CALCULATOR_ADMIN_LOAN_FECTOR_ERROR,
        });
      }
      yield put(authActions.globalLoaderHandler(false));
    }
  );
}

export default function* rootSaga() {
  yield all([fork(getConventionalData)]);
  yield all([fork(deleteLoanFectorConventional)]);
  yield all([fork(saveConventionalData)]);
}
