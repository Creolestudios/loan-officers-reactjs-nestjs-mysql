import { all, takeEvery, put, fork, call, delay } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOCoBranding,
  addLOCoBranding,
  deleteLOCoBranding,
  editLOCoBranding,
  getLOCoBrandingByID,
  shareLOAppLink,
} from '@iso/lib/services/LO/CoBrand';
import actions from './action';
import { message, notification } from 'antd';

export function* getCobranding() {
  yield takeEvery(actions.LO_CO_BRANDING, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const page = payload.page;
      const size = payload.pagesize;
      const id = payload.id;
      const ex = payload.is_export;

      const response = yield call(getLOCoBranding, page, size, ex);
      yield put({
        type: actions.LO_CO_BRANDING_SUCCESS,
        list: response.data.data.mainResponse.loanOfficer_list,
        pageCount: response.data.data.mainResponse.total_items,
        total: response.data.data.mainResponse.page_count,
      });
    } catch (error) {
      yield put({ type: actions.LO_CO_BRANDING_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* ShareAppLinkSagas() {
  yield takeEvery(actions.SHARE_APP_LINK, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(shareLOAppLink, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.message,
        });
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getCobrandingById() {
  yield takeEvery(actions.LO_CO_BRANDING_BY_ID, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;
      const response = yield call(getLOCoBrandingByID, id);

      yield put({
        type: actions.LO_CO_BRANDING_BY_ID_SUCCESS,
        list: response.data.data.mainResponse.loanOfficer_list[0],
      });
    } catch (error) {
      yield put({ type: actions.LO_CO_BRANDING_BY_ID_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addCobranding() {
  yield takeEvery(actions.ADD_LO_CO_BRANDING, function* ({ payload, edit }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;
      const edits = edit;
      const response = yield call(addLOCoBranding, payload);
      if (response.data.status) {
        payload.email &&
          notification.success({
            message: response.data.message,
          });
        if (edits !== 1) {
          yield put({
            type: actions.LO_CO_BRANDING_BY_ID,
            payload: {
              id,
            },
          });
        }
        yield put({
          type: actions.ADD_LO_CO_BRANDING_SUCCESS,
          list: response.data.data.mainResponse.loanOfficer_list,
          errorS: '',
        });
      }
    } catch (error) {
      yield put({
        type: actions.ADD_LO_CO_BRANDING_ERROR,
        errorS: error.response && error.response.data.message,
      });
      error.response &&
        message.error(error.response && error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editCobranding() {
  yield takeEvery(actions.EDIT_LO_CO_BRANDING, function* ({ payload, id }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(editLOCoBranding, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.messgae,
        });
        yield put({
          type: actions.EDIT_LO_CO_BRANDING_SUCCESS,
        });

        yield delay(1000);
        yield put({
          type: actions.LO_CO_BRANDING_BY_ID,
          payload: {
            id,
          },
        });
      }
    } catch (error) {
      yield put({
        type: actions.EDIT_LO_CO_BRANDING_ERROR,
      });
      error.response &&
        message.error(error.response && error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteCobranding() {
  yield takeEvery(actions.DELETE_LO_CO_BRANDING, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteLOCoBranding, payload);
      if (response.data.status) {
        notification.success({
          message: 'Co-branding officer deleted successfully',
        });
      }
    } catch (error) {
      yield put({
        type: actions.DELETE_LO_CO_BRANDING_ERROR,
      });
      error.response &&
        message.error(error.response && error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(addCobranding)]);
  yield all([fork(getCobranding)]);
  yield all([fork(editCobranding)]);
  yield all([fork(deleteCobranding)]);
  yield all([fork(getCobrandingById)]);
  yield all([fork(ShareAppLinkSagas)]);
}
