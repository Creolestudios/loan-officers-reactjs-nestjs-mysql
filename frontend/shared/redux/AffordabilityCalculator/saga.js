import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAffordabilityValues,
  saveAffordabilityValues,
  deleteLoanFectorforAffordability,
} from '@iso/lib/services/LO/AffordabilityCalculator';
import actions from './action';
import { message, notification } from 'antd';

export function* getAffordabilityData() {
  yield takeEvery(actions.CALCULATOR_AFFORDABILITY, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAffordabilityValues);
      yield put({
        type: actions.CALCULATOR_AFFORDABILITY_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.CALCULATOR_AFFORDABILITY_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveAffordabilityData() {
  yield takeEvery(actions.SAVE_CALCULATOR_AFFORDABILITY, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveAffordabilityValues, payload);

      if (response.data.status) {
        notification.success({
          message: 'Calculation settings saved successfully',
        });
        yield put({
          type: actions.SAVE_CALCULATOR_AFFORDABILITY_SUCCESS,
          list: response.data.data,
        });
      }
    } catch (error) {
      yield put({ type: actions.SAVE_CALCULATOR_AFFORDABILITY_ERROR });

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
  yield takeEvery(
    actions.DELETE_CALCULATOR_AFFORDABILITY_LOAN_FECTOR,
    function* ({ payload }) {
      try {
        yield put(authActions.globalLoaderHandler(true));
        const response = yield call(deleteLoanFectorforAffordability, payload);
        if (response.data.status) {
          notification.success({
            message: 'Affordability Loan Fector deleted successfully',
          });
        }
      } catch (error) {
        yield put({
          type: actions.DELETE_CALCULATOR_AFFORDABILITY_LOAN_FECTOR_ERROR,
        });
      }
      yield put(authActions.globalLoaderHandler(false));
    }
  );
}

export default function* rootSaga() {
  yield all([fork(getAffordabilityData)]);
  yield all([fork(deleteLoanFector)]);
  yield all([fork(saveAffordabilityData)]);
}
