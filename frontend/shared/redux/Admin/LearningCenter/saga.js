import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOLearningCenterList,
  saveLOLearningCenter,
  deleteLOLearningCenter,
  defaultLOLearningCenter,
  editLOLearningCenter,
} from '@iso/lib/services/Admin/LearningCenterAppDefault';
import { message, notification } from 'antd';

import actions from './action';

export function* getLearningCenterList() {
  yield takeEvery(actions.APP_DEFAULT_LEARNING_CENTER, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const page = payload.page;
      const pageSize = payload.pageSize;
      const response = yield call(getLOLearningCenterList, page, pageSize);
      yield put({
        type: actions.APP_DEFAULT_LEARNING_CENTER_SUCCESS,
        list: response.data.data.items,
        pageCount: response.data.data.total_items,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_DEFAULT_LEARNING_CENTER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* defaultLearningCenterList() {
  yield takeEvery(actions.DEFAULT_APP_DEFAULT_LEARNING_CENTER, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(defaultLOLearningCenter);
      if (response.data.status && Object.keys(response.data.data).length) {
        yield put({
          type: actions.DEFAULT_APP_DEFAULT_LEARNING_CENTER_SUCCESS,
          list: response.data,
        });
      } else {
        yield put({
          type: actions.DEFAULT_APP_DEFAULT_LEARNING_CENTER_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DEFAULT_APP_DEFAULT_LEARNING_CENTER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveLearningCenterList() {
  yield takeEvery(actions.SAVE_APP_DEFAULT_LEARNING_CENTER, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveLOLearningCenter, payload);
      if (response.data.status) {
        notification.success({
          message: 'Learning center added successfully',
        });
        yield put({
          type: actions.SAVE_APP_DEFAULT_LEARNING_CENTER_SUCCESS,
          list: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_APP_DEFAULT_LEARNING_CENTER_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editLearningCenter() {
  yield takeEvery(actions.EDIT_APP_DEFAULT_LEARNING_CENTER, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const index = payload.index;
      delete payload.index;
      const response = yield call(editLOLearningCenter, payload);
      if (response.data.status) {
        notification.success({
          message: 'Learning center updated successfully',
        });
        yield put({
          type: actions.EDIT_APP_DEFAULT_LEARNING_CENTER_SUCCESS,
          list: response.data.data,
          index: index,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_APP_DEFAULT_LEARNING_CENTER_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteLearningCenter() {
  yield takeEvery(actions.DELETE_APP_DEFAULT_LEARNING_CENTER, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteLOLearningCenter, payload);
      if (response.data.status) {
        notification.success({
          message: 'Learning center deleted successfully ',
        });
        yield put({
          type: actions.DELETE_APP_DEFAULT_LEARNING_CENTER_SUCCESS,
          id: response.data.data.id,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_APP_DEFAULT_LEARNING_CENTER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getLearningCenterList)]);
  yield all([fork(saveLearningCenterList)]);
  yield all([fork(defaultLearningCenterList)]);
  yield all([fork(editLearningCenter)]);
  yield all([fork(deleteLearningCenter)]);
}
