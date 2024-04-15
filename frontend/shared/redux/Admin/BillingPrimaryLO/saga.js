import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { history } from '@iso/lib/helpers/history';
import { notification, message } from 'antd';

import authActions from '@iso/redux/app/actions';
import {
  getAdminPrimaryLOUsers,
  getAdminPriaryLOUsersDetailes,
  addAdminPriaryLONote,
  addAdminPriaryLOCredits,
  getAdminTransactionLOUsers,
  editAdminPriaryLONote,
  editAdminPriaryLOCredits,
  deleteAdminPriaryLOCredits,
  deleteAdminPriaryLONotes,
} from '@iso/lib/services/Admin/BillingPrimaryLOAdmin';
import actions from './action';

export function* getPrimaryUsers() {
  yield takeEvery(actions.BILLING_LO_USERS, function* ({ payload }) {
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
        getAdminPrimaryLOUsers,
        page,
        search,
        size,
        ex,
        payload.employee,
        sort,
        sort_name,
        sort_value
      );
      if (payload.all) {
        yield put({
          type: actions.BILLING_LO_USERS_SUCCESS,
          list: response.data.data.mainResponse.loanOfficer_list,
          pageCount: response.data.data.mainResponse.total_items,
        });
      } else if (ex) {
        yield put({
          type: actions.BILLING_LO_USERS_EXPORT_SUCCESS,
          list: response.data.data.items,
        });
      } else {
        yield put({
          type: actions.BILLING_LO_USERS_SUCCESS,
          list: response.data.data.mainResponse.loanOfficer_list,
          pageCount: response.data.data.mainResponse.total_items,
        });
      }
    } catch (error) {
      yield put({ type: actions.BILLING_LO_USERS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getPrimaryUsersDetailes() {
  yield takeEvery(actions.BILLING_LO_USERS_DETAILS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;

      const response = yield call(
        getAdminPriaryLOUsersDetailes,
        id,
        payload?.employee ?? false
      );

      yield put({
        type: actions.BILLING_LO_USERS_DETAILS_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.BILLING_LO_USERS_DETAILS_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getTransactionUsersSaga() {
  yield takeEvery(actions.BILLING_USERS_TRANSACTIONS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;
      const page = payload.page;
      const size = payload.pagesize;
      const response = yield call(getAdminTransactionLOUsers, id, page, size);

      yield put({
        type: actions.BILLING_USERS_TRANSACTIONS_SUCCESS,
        list: response.data.data.mainResponse.Transactions,
        pageCount: response.data.data.mainResponse.total_items,
      });
    } catch (error) {
      yield put({ type: actions.BILLING_USERS_TRANSACTIONS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addNotesSaga() {
  yield takeEvery(actions.BILLING_LO_USER_ADD_NOTE, function* ({
    payload,
    id,
    employeeOrNot,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addAdminPriaryLONote, id, payload);
      if (response?.data?.status) {
        notification.success({
          message:
            response?.data?.data?.message ?? 'Notes added successfully !!',
        });

        if (employeeOrNot === 'employee') {
          history.push(`/admin/dashboard/billing/employee/${id}`);
        } else {
          history.push(`/admin/dashboard/billing/primary-lo/${id}`);
        }
      }
    } catch (error) {}
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addCreditsSaga() {
  yield takeEvery(actions.BILLING_LO_USER_ADD_CREDITS, function* ({
    payload,
    id,
    employeeOrNot,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addAdminPriaryLOCredits, id, payload);

      if (response?.data?.status) {
        notification.success({
          message:
            response?.data?.data?.message ?? 'Credits added successfully !!',
        });

        if (employeeOrNot === 'employee') {
          history.push(`/admin/dashboard/billing/employee/${id}`);
        } else {
          history.push(`/admin/dashboard/billing/primary-lo/${id}`);
        }
      }
    } catch (error) {}
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editNotesSaga() {
  yield takeEvery(actions.BILLING_LO_USER_EDIT_NOTE, function* ({
    payload,
    id,
    employeeOrNot,
    rediretId,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(
        editAdminPriaryLONote,
        id,
        payload,
        rediretId
      );
      if (response?.data?.status) {
        notification.success({
          message:
            response?.data?.data?.message ?? 'Notes added successfully !!',
        });

        if (employeeOrNot === 'employee') {
          history.push(`/admin/dashboard/billing/employee/${rediretId}`);
        } else {
          history.push(`/admin/dashboard/billing/primary-lo/${rediretId}`);
        }
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editCreditsSaga() {
  yield takeEvery(actions.BILLING_LO_USER_EDIT_CREDITS, function* ({
    payload,
    id,
    employeeOrNot,

    rediretId,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(editAdminPriaryLOCredits, id, payload);

      if (response?.data?.status) {
        notification.success({
          message:
            response?.data?.data?.message ?? 'Credits added successfully !!',
        });

        if (employeeOrNot === 'employee') {
          history.push(`/admin/dashboard/billing/employee/${rediretId}`);
        } else {
          history.push(`/admin/dashboard/billing/primary-lo/${rediretId}`);
        }
      }
    } catch (error) {}
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteNotesSaga() {
  yield takeEvery(actions.BILLING_LO_USER_DELETE_NOTE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;
      const response = yield call(
        deleteAdminPriaryLONotes,
        id,
        payload.del_user_id
      );
      if (response?.data?.status) {
        notification.success({
          message: response?.data?.data?.message,
        });
        yield put({
          type: actions.BILLING_LO_USER_DELETE_NOTE_SUCCESS,
          id: id,
        });
      }
    } catch (error) {
      yield put({ type: actions.BILLING_LO_USER_DELETE_NOTE_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* deleteCreditsSaga() {
  yield takeEvery(actions.BILLING_LO_USER_DELETE_CREDITS, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;

      const response = yield call(deleteAdminPriaryLOCredits, id);
      if (response?.data?.status) {
        notification.success({
          message: response?.data?.data?.message,
        });

        yield put({
          type: actions.BILLING_LO_USER_DELETE_CREDITS_SUCCESS,
          id: id,
        });
      }
    } catch (error) {
      yield put({ type: actions.BILLING_LO_USER_DELETE_CREDITS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getPrimaryUsers)]);
  yield all([fork(getPrimaryUsersDetailes)]);
  yield all([fork(getTransactionUsersSaga)]);
  yield all([fork(addNotesSaga)]);
  yield all([fork(addCreditsSaga)]);

  yield all([fork(editNotesSaga)]);
  yield all([fork(editCreditsSaga)]);
  yield all([fork(deleteNotesSaga)]);
  yield all([fork(deleteCreditsSaga)]);
}
