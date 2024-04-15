import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import { getVAValues, saveVAValues } from '@iso/lib/services/LO/VACalculator';
import actions from './action';
import { message, notification } from 'antd';

export function* getVAData() {
  yield takeEvery(actions.CALCULATOR_VA, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getVAValues);
      yield put({
        type: actions.CALCULATOR_VA_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.CALCULATOR_VA_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveVAData() {
  yield takeEvery(actions.SAVE_CALCULATOR_VA, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveVAValues, payload);
      if (response.status) {
        notification.success({
          message: 'Calculation settings saved successfully',
        });
        yield put({
          type: actions.SAVE_CALCULATOR_VA_SUCCESS,
          list: response.data.data,
        });
      }
    } catch (error) {
      yield put({ type: actions.SAVE_CALCULATOR_VA_ERROR });

      const ListOfError = error?.response?.data?.message
        .split(',')
        .map((item) =>
          item.includes('loan_factors')
            ? item.split('.').slice(-2).join(' ').replace(/_/g, ' ')
            : item.split('.').slice(-1)[0].replace(/_/g, ' ')
        );
      message.error(ListOfError.join(', '));
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getVAData)]);
  yield all([fork(saveVAData)]);
}
