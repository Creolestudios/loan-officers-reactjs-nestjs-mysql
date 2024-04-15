import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import { getLOCallbackRequest } from '@iso/lib/services/LO/CallbackRequestActivity';
import actions from './action';

export function* getCallbackRequest() {
  yield takeEvery(actions.ACTIVITY_CALLBACK_REQUEST, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const page = payload.page;
      const search = payload.search;
      const size = payload.pagesize;
      const response = yield call(getLOCallbackRequest, page, search, size);
      if (response.data.data.items.length) {
        yield put({
          type: actions.ACTIVITY_CALLBACK_REQUEST_SUCCESS,
          list: response.data.data.items,
          pageCount: response.data.data.total_items,
        });
      } else {
        yield put({ type: actions.ACTIVITY_CALLBACK_REQUEST_ERROR });
      }
    } catch (error) {
      yield put({ type: actions.ACTIVITY_CALLBACK_REQUEST_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getCallbackRequest)]);
}
