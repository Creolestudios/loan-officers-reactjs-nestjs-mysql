import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import { history } from '@iso/lib/helpers/history';

import {
  getAdminSupportGuide,
  getAdminSupportGuideCategory,
  deleteAdminSupportGuide,
  deleteAdminSupportGuideCategory,
  addAdminSupportGuide,
  addAdminSupportGuideCategory,
  editAdminSupportGuideCategory,
  editAdminSupportGuide,
  checkedAdminSupportGuide,
  getAdminSupportFaqs,
  addAdminSupportFaqs,
  editAdminSupportFaqs,
  deleteAdminSupportFaqs,
  rearrangeAdminSupportFaqs,
  saveAdminSupportReps,
  desableAdminSupportReps,
  getAdminSupportReps,
} from '@iso/lib/services/Admin/GuideSupport';
import { message, notification } from 'antd';

import actions from './action';

export function* getSupportGuide() {
  yield takeEvery(actions.GET_ADMIN_SUPPORT_GUIDE, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminSupportGuide);
      yield put({
        type: actions.GET_ADMIN_SUPPORT_GUIDE_SUCCESS,
        list: response.data.data.guide_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_ADMIN_SUPPORT_GUIDE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getSupportGuideCategory() {
  yield takeEvery(actions.GET_ADMIN_SUPPORT_GUIDE_CATEGORY, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminSupportGuideCategory);
      yield put({
        type: actions.GET_ADMIN_SUPPORT_GUIDE_CATEGORY_SUCCESS,
        list: response.data.data.Support_Guide_Category_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_ADMIN_SUPPORT_GUIDE_CATEGORY_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addSupportGuide() {
  yield takeEvery(actions.ADD_NEW_ADMIN_SUPPORT_GUIDE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addAdminSupportGuide, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.ADD_NEW_ADMIN_SUPPORT_GUIDE_SUCCESS,
          list: response.data.data,
        });
        history.push(`/admin/dashboard/support/guide`);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADD_NEW_ADMIN_SUPPORT_GUIDE_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addSupportGuideCategory() {
  yield takeEvery(actions.ADD_ADMIN_SUPPORT_GUIDE_CATEGORY, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addAdminSupportGuideCategory, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.ADD_ADMIN_SUPPORT_GUIDE_CATEGORY_SUCCESS,
        });
        yield put({
          type: actions.GET_ADMIN_SUPPORT_GUIDE_CATEGORY,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADD_ADMIN_SUPPORT_GUIDE_CATEGORY_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editSupportGuide() {
  yield takeEvery(actions.EDIT_ADMIN_SUPPORT_GUIDE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const index = payload.index;
      delete payload.index;
      const response = yield call(editAdminSupportGuide, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.EDIT_ADMIN_SUPPORT_GUIDE_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_ADMIN_SUPPORT_GUIDE_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editSupportGuideCategory() {
  yield takeEvery(actions.EDIT_ADMIN_SUPPORT_GUIDE_CATEGORY, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(editAdminSupportGuideCategory, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.EDIT_ADMIN_SUPPORT_GUIDE_CATEGORY_SUCCESS,
        });
        yield put({
          type: actions.GET_ADMIN_SUPPORT_GUIDE_CATEGORY,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_ADMIN_SUPPORT_GUIDE_CATEGORY_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteSupportGuide() {
  yield takeEvery(actions.DELETE_ADMIN_SUPPORT_GUIDE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteAdminSupportGuide, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.DELETE_ADMIN_SUPPORT_GUIDE_SUCCESS,
          id: response.data.data.id,
        });
        yield put({
          type: actions.GET_ADMIN_SUPPORT_GUIDE,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_ADMIN_SUPPORT_GUIDE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteSupportGuideCategory() {
  yield takeEvery(actions.DELETE_ADMIN_SUPPORT_GUIDE_CATEGORY, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteAdminSupportGuideCategory, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.DELETE_ADMIN_SUPPORT_GUIDE_CATEGORY_SUCCESS,
        });
        yield put({
          type: actions.GET_ADMIN_SUPPORT_GUIDE_CATEGORY,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_ADMIN_SUPPORT_GUIDE_CATEGORY_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* checkedGuide() {
  yield takeEvery(actions.CHECKED_ADMIN_SUPPORT_GUIDE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(checkedAdminSupportGuide, payload);
      if (response.data.status) {
        yield put({
          type: actions.CHECKED_ADMIN_SUPPORT_GUIDE_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.CHECKED_ADMIN_SUPPORT_GUIDE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getSupportFaqs() {
  yield takeEvery(actions.GET_ADMIN_SUPPORT_FAQS, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminSupportFaqs);
      yield put({
        type: actions.GET_ADMIN_SUPPORT_FAQS_SUCCESS,
        list: response.data.data.faqs_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_ADMIN_SUPPORT_FAQS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addSupportFaqsSaga() {
  yield takeEvery(actions.ADD_ADMIN_SUPPORT_FAQS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addAdminSupportFaqs, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        history.push(`/admin/dashboard/support/faqs`);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADD_NEW_ADMIN_SUPPORT_GUIDE_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editSupportFaqsSaga() {
  yield takeEvery(actions.EDIT_ADMIN_SUPPORT_FAQS, function* ({ payload, id }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(editAdminSupportFaqs, payload, id);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        history.push(`/admin/dashboard/support/faqs`);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteSupportFaqsSaga() {
  yield takeEvery(actions.DELETE_ADMIN_SUPPORT_FAQS, function* ({
    payload,
    id,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteAdminSupportFaqs, id);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({ type: actions.GET_ADMIN_SUPPORT_FAQS });
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* supportFaqsRearrangeSaga() {
  yield takeEvery(actions.REARRANGE_ADMIN_SUPPORT_FAQS, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(rearrangeAdminSupportFaqs, payload);
      if (response.data.status) {
        yield put({
          type: actions.GET_ADMIN_SUPPORT_FAQS,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.REARRANGE_ADMIN_SUPPORT_FAQS_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getSupportRepsSaga() {
  yield takeEvery(actions.GET_ADMIN_SUPPORT_REPS, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminSupportReps);

      yield put({
        type: actions.GET_ADMIN_SUPPORT_REPS_SUCCESS,
        list: response.data.data.representatives_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_ADMIN_SUPPORT_REPS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* saveSupportRepsSaga() {
  yield takeEvery(actions.SAVE_ADMIN_SUPPORT_REPS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(saveAdminSupportReps, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
      }
      yield put({
        type: actions.SAVE_ADMIN_SUPPORT_REPS_SUCCESS,
      });
      history.push(`/admin/dashboard/support/reps`);
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_ADMIN_SUPPORT_REPS_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* desableSupportRepsSaga() {
  yield takeEvery(actions.DESABLE_ADMIN_SUPPORT_REPS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const CheckStatus = payload.status;

      const response = yield call(desableAdminSupportReps, payload);
      if (response.data.status) {
        notification.success({
          message: CheckStatus
            ? 'Reps enabled successfully !!'
            : 'Reps disabled successfully !!',
        });
      }
      yield put({
        type: actions.GET_ADMIN_SUPPORT_REPS,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DESABLE_ADMIN_SUPPORT_REPS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getSupportGuide)]);
  yield all([fork(getSupportGuideCategory)]);
  yield all([fork(addSupportGuide)]);
  yield all([fork(addSupportGuideCategory)]);
  yield all([fork(editSupportGuide)]);
  yield all([fork(editSupportGuideCategory)]);
  yield all([fork(deleteSupportGuide)]);
  yield all([fork(deleteSupportGuideCategory)]);
  yield all([fork(checkedGuide)]);
  yield all([fork(getSupportFaqs)]);
  yield all([fork(addSupportFaqsSaga)]);
  yield all([fork(editSupportFaqsSaga)]);
  yield all([fork(deleteSupportFaqsSaga)]);
  yield all([fork(supportFaqsRearrangeSaga)]);
  yield all([fork(getSupportRepsSaga)]);
  yield all([fork(saveSupportRepsSaga)]);
  yield all([fork(desableSupportRepsSaga)]);
}
