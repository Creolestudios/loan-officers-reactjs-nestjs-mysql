import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import authActions from '@iso/redux/app/actions';
import {
  getAdminUsersBorrower,
  getAdminUserDetailBorrower,
} from '@iso/lib/services/Admin/UsersBorrower';
import actions from './action';

export function* getUsersBorrowers() {
  yield takeEvery(actions.GET_USERS_BORROWER, function* ({ payload }) {
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
        getAdminUsersBorrower,
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
          type: actions.GET_USERS_BORROWER_SUCCESS,
          list: response.data.data.borrower_list,
          pageCount: response.data.data.total_items,
        });
      } else if (ex) {
        yield put({
          type: actions.GET_USERS_BORROWER_EXPORT_SUCCESS,
          list: response.data.data.items,
        });
      } else {
        yield put({
          type: actions.GET_USERS_BORROWER_SUCCESS,
          list: response.data.data.borrower_list,
          pageCount: response.data.data.total_items,
        });
      }
    } catch (error) {
      yield put({ type: actions.GET_USERS_BORROWER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getUsersDetailes() {
  yield takeEvery(actions.ADMIN_ACTIVITY_USERS_DETAILES, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getAdminUserDetailBorrower, payload);

      yield put({
        type: actions.ADMIN_ACTIVITY_USERS_DETAILES_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.ADMIN_ACTIVITY_USERS_DETAILES_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getUsersBorrowers)]);
  yield all([fork(getUsersDetailes)]);
}
