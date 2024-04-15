import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOMarketEmailSignature,
  uploadLOMarketEmailSignature,
  deleteLOMarketEmailSignature,
  defaultLOMarkertEmailSignature,
} from '@iso/lib/services/LO/marketEmailSignatures';
import actions from './action';
import { history } from '@iso/lib/helpers/history';
import { notification } from 'antd';

export function* getMarketEmailSignature() {
  yield takeEvery(actions.MARKETING_EMAIL_SIGNATURE, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOMarketEmailSignature);
      yield put({
        type: actions.MARKETING_EMAIL_SIGNATURE_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.MARKETING_EMAIL_SIGNATURE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* defaultMarkertEmailSignature() {
  yield takeEvery(actions.DEFAULT_MARKETING_EMAIL_SIGNATURE, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(defaultLOMarkertEmailSignature);
      if (response.data.status) {
        yield put({
          type: actions.DEFAULT_MARKETING_EMAIL_SIGNATURE_SUCCESS,
        });
        yield put({
          type: actions.MARKETING_EMAIL_SIGNATURE,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DEFAULT_MARKETING_EMAIL_SIGNATURE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* uploadEmailSignature() {
  yield takeEvery(actions.UPLOAD_MARKETING_EMAIL_SIGNATURE, function* ({
    payload,
  }) {
    try {
      const response = yield call(uploadLOMarketEmailSignature, payload);
      if (response.data.status) {
        notification.success({
          message: 'Signature added successfully',
        });
        yield put({
          type: actions.UPLOAD_MARKETING_EMAIL_SIGNATURE_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.MARKETING_EMAIL_SIGNATURE,
        });
        history.push(`/portal/dashboard/marketing/email-signature`);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.UPLOAD_MARKETING_EMAIL_SIGNATURE_ERROR });
    }
  });
}

export function* deleteEmailSignature() {
  yield takeEvery(actions.MARKETING_EMAIL_DELETE_SIGNATURE, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(deleteLOMarketEmailSignature, payload);
      if (response.data.status) {
        notification.success({
          message: 'Signature deleted successfully',
        });
        yield put({
          type: actions.MARKETING_EMAIL_DELETE_SIGNATURE_SUCCESS,
          id: response.data.data.id,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.MARKETING_EMAIL_DELETE_SIGNATURE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getMarketEmailSignature)]);
  yield all([fork(uploadEmailSignature)]);
  yield all([fork(deleteEmailSignature)]);
  yield all([fork(defaultMarkertEmailSignature)]);
}
