import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import { getLODocuments } from '@iso/lib/services/LO/documentsActivity';
import actions from './action';

export function* getDocuments() {
  yield takeEvery(actions.ACTIVITY_DOCUMENTS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const page = payload.page;
      const search = payload.search;
      const size = payload.pagesize;
      const response = yield call(getLODocuments, page, search, size);
      if (response?.data?.status) {
        yield put({
          type: actions.ACTIVITY_DOCUMENTS_SUCCESS,
          list: response.data.data.items,
          pageCount: response.data.data.total_items,
        });
      }
    } catch (error) {
      yield put({ type: actions.ACTIVITY_DOCUMENTS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getDocuments)]);
}
