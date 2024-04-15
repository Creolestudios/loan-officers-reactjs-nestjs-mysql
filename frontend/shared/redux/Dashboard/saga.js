import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import { getLODashboard } from '@iso/lib/services/LO/DashboardHome';
import actions from './action';

export function* getDashboard() {
  yield takeEvery(actions.DASHBOARD_DATA, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLODashboard);
      if (response.data.data) {
        yield put({
          type: actions.DASHBOARD_DATA_SUCCESS,
          list: response.data.data,
        });
      } else {
        yield put({ type: actions.DASHBOARD_DATA_ERROR });
      }
    } catch (error) {
      yield put({ type: actions.DASHBOARD_DATA_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getDashboard)]);
}
