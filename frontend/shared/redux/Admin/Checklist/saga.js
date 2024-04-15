import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOCheckListAdmin,
  saveLONewCheckList,
  editLOCheckList,
  deleteLOChecklist,
  defaultLOCheklist,
  deleteLOChecklistItem,
} from '@iso/lib/services/Admin/ChecklistAppDefault';
import actions from './action';
import { message, notification } from 'antd';

export function* getCheckList() {
  yield takeEvery(actions.APP_DEFAULT_ADMIN_CHECKLIST, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const page = payload.page;
      const pageSize = payload.pageSize;
      const response = yield call(getLOCheckListAdmin, page, pageSize);

      yield put({
        type: actions.APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS,
        list: response.data.data.items,
        pageCount: response.data.data.total_items,
      });
    } catch (error) {
      yield put({ type: actions.APP_DEFAULT_ADMIN_CHECKLIST_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveNewCheckList() {
  yield takeEvery(actions.SAVE_APP_DEFAULT_ADMIN_CHECKLIST, function* ({
    payload,
  }) {
    const dError = payload.error;
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveLONewCheckList, payload);

      if (response.data.status) {
        notification.success({
          message: 'Checklist added successfully',
        });
        yield put({
          type: actions.SAVE_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS,
          list: response.data.data,
        });
      }
    } catch (error) {
      yield put({ type: actions.SAVE_APP_DEFAULT_ADMIN_CHECKLIST_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editCheckList() {
  yield takeEvery(actions.EDIT_APP_DEFAULT_ADMIN_CHECKLIST, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const index = payload.index;
      delete payload.index;
      const response = yield call(editLOCheckList, payload);
      if (response.data.status) {
        notification.success({
          message: 'Checklist edit successfully',
        });
        yield put({
          type: actions.EDIT_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS,
          list: response.data.data,
          index: index,
        });
      }
    } catch (error) {
      yield put({ type: actions.EDIT_APP_DEFAULT_ADMIN_CHECKLIST_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* defaultCheckList() {
  yield takeEvery(actions.DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(defaultLOCheklist);
      if (response.data.status && Object.keys(response.data.data).length) {
        yield put({
          type: actions.DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS,
          list: response.data,
        });
      } else {
        yield put({
          type: actions.DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DEFAULT_APP_DEFAULT_ADMIN_CHECKLIST_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteChecklist() {
  yield takeEvery(actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteLOChecklist, payload);

      if (response.data.status) {
        notification.success({
          message: 'Checklist deleted successfully',
        });
        yield put({
          type: actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST_SUCCESS,
          id: response.data.data.id,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteChecklistItem() {
  yield takeEvery(actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const checklistID = payload.cheklistId;
      delete payload.cheklistId;
      const response = yield call(deleteLOChecklistItem, payload, checklistID);
      if (response.data.status) {
        notification.success({
          message: 'Checklist item deleted successfully',
        });
        // yield put({
        //   type: actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM_SUCCESS,
        //   Ids: data.data,
        // });
        yield put({
          type: actions.APP_DEFAULT_ADMIN_CHECKLIST,
          payload: {
            page: 1,
            pageSize: 10,
          },
        });
      }
    } catch (error) {
      console.log(error);
      yield put({
        type: actions.DELETE_APP_DEFAULT_ADMIN_CHECKLIST_ITEM_ERROR,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getCheckList)]);
  yield all([fork(saveNewCheckList)]);
  yield all([fork(editCheckList)]);
  yield all([fork(deleteChecklist)]);
  yield all([fork(deleteChecklistItem)]);
  yield all([fork(defaultCheckList)]);
}
