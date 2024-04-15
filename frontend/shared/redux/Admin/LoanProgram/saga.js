import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAdminLoanProgramList,
  saveLOLoanProgram,
  deleteLOLoanProgram,
  defaultLOLoanProgram,
  editLOLoanProgram,
} from '@iso/lib/services/Admin/LoanProgramAppDefault';
import actions from './action';
import { history } from '@iso/lib/helpers/history';
import { message, notification } from 'antd';

export function* getLoanProgramList() {
  yield takeEvery(actions.APP_DEF_LOAN_PROGRAM, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const page = payload.page;
      const pageSize = payload.pageSize;

      const response = yield call(getAdminLoanProgramList, page, pageSize);
      yield put({
        type: actions.APP_DEF_LOAN_PROGRAM_SUCCESS,
        list: response.data.data.items,
        pageCount: response.data.data.total_items,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_DEF_LOAN_PROGRAM_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* defaultLoanProgramList() {
  yield takeEvery(actions.DEFAULT_APP_DEF_LOAN_PROGRAM, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(defaultLOLoanProgram);
      if (response.data.status && Object.keys(response.data.data).length) {
        yield put({
          type: actions.DEFAULT_APP_DEF_LOAN_PROGRAM_SUCCESS,
          list: response.data,
        });
      } else {
        yield put({
          type: actions.DEFAULT_APP_DEF_LOAN_PROGRAM_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DEFAULT_APP_DEF_LOAN_PROGRAM_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveLoanProgramList() {
  yield takeEvery(actions.SAVE_APP_DEF_LOAN_PROGRAM, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveLOLoanProgram, payload);
      if (response.data.status) {
        notification.success({
          message: 'Loan program added successfully',
        });
        yield put({
          type: actions.SAVE_APP_DEF_LOAN_PROGRAM_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.APP_DEF_LOAN_PROGRAM,
          payload: {
            page: 1,
            pageSize: 10,
          },
        });
        history.push(`/admin/dashboard/app-default/loan-programs`);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_APP_DEF_LOAN_PROGRAM_ERROR });
      // message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editLoanProgram() {
  yield takeEvery(actions.EDIT_APP_DEF_LOAN_PROGRAM, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const index = payload.index;
      delete payload.index;
      const response = yield call(editLOLoanProgram, payload);
      if (response.data.status) {
        notification.success({
          message: 'Loan program updated successfully',
        });
        yield put({
          type: actions.EDIT_APP_DEF_LOAN_PROGRAM_SUCCESS,
          list: response.data.data,
          index: index,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_APP_DEF_LOAN_PROGRAM_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteLoanProgram() {
  yield takeEvery(actions.DELETE_APP_DEF_LOAN_PROGRAM, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteLOLoanProgram, payload);
      if (response.data.status) {
        notification.success({
          message: 'Loan program deleted successfully',
        });
        yield put({
          type: actions.DELETE_APP_DEF_LOAN_PROGRAM_SUCCESS,
          id: response.data.data.id,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_APP_DEF_LOAN_PROGRAM_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getLoanProgramList)]);
  yield all([fork(saveLoanProgramList)]);
  yield all([fork(defaultLoanProgramList)]);
  yield all([fork(editLoanProgram)]);
  yield all([fork(deleteLoanProgram)]);
}
