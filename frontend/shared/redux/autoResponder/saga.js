import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOMarketAutoResponder,
  updateLOMarketAutoResponder,
  defaultLOAutoResponder,
} from '@iso/lib/services/LO/marketAutoResponder';
import { notification } from 'antd';

import actions from './action';

export function* getMarketingAutoResponder() {
  yield takeEvery(actions.MARKETING_AUTO_RESPONDER, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLOMarketAutoResponder);
      yield put({
        type: actions.MARKETING_AUTO_RESPONDER_SUCCESS,
        data: response.data.data,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.MARKETING_AUTO_RESPONDER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* defaultAutoResponder() {
  yield takeEvery(actions.DEFAULT_LO_AUTO_RESPONDER, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(defaultLOAutoResponder);
      if (response.data.status) {
        notification.success({
          message: response.data.message,
        });
        yield put({
          type: actions.MARKETING_AUTO_RESPONDER,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DEFAULT_LO_AUTO_RESPONDER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* updateMarketingAutoResponder() {
  yield takeEvery(actions.UPDATE_MARKETING_AUTO_RESPONDER, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(updateLOMarketAutoResponder, payload);
      if (response.data.status) {
        notification.success({
          message: 'Auto Responder update successfully',
        });
        yield put({
          type: actions.UPDATE_MARKETING_AUTO_RESPONDER_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.UPDATE_MARKETING_AUTO_RESPONDER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getMarketingAutoResponder)]);
  yield all([fork(updateMarketingAutoResponder)]);
  yield all([fork(defaultAutoResponder)]);
}
