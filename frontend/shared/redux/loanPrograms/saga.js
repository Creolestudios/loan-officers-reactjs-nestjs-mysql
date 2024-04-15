import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOLoanProgramList,
  saveLOLoanProgram,
  deleteLOLoanProgram,
  defaultLOLoanProgram,
  editLOLoanProgram,
  rearrangeLOLoanProgram,
} from '@iso/lib/services/LO/LoanProgramContent';
import actions from './action';
import { message, notification } from 'antd';

export function* getLoanProgramList() {
  yield takeEvery(actions.CONTENT_LO_LOAN_PROGRAM, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const page = payload ? payload.page : 1;
      const pageSize = payload ? payload.pageSize : 10;
      const response = yield call(getLOLoanProgramList, page, pageSize);
      yield put({
        type: actions.CONTENT_LO_LOAN_PROGRAM_SUCCESS,
        list: response.data.data.items,
        pageCount: response.data.data.total_items,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.CONTENT_LO_LOAN_PROGRAM_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* loanProgramRearrangeSaga() {
  yield takeEvery(actions.REARRANGE_LOAN_PROGRAM, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(rearrangeLOLoanProgram, payload);
      if (response.data.status) {
        yield put({
          type: actions.CONTENT_LO_LOAN_PROGRAM,
        });
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* defaultLoanProgramList() {
  yield takeEvery(actions.DEFAULT_CONTENT_LO_LOAN_PROGRAM, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(defaultLOLoanProgram);
      if (response.data.status) {
        yield put({
          type: actions.DEFAULT_CONTENT_LO_LOAN_PROGRAM_SUCCESS,
        });
        yield put({
          type: actions.CONTENT_LO_LOAN_PROGRAM,
        });
      } else {
        yield put({
          type: actions.DEFAULT_CONTENT_LO_LOAN_PROGRAM_ERROR,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DEFAULT_CONTENT_LO_LOAN_PROGRAM_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveLoanProgramList() {
  yield takeEvery(actions.SAVE_CONTENT_LO_LOAN_PROGRAM, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveLOLoanProgram, payload);
      if (response.data.status) {
        notification.success({
          message: 'Loan program added successfully',
        });
        yield put({
          type: actions.SAVE_CONTENT_LO_LOAN_PROGRAM_SUCCESS,
          list: response.data.data,
        });
        yield put({
          type: actions.CONTENT_LO_LOAN_PROGRAM,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_CONTENT_LO_LOAN_PROGRAM_ERROR });
      // message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editLoanProgram() {
  yield takeEvery(actions.EDIT_CONTENT_LO_LOAN_PROGRAM, function* ({
    payload,
  }) {
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
          type: actions.EDIT_CONTENT_LO_LOAN_PROGRAM_SUCCESS,
          list: response.data.data,
          index: index,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_CONTENT_LO_LOAN_PROGRAM_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteLoanProgram() {
  yield takeEvery(actions.DELETE_CONTENT_LO_LOAN_PROGRAM, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteLOLoanProgram, payload);
      if (response.data.status) {
        notification.success({
          message: 'Loan program deleted successfully',
        });
        yield put({
          type: actions.DELETE_CONTENT_LO_LOAN_PROGRAM_SUCCESS,
          id: response.data.data.id,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_CONTENT_LO_LOAN_PROGRAM_ERROR });
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
  yield all([fork(loanProgramRearrangeSaga)]);
}
