import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getUSDAValues,
  saveUSDAValues,
  deleteLoanFectorforUSDA,
} from '@iso/lib/services/LO/calculatorUSDA';
import actions from './action';
import { message, notification } from 'antd';

export function* getUSDAData() {
  yield takeEvery(actions.CALCULATOR_USDA, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getUSDAValues);
      yield put({
        type: actions.CALCULATOR_USDA_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.CALCULATOR_USDA_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveUSDAData() {
  yield takeEvery(actions.SAVE_CALCULATOR_USDA, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveUSDAValues, payload);

      if (response.data.status) {
        notification.success({
          message: 'Calculation settings saved successfully',
        });
        yield put({
          type: actions.SAVE_CALCULATOR_USDA_SUCCESS,
          list: response.data.data,
        });
      }
    } catch (error) {
      yield put({ type: actions.SAVE_CALCULATOR_USDA_ERROR });

      const ListOfError = error?.response?.data?.message
        .split(',')
        .map((item) =>
          item.includes('loan_factors')
            ? item.split('.').slice(-1).join(' ').replace(/_/g, ' ')
            : item.split('.').slice(-1)[0].replace(/_/g, ' ')
        );
      message.error(ListOfError.join(', '));
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteLoanFector() {
  yield takeEvery(actions.DELETE_CALCULATOR_USDA_LOAN_FECTOR, function* ({
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
      yield put({ type: actions.DELETE_CALCULATOR_USDA_LOAN_FECTOR_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getUSDAData)]);
  yield all([fork(deleteLoanFector)]);
  yield all([fork(saveUSDAData)]);
}
