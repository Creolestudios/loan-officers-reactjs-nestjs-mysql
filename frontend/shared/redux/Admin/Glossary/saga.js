import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAppDefaultGlossary,
  addAppDefaultGlossary,
  editAppDefaultGlossary,
  deleteAppDefaultGlossary,
} from '@iso/lib/services/Admin/GlossaryAppDefault';
import { notification } from 'antd';
import { history } from '@iso/lib/helpers/history';
import actions from './action';

export function* getGlossary() {
  yield takeEvery(actions.APP_DEFAULT_GLOSSARY, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getAppDefaultGlossary, payload);
      yield put({
        type: actions.APP_DEFAULT_GLOSSARY_SUCCESS,
        data: response.data.data.glossary_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_DEFAULT_GLOSSARY_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* deleteGlossary() {
  yield takeEvery(actions.DELETE_APP_DEFAULT_GLOSSARY, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteAppDefaultGlossary, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.DELETE_APP_DEFAULT_GLOSSARY_SUCCESS,
          id: response.data.data.id,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_APP_DEFAULT_GLOSSARY_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addGlossary() {
  yield takeEvery(actions.ADD_APP_DEFAULT_GLOSSARY, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addAppDefaultGlossary, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.ADD_APP_DEFAULT_GLOSSARY_SUCCESS,
        });
        history.push(`/admin/dashboard/app-default/glossary`);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADD_APP_DEFAULT_GLOSSARY_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editGlossary() {
  yield takeEvery(actions.EDIT_APP_DEFAULT_GLOSSARY, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(editAppDefaultGlossary, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.EDIT_APP_DEFAULT_GLOSSARY_SUCCESS,
        });
        history.push(`/admin/dashboard/app-default/glossary`);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_APP_DEFAULT_GLOSSARY_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getGlossary)]);
  yield all([fork(addGlossary)]);
  yield all([fork(editGlossary)]);
  yield all([fork(deleteGlossary)]);
}
