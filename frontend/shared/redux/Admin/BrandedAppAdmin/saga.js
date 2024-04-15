import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAdminBrandedApp,
  getAdminBrandedAppByID,
  setAdminBrandedAppStatus,
  setAdminBrandedAppInfo,
  acceptAdminBrrandedApp,
  rejectAdminBrandedApp,
  getAdminBrandedAppInfo,
  getAdminBrandedAppClients,
  getAdminBrandedAppEmployees,
} from '@iso/lib/services/Admin/BrandedAppAdmin';
import actions from './action';
import { message, notification } from 'antd';
import { history } from '@iso/lib/helpers/history';

export function* getBrandedApp() {
  yield takeEvery(actions.GET_BRANDED_APP, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const page = payload.page;
      const search = payload.search;
      const size = payload.pagesize;
      const ex = payload.is_export;
      const sort_name = payload.sort_name;
      const sort_value = payload.sort_value;
      const sort = payload.sort_name ? true : false;
      const response = yield call(
        getAdminBrandedApp,
        page,
        size,
        search,
        ex,
        sort,
        sort_name,
        sort_value
      );

      if (payload.all) {
        yield put({
          type: actions.GET_BRANDED_APP_SUCCESS,
          list: response.data.data.mainResponse.BrandedAppRequest,
          pageCount: response.data.data.mainResponse.total_items,
        });
      } else {
        yield put({
          type: actions.GET_BRANDED_APP_SUCCESS,
          list: response.data.data.mainResponse.BrandedAppRequest,
          pageCount: response.data.data.mainResponse.total_items,
        });
      }
    } catch (error) {
      yield put({ type: actions.GET_BRANDED_APP_ERROR });
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getBrandedAppClients() {
  yield takeEvery(actions.GET_BRANDED_APP_CLIENTS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const page = payload.page;
      const search = payload.search;
      const size = payload.pagesize;
      const ex = payload.is_export;
      const sort_name = payload.sort_name;
      const sort_value = payload.sort_value;
      const sort = payload.sort_name ? true : false;
      const response = yield call(
        getAdminBrandedAppClients,
        page,
        size,
        search,
        ex,
        sort,
        sort_name,
        sort_value
      );

      if (payload.all) {
        yield put({
          type: actions.GET_BRANDED_APP_CLIENTS_SUCCESS,
          list: response.data.data.mainResponse.branded_app_users,
          pageCount: response.data.data.mainResponse.total_items,
        });
      } else {
        yield put({
          type: actions.GET_BRANDED_APP_CLIENTS_SUCCESS,
          list: response.data.data.mainResponse.branded_app_users,
          pageCount: response.data.data.mainResponse.total_items,
        });
      }
    } catch (error) {
      yield put({ type: actions.GET_BRANDED_APP_CLIENTS_ERROR });
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getBrandedAppEmployees() {
  yield takeEvery(actions.GET_BRANDED_APP_EMPLOYEES, function* ({
    payload,
    id,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const page = payload.page;
      const search = payload.search;
      const size = payload.pagesize;
      const ex = payload.is_export;
      const sort_name = payload.sort_name;
      const sort_value = payload.sort_value;
      const sort = payload.sort_name ? true : false;
      const response = yield call(
        getAdminBrandedAppEmployees,
        page,
        size,
        search,
        ex,
        sort,
        sort_name,
        sort_value,
        id
      );

      if (payload.all) {
        yield put({
          type: actions.GET_BRANDED_APP_EMPLOYEES_SUCCESS,
          list: response.data.data.mainResponse.employee_lo,
          pageCount: response.data.data.mainResponse.total_items,
        });
      } else {
        yield put({
          type: actions.GET_BRANDED_APP_EMPLOYEES_ERROR,
          list: response.data.data.mainResponse.employee_lo,
          pageCount: response.data.data.mainResponse.total_items,
        });
      }
    } catch (error) {
      yield put({ type: actions.GET_BRANDED_APP_EMPLOYEES_ERROR });
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getBrandedAppInfo() {
  yield takeEvery(actions.GET_BRANDED_APP_INFO, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminBrandedAppInfo);
      yield put({
        type: actions.GET_BRANDED_APP_INFO_SUCCESS,
        list: response.data.data.Branded_App_Info,
      });
    } catch (error) {
      yield put({ type: actions.GET_BRANDED_APP_INFO_ERROR });
      console.log(error);
      // message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getBrandedAppByID() {
  yield takeEvery(actions.GET_BRANDED_APP_BY_ID, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getAdminBrandedAppByID, payload);
      yield put({
        type: actions.GET_BRANDED_APP_BY_ID_SUCCESS,
        list: response.data.data.branded_App_Users,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_BRANDED_APP_BY_ID_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* acceptBrrandedApp() {
  yield takeEvery(actions.ACCEPT_POST_BRANDED_APP, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.newId;
      const edit = payload.edit;
      delete payload.page;
      delete payload.pagesize;
      const response = yield call(acceptAdminBrrandedApp, payload);
      if (response.data.status) {
        notification.success({
          message: edit
            ? 'Subscription Amount edit successfully'
            : 'Branded App request accepted successfully',
        });
        yield put({
          type: actions.REJECT_POST_BRANDED_APP_SUCCESS,
        });
        history.push(
          `/admin/dashboard/branded-apps/brand-app-accept-request/${id}`
        );
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ACCEPT_POST_BRANDED_APP_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* rejectBrandedApp() {
  yield takeEvery(actions.REJECT_POST_BRANDED_APP, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.newId;
      delete payload.newId;
      const response = yield call(rejectAdminBrandedApp, payload);
      if (response.data.status) {
        notification.success({
          message: 'Branded App request rejected successfully',
        });
        yield put({
          type: actions.REJECT_POST_BRANDED_APP_SUCCESS,
        });
        history.push(
          `/admin/dashboard/branded-apps/brand-app-accept-request/${id}`
        );
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.REJECT_POST_BRANDED_APP_ERROR });
      message.error('Please enter reason for rejection');
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* setBrandedAppInfo() {
  yield takeEvery(actions.POST_BRANDED_APP_INFO, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(setAdminBrandedAppInfo, payload);

      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.POST_BRANDED_APP_INFO_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.POST_BRANDED_APP_INFO_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* setBrandedAppStatus() {
  yield takeEvery(actions.POST_BRANDED_APP_STATUS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(setAdminBrandedAppStatus, payload);
      if (response.data.status) {
        notification.success({
          message: 'Branded App status changed successfully',
        });
        yield put({
          type: actions.POST_BRANDED_APP_STATUS_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.POST_BRANDED_APP_STATUS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getBrandedApp)]);
  yield all([fork(getBrandedAppClients)]);
  yield all([fork(getBrandedAppEmployees)]);
  yield all([fork(getBrandedAppByID)]);
  yield all([fork(acceptBrrandedApp)]);
  yield all([fork(rejectBrandedApp)]);
  yield all([fork(setBrandedAppInfo)]);
  yield all([fork(setBrandedAppStatus)]);
  yield all([fork(getBrandedAppInfo)]);
}
