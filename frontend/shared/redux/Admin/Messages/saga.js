import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAdminMessages,
  saveAdminNewMessage,
  editAdminMessage,
  deleteAdminMessage,
} from '@iso/lib/services/Admin/MessagesApi';
import { notification } from 'antd';
import { history } from '@iso/lib/helpers/history';
import actions from './action';

export function* getMessageSagas() {
  yield takeEvery(actions.ADMIN_MESSAGES, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getAdminMessages);
      yield put({
        type: actions.ADMIN_MESSAGES_SUCCESS,
        data: response.data.data.messages,
      });
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* deleteMessageSagas() {
  yield takeEvery(actions.DELETE_ADMIN_MESSAGES, function* ({ id }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteAdminMessage, id);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.DELETE_ADMIN_MESSAGES_SUCCESS,
          id: response.data.data.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addNewMessageSagas() {
  yield takeEvery(actions.ADD_ADMIN_MESSAGES, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveAdminNewMessage, payload);
      if (response.data.status) {
        notification.success({
          message: 'New messsage added successfully !',
        });
        history.push(`/admin/dashboard/messages`);
      }
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editMessageSagas() {
  yield takeEvery(actions.EDIT_ADMIN_MESSAGES, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(editAdminMessage, payload);
      if (response.data.status) {
        notification.success({
          message: 'Message update successfully !',
        });
        history.push(`/admin/dashboard/messages`);
      }
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getMessageSagas)]);
  yield all([fork(addNewMessageSagas)]);
  yield all([fork(editMessageSagas)]);
  yield all([fork(deleteMessageSagas)]);
}
