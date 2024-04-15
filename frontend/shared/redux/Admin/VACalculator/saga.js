import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getVAValues,
  saveVAValues,
} from '@iso/lib/services/Admin/VAcalculator';
import actions from './action';
import { message, notification } from 'antd';

export function* getVAData() {
  yield takeEvery(actions.CALCULATOR_VA_ADMIN, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getVAValues);
      yield put({
        type: actions.CALCULATOR_VA_ADMIN_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.CALCULATOR_VA_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveVAData() {
  yield takeEvery(actions.SAVE_CALCULATOR_VA_ADMIN, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveVAValues, payload);

      if (response.data.status) {
        notification.success({
          message: 'Calculation settings saved successfully',
        });
        yield put({
          type: actions.SAVE_CALCULATOR_VA_ADMIN_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.CALCULATOR_VA_ADMIN,
        });
      }
    } catch (error) {
      yield put({ type: actions.SAVE_CALCULATOR_VA_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getVAData)]);
  yield all([fork(saveVAData)]);
}
