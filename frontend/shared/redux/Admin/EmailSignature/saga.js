import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAdminMarketEmailSignature,
  uploadAdminMarketEmailSignature,
  deleteAdminMarketEmailSignature,
} from '@iso/lib/services/Admin/EmailSignaturesAPI';
import { history } from '@iso/lib/helpers/history';
import actions from './action';
import { notification } from 'antd';

export function* getMarketEmailSignature() {
  yield takeEvery(actions.APP_DEFAULT__EMAIL_SIGNATURE, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminMarketEmailSignature);
      yield put({
        type: actions.APP_DEFAULT__EMAIL_SIGNATURE_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.APP_DEFAULT__EMAIL_SIGNATURE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* uploadEmailSignature() {
  yield takeEvery(actions.UPLOAD_APP_DEFAULT__EMAIL_SIGNATURE, function* ({
    payload,
  }) {
    try {
      const response = yield call(uploadAdminMarketEmailSignature, payload);
      if (response.data.status) {
        notification.success({
          message: 'Signature added successfully',
        });
        yield put({
          type: actions.UPLOAD_APP_DEFAULT__EMAIL_SIGNATURE_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.APP_DEFAULT__EMAIL_SIGNATURE,
        });
        history.push(`/admin/dashboard/app-default/email-signature`);
      }
    } catch (error) {
      yield put({ type: actions.UPLOAD_APP_DEFAULT__EMAIL_SIGNATURE_ERROR });
    }
  });
}

export function* deleteEmailSignature() {
  yield takeEvery(actions.APP_DEFAULT_EMAIL_DELETE_SIGNATURE, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(deleteAdminMarketEmailSignature, payload);
      if (response.data.status) {
        notification.success({
          message: 'Signature deleted successfully',
        });
        yield put({
          type: actions.APP_DEFAULT_EMAIL_DELETE_SIGNATURE_SUCCESS,
          id: response.data.data.id,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_DEFAULT_EMAIL_DELETE_SIGNATURE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getMarketEmailSignature)]);
  yield all([fork(uploadEmailSignature)]);
  yield all([fork(deleteEmailSignature)]);
}
