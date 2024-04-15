import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAppDefaultLegal,
  updateAppDefaultLegal,
} from '@iso/lib/services/Admin/LegalAppDefault';
import { notification, message } from 'antd';

import actions from './action';

export function* getLegalValue() {
  yield takeEvery(actions.APP_DEFAULT_LEGAL, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getAppDefaultLegal, payload);
      yield put({
        type: actions.APP_DEFAULT_LEGAL_SUCCESS,
        data: response.data.data,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_DEFAULT_LEGAL_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* updateLegalValue() {
  yield takeEvery(actions.UPDATE_APP_DEFAULT_LEGAL, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const types = payload.type;
      const response = yield call(updateAppDefaultLegal, payload);
      if (response.data.status) {
        notification.success({
          message:
            types === 'privacy'
              ? 'Privacy Policy update successfully'
              : 'Disclaimer update successfully',
        });
        yield put({
          type: actions.UPDATE_APP_DEFAULT_LEGAL_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.UPDATE_APP_DEFAULT_LEGAL_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getLegalValue)]);
  yield all([fork(updateLegalValue)]);
}
