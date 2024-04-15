import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import authActions from '@iso/redux/app/actions';
import {
  getAdminUsersLODetailes,
  getAdminUserDefaultData,
  getAdminUsersLO,
  AdminDisable,
} from '@iso/lib/services/Admin/UsersLO';
import actions from './action';
import { message, notification } from 'antd';

export function* getUsersLO() {
  yield takeEvery(actions.GET_USERS_LO, function* ({ payload }) {
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
        getAdminUsersLO,
        page,
        search,
        size,
        ex,
        sort,
        sort_name,
        sort_value
      );
      if (payload.all) {
        yield put({
          type: actions.GET_USERS_LO_SUCCESS,
          list: response.data.data.mainResponse.loanOfficer_list,
          pageCount: response.data.data.mainResponse.total_items,
        });
      } else if (ex) {
        yield put({
          type: actions.GET_USERS_LO_EXPORT_SUCCESS,
          list: response.data.data.mainResponse.loanOfficer_list,
        });
      } else {
        yield put({
          type: actions.GET_USERS_LO_SUCCESS,
          list: response.data.data.mainResponse.loanOfficer_list,
          pageCount: response.data.data.mainResponse.total_items,
        });
      }
    } catch (error) {
      yield put({ type: actions.GET_USERS_LO_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* disableUsersLO() {
  yield takeEvery(actions.ADMIN_USERS_LO_DISABLE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(AdminDisable, payload);
      const id = payload.id;
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        const responseTwo = yield call(getAdminUsersLODetailes, id);
        yield put({
          type: actions.USERS_LO_DETAILS_SUCCESS,
          list: responseTwo.data.data.User_details,
        });

        yield put({
          type: actions.ADMIN_USERS_LO_DISABLE_SUCCESS,
        });
      }
    } catch (error) {
      yield put({ type: actions.ADMIN_USERS_LO_DISABLE_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getUsersLoDetailes() {
  yield takeEvery(actions.USERS_LO_DETAILS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;
      const response = yield call(getAdminUsersLODetailes, id);
      yield put({
        type: actions.USERS_LO_DETAILS_SUCCESS,
        list: response.data.data.User_details,
      });
    } catch (error) {
      yield put({ type: actions.USERS_LO_DETAILS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getDefaultData() {
  yield takeEvery(actions.GET_DEFAULT_DATA, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getAdminUserDefaultData, payload);
      yield put({
        type: actions.GET_DEFAULT_DATA_SUCCESS,
        list: response.data.data.Defaults_list,
      });
    } catch (error) {
      yield put({ type: actions.GET_DEFAULT_DATA_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getUsersLoDetailes)]);
  yield all([fork(getDefaultData)]);
  yield all([fork(getUsersLO)]);
  yield all([fork(disableUsersLO)]);
}
