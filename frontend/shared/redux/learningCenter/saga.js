import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOLearningCenterList,
  saveLOLearningCenter,
  deleteLOLearningCenter,
  defaultLOLearningCenter,
  editLOLearningCenter,
  rearrangeLOLearningCenter,
} from '@iso/lib/services/LO/LearningCenterContent';
import { message, notification } from 'antd';

import actions from './action';

export function* getLearningCenterList() {
  yield takeEvery(actions.CONTENT_LO_LEARNING_CENTER, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const page = payload ? payload.page : 1;
      const pageSize = payload ? payload.pageSize : 10;

      const response = yield call(getLOLearningCenterList, page, pageSize);
      yield put({
        type: actions.CONTENT_LO_LEARNING_CENTER_SUCCESS,
        list: response.data.data.items,
        pageCount: response.data.data.total_items,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.CONTENT_LO_LEARNING_CENTER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* learnigCenterRearrangeSaga() {
  yield takeEvery(actions.REARRANGE_LEARNING_CENTER, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(rearrangeLOLearningCenter, payload);
      if (response.data.status) {
        yield put({
          type: actions.CONTENT_LO_LEARNING_CENTER,
        });
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* defaultLearningCenterList() {
  yield takeEvery(actions.DEFAULT_CONTENT_LO_LEARNING_CENTER, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(defaultLOLearningCenter);
      if (response.data.status) {
        yield put({
          type: actions.DEFAULT_CONTENT_LO_LEARNING_CENTER_SUCCESS,
        });
        yield put({
          type: actions.CONTENT_LO_LEARNING_CENTER,
        });
      } else {
        yield put({
          type: actions.DEFAULT_CONTENT_LO_LEARNING_CENTER_ERROR,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DEFAULT_CONTENT_LO_LEARNING_CENTER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveLearningCenterList() {
  yield takeEvery(actions.SAVE_CONTENT_LO_LEARNING_CENTER, function* ({
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
          type: actions.SAVE_CONTENT_LO_LEARNING_CENTER_SUCCESS,
          list: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_CONTENT_LO_LEARNING_CENTER_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editLearningCenter() {
  yield takeEvery(actions.EDIT_CONTENT_LO_LEARNING_CENTER, function* ({
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
          type: actions.EDIT_CONTENT_LO_LEARNING_CENTER_SUCCESS,
          list: response.data.data,
          index: index,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_CONTENT_LO_LEARNING_CENTER_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteLearningCenter() {
  yield takeEvery(actions.DELETE_CONTENT_LO_LEARNING_CENTER, function* ({
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
          type: actions.DELETE_CONTENT_LO_LEARNING_CENTER_SUCCESS,
          id: response.data.data.id,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_CONTENT_LO_LEARNING_CENTER_ERROR });
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
  yield all([fork(learnigCenterRearrangeSaga)]);
}
