import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getTypesValues,
  editTypesValues,
  saveDisclaimer,
} from '@iso/lib/services/Admin/calculatorTypes';
import actions from './action';

export function* editTypesData() {
  yield takeEvery(actions.EDIT_CALCULATOR_TYPES_ADMIN, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(editTypesValues, payload);

      if (response.data.status) {
        yield put({
          type: actions.EDIT_CALCULATOR_TYPES_ADMIN_SUCCESS,
        });
      }
    } catch (error) {
      yield put({ type: actions.EDIT_CALCULATOR_TYPES_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveDisclaimerData() {
  yield takeEvery(actions.CALCULATOR_TYPES_ADMIN, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      yield call(saveDisclaimer, payload);
    } catch (error) {
      yield put({ type: actions.CALCULATOR_TYPES_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  //   yield all([fork(getTypesData)]);
  yield all([fork(editTypesData)]);
  yield all([fork(saveDisclaimerData)]);
}
