import { all, takeEvery, put, fork, call, delay } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAdminMyAccount,
  editAdminMyAccount,
  editAdminProfilePhoto,
} from '@iso/lib/services/Admin/MyAccounts';
import { message, notification } from 'antd';
import { history } from '@iso/lib/helpers/history';

import actions from './action';

export function* getmyAccount() {
  yield takeEvery(actions.GET_ADMIN_MY_ACCOUNT, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminMyAccount);
      yield put({
        type: actions.GET_ADMIN_MY_ACCOUNT_SUCCESS,
        list: response.data.data,
      });
      yield localStorage.setItem('type_role', response.data.data.role);
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_ADMIN_MY_ACCOUNT_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editMyAccount() {
  yield takeEvery(actions.EDIT_ADMIN_MY_ACCOUNT, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const reps = payload.is_reps;

      const response = yield call(editAdminMyAccount, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.message,
        });
        if (!reps) {
          yield sessionStorage.clear();
          yield localStorage.setItem(
            'access_token',
            response.data.data.access_token
          );
          yield localStorage.setItem(
            'refresh_token',
            response.data.data.refresh_token
          );

          yield put({
            type: actions.GET_ADMIN_MY_ACCOUNT,
          });
        }
        yield put({
          type: actions.GET_ADMIN_MY_ACCOUNT,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_ADMIN_MY_ACCOUNT_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editProfilePhoto() {
  yield takeEvery(actions.EDIT_ADMIN_PROFILE_PHOTO, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(editAdminProfilePhoto, payload);
      if (response.data.status) {
        notification.success({
          message: 'Profile photo updated succesfully',
        });
        yield put({
          type: actions.EDIT_ADMIN_PROFILE_PHOTO_SUCCESS,
        });
        yield put({
          type: actions.GET_ADMIN_MY_ACCOUNT,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_ADMIN_PROFILE_PHOTO_ERROR });
      // message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getmyAccount)]);
  yield all([fork(editMyAccount)]);
  yield all([fork(editProfilePhoto)]);
}
