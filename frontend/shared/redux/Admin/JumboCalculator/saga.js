import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getJumboValues,
  saveJumboValues,
  deleteLoanFectorforJumbo,
} from '@iso/lib/services/Admin/JumboCalculator';
import actions from './action';
import { message, notification } from 'antd';

export function* getJumboData() {
  yield takeEvery(actions.JUMBO_CALCULATOR_ADMIN, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getJumboValues);
      yield put({
        type: actions.JUMBO_CALCULATOR_ADMIN_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.JUMBO_CALCULATOR_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveJumboData() {
  yield takeEvery(actions.SAVE_JUMBO_CALCULATOR_ADMIN, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveJumboValues, payload);

      if (response.data.status) {
        notification.success({
          message: 'Calculation settings saved successfully',
        });
        yield put({
          type: actions.SAVE_JUMBO_CALCULATOR_ADMIN_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.JUMBO_CALCULATOR_ADMIN,
        });
      }
    } catch (error) {
      yield put({ type: actions.SAVE_JUMBO_CALCULATOR_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteLoanFectorJumbo() {
  yield takeEvery(
    actions.DELETE_JUMBO_CALCULATOR_ADMIN_LOAN_FECTOR,
    function* ({ payload }) {
      try {
        yield put(authActions.globalLoaderHandler(true));
        const response = yield call(deleteLoanFectorforJumbo, payload);
        if (response.data.status) {
          notification.success({
            message: 'Jumbo Loan Fector deleted successfully',
          });
        }
      } catch (error) {
        yield put({
          type: actions.DELETE_JUMBO_CALCULATOR_ADMIN_LOAN_FECTOR_ERROR,
        });
      }
      yield put(authActions.globalLoaderHandler(false));
    }
  );
}

export default function* rootSaga() {
  yield all([fork(getJumboData)]);
  yield all([fork(deleteLoanFectorJumbo)]);
  yield all([fork(saveJumboData)]);
}
