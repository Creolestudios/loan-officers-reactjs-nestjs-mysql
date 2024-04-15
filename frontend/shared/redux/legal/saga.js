import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOLegalPrivacy,
  getLOLegalDisclaimer,
  updateLOLegalPrivacy,
  updateLOLegalDisclaimer,
} from '@iso/lib/services/LO/LegalContent';
import { notification, message } from 'antd';

import actions from './action';

export function* getLegalPrivacy() {
  yield takeEvery(actions.CONTENT_LO_LEGAL_PRIVACY, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLOLegalPrivacy);
      yield put({
        type: actions.CONTENT_LO_LEGAL_PRIVACY_SUCCESS,
        data: response.data.data,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.CONTENT_LO_LEGAL_PRIVACY_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getLegalDisclaimer() {
  yield takeEvery(actions.CONTENT_LO_LEGAL_DISCLAIMER, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLOLegalDisclaimer);

      yield put({
        type: actions.CONTENT_LO_LEGAL_DISCLAIMER_SUCCESS,
        data: response.data.data,
      });
    } catch (error) {
      console.log(error);
      yield put({
        type: actions.CONTENT_LO_LEGAL_DISCLAIMER_ERROR,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* updateLegalPrivacy() {
  yield takeEvery(actions.UPDATE_CONTENT_LO_LEGAL_PRIVACY, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(updateLOLegalPrivacy, payload);
      if (response.data.status) {
        notification.success({
          message: 'Privacy Policy update successfully',
        });
        yield put({
          type: actions.UPDATE_CONTENT_LO_LEGAL_PRIVACY_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.UPDATE_CONTENT_LO_LEGAL_PRIVACY_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* updateLegalDisclaimer() {
  yield takeEvery(actions.UPDATE_CONTENT_LO_LEGAL_DISCLAIMER, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(updateLOLegalDisclaimer, payload);
      if (response.data.status) {
        notification.success({
          message: 'Disclaimer update successfully',
        });
        yield put({
          type: actions.UPDATE_CONTENT_LO_LEGAL_DISCLAIMER_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.UPDATE_CONTENT_LO_LEGAL_DISCLAIMER_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getLegalPrivacy)]);
  yield all([fork(getLegalDisclaimer)]);
  yield all([fork(updateLegalPrivacy)]);
  yield all([fork(updateLegalDisclaimer)]);
}
