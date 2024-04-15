import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAdminDashboardTotalUser,
  getAdminDashboardNewAccount,
  getAdminDashboardRecentActivity,
  getAdminDashboardAppInstalltion,
} from '@iso/lib/services/Admin/AdminDashboardHome';
import actions from './action';

export function* getDashboardTotalUserSaga() {
  yield takeEvery(actions.DASHBOARD_TOTAL_USER, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;
      const response = yield call(getAdminDashboardTotalUser, id);
      if (response.data.data) {
        yield put({
          type: actions.DASHBOARD_TOTAL_USER_SUCCESS,
          list: response.data.data,
        });
      } else {
        yield put({ type: actions.DASHBOARD_TOTAL_USER_ERROR });
      }
    } catch (error) {
      yield put({ type: actions.DASHBOARD_TOTAL_USER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* getDashboardNewAccountSaga() {
  yield takeEvery(actions.DASHBOARD_NEW_ACCOUNTS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;
      const startDate = payload.start_date;
      const endDate = payload.end_date;
      const response = yield call(
        getAdminDashboardNewAccount,
        id,
        startDate,
        endDate
      );
      if (response.data.data) {
        yield put({
          type: actions.DASHBOARD_NEW_ACCOUNTS_SUCCESS,
          list: response.data.data,
        });
      } else {
        yield put({ type: actions.DASHBOARD_NEW_ACCOUNTS_ERROR });
      }
    } catch (error) {
      yield put({ type: actions.DASHBOARD_NEW_ACCOUNTS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* getDashboardRecentActivitySaga() {
  yield takeEvery(actions.DASHBOARD_RECENT_ACTIVITY, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminDashboardRecentActivity);

      if (response.data.data) {
        yield put({
          type: actions.DASHBOARD_RECENT_ACTIVITY_SUCCESS,
          list: response.data.data,
        });
      } else {
        yield put({ type: actions.DASHBOARD_RECENT_ACTIVITY_ERROR });
      }
    } catch (error) {}
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* getDashboardAppInstalltionSaga() {
  yield takeEvery(actions.DASHBOARD_APP_INSTALLTION, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminDashboardAppInstalltion);

      if (response.data.data) {
        yield put({
          type: actions.DASHBOARD_APP_INSTALLTION_SUCCESS,
          list: response.data.data,
        });
      }
    } catch (error) {}
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getDashboardTotalUserSaga)]);
  yield all([fork(getDashboardNewAccountSaga)]);
  yield all([fork(getDashboardRecentActivitySaga)]);
  yield all([fork(getDashboardAppInstalltionSaga)]);
}
