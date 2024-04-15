import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import * as FileSaver from 'file-saver';

import authActions from '@iso/redux/app/actions';
import {
  getLOUsers,
  getLOUsersDetailes,
  getLOUsersCalculations,
  getLOUserCalculationDetailes,
  getLOUserUploadDocuments,
  getLOUsersGenerateReports,
  createLOChatId,
  uploadeLOUserChatDocs,
  userSendPushNotifiation,
  userSendMessageNotifiation,
} from '@iso/lib/services/LO/usersActivity';
import actions from './action';
import { message, notification } from 'antd';

export function* getUsers() {
  yield takeEvery(actions.ACTIVITY_USERS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const page = payload.page;
      const search = payload.search;
      const size = payload.pagesize;
      const ex = payload.is_export;
      const response = yield call(getLOUsers, page, search, size, ex);
      if (ex) {
        yield put({
          type: actions.ACTIVITY_USERS_EXPORT_SUCCESS,
          list: response.data.data.items,
          pageCount: response.data.data.total_items,
        });
      } else {
        yield put({
          type: actions.ACTIVITY_USERS_SUCCESS,
          list: response.data.data.items,
          pageCount: response.data.data.total_items,
        });
      }
    } catch (error) {
      yield put({ type: actions.ACTIVITY_USERS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getGenerateReport() {
  yield takeEvery(actions.ACTIVITY_USERS_GENERATE_REPORT, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOUsersGenerateReports, payload);
      let data = new Blob([response.data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(data, payload.filename + '.xlsx');
    } catch (error) {
      yield put({ type: actions.ACTIVITY_USERS_GENERATE_REPORT_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* cretateChatIdSagas() {
  yield takeEvery(actions.ACTIVITY_USERS_CREATE_CHAT_ID, function* ({
    payload,
  }) {
    try {
      const response = yield call(createLOChatId, payload);
      yield put({
        type: actions.ACTIVITY_USERS_CREATE_CHAT_ID_SUCCESS,
        ChatID: response.data.data.chat_id,
      });
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  });
}
export function* sendPushNotificationSagas() {
  yield takeEvery(actions.ACTIVITY_USERS_PUSH_NOTIFICATION, function* ({
    payload,
  }) {
    try {
      const response = yield call(userSendPushNotifiation, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  });
}
export function* sendMessagesNotificationSagas() {
  yield takeEvery(actions.ACTIVITY_USERS_MESSAGE_NOTIFICATION, function* ({
    payload,
  }) {
    try {
      const response = yield call(userSendMessageNotifiation, payload);
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  });
}

export function* getUsersDetailes() {
  yield takeEvery(actions.ACTIVITY_USERS_DETAILES, function* ({ payload }) {
    try {
      if (!payload.message) {
        yield put(authActions.globalLoaderHandler(true));
      }
      const id = payload.userId;
      const response = yield call(getLOUsersDetailes, id);

      yield put({
        type: actions.ACTIVITY_USERS_DETAILES_SUCCESS,
        list: response.data.data,
        pagecountforUserCalculation: response.data.data.total_items,
      });
    } catch (error) {
      yield put({ type: actions.ACTIVITY_USERS_DETAILES_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* uploadChatDocsSagas() {
  yield takeEvery(actions.ACTIVITY_USERS_UPLOAD_CHAT_DOCS, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(uploadeLOUserChatDocs, payload);
      yield put({
        type: actions.ACTIVITY_USERS_UPLOAD_CHAT_DOCS_SUCCESS,
        ChatDocs_URL: response.data.data.url,
      });
    } catch (error) {
      yield put({ type: actions.ACTIVITY_USERS_UPLOAD_CHAT_DOCS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getUsersCalculations() {
  yield takeEvery(actions.ACTIVITY_USERS_CALCULATIONS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.userId;
      const page = payload.page;
      const search = payload.search;
      const size = payload.pagesize;
      const response = yield call(
        getLOUsersCalculations,
        id,
        {
          is_saved: payload.is_saved,
        },
        page,
        search,
        size
      );

      yield put({
        type: actions.ACTIVITY_USERS_CALCULATIONS_SUCCESS,
        list: response.data.data.items,
        pageCount: response.data.data.total_items,
        name: response.data.data.name,
      });
    } catch (error) {
      yield put({ type: actions.ACTIVITY_USERS_CALCULATIONS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getUserUploadDocuments() {
  yield takeEvery(actions.ACTIVITY_USER_DOCUMENTS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.userId;
      const page = payload.page;
      const search = payload.search;
      const size = payload.pagesize;
      const response = yield call(
        getLOUserUploadDocuments,
        id,
        page,
        search,
        size
      );

      yield put({
        type: actions.ACTIVITY_USER_DOCUMENTS_SUCCESS,
        list: response.data.data.items,
        pageCount: response.data.data.total_items,
        name: response.data.data.name,
      });
    } catch (error) {
      yield put({ type: actions.ACTIVITY_USER_DOCUMENTS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getUserCalculationDetailes() {
  yield takeEvery(actions.ACTIVITY_USER_CAL_DETAIL, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.userId;
      const response = yield call(
        getLOUserCalculationDetailes,
        id,
        payload.cal_id
      );

      yield put({
        type: actions.ACTIVITY_USER_CAL_DETAIL_SUCCESS,
        data: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.ACTIVITY_USER_CAL_DETAIL_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getUsers)]);
  yield all([fork(getUsersDetailes)]);
  yield all([fork(getUsersCalculations)]);
  yield all([fork(getUserUploadDocuments)]);
  yield all([fork(getUserCalculationDetailes)]);
  yield all([fork(getGenerateReport)]);
  yield all([fork(cretateChatIdSagas)]);
  yield all([fork(uploadChatDocsSagas)]);
  yield all([fork(sendPushNotificationSagas)]);
  yield all([fork(sendMessagesNotificationSagas)]);
}
