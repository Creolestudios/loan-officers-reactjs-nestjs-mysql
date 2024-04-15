import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  editFeesValues,
  getFeesValues,
  saveFeesValues,
  deleteAppDefaultFees,
} from '@iso/lib/services/Admin/FeesAppDefault';
import actions from './action';
import { notification } from 'antd';

export function* getFeesData() {
  yield takeEvery(actions.APP_DEFAULT_FEES, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getFeesValues);
      yield put({
        type: actions.APP_DEFAULT_FEES_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.APP_DEFAULT_FEES_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteFeesSaga() {
  yield takeEvery(actions.DELETE_APP_DEFAULT_FEES, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteAppDefaultFees, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.message,
        });
        yield put({
          type: actions.DELETE_APP_DEFAULT_FEES_SUCCESS,
          id: response.data.data.service_id,
        });
      }
    } catch (error) {
      yield put({ type: actions.DELETE_APP_DEFAULT_FEES_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editFeesData() {
  yield takeEvery(actions.EDIT_APP_DEFAULT_FEES, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(editFeesValues, payload);
      if (response.data.status) {
        yield put({
          type: actions.EDIT_APP_DEFAULT_FEES_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.APP_DEFAULT_FEES,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_APP_DEFAULT_FEES_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveNewFeesData() {
  yield takeEvery(actions.SAVE_APP_DEFAULT_FEES, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveFeesValues, payload);
      if (response.data.status) {
        yield put({
          type: actions.SAVE_APP_DEFAULT_FEES_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.APP_DEFAULT_FEES,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_APP_DEFAULT_FEES_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getFeesData)]);
  yield all([fork(editFeesData)]);
  yield all([fork(saveNewFeesData)]);
  yield all([fork(deleteFeesSaga)]);
}
