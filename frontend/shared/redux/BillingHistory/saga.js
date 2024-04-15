import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import { getLOBillingHistory } from '@iso/lib/services/LO/MainBillingHistory';
import actions from './action';

export function* getBillingHistory() {
  yield takeEvery(actions.LO_BILLING_HISTORY, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOBillingHistory, payload);

      if (response.data.data.Billing_History) {
        yield put({
          type: actions.LO_BILLING_HISTORY_SUCCESS,
          list: response.data.data.Billing_History,
        });
      } else {
        yield put({ type: actions.LO_BILLING_HISTORY_ERROR });
      }
    } catch (error) {
      yield put({ type: actions.LO_BILLING_HISTORY_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getBillingHistory)]);
}
