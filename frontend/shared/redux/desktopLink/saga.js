import actions from './action';
import authActions from '@iso/redux/app/actions';
import profileAction from '@iso/redux/auth/actions';
import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { addWebLink } from '@iso/lib/services/LO/desktopLink';

export function* addDesktopLink() {
  yield takeEvery(actions.WEB_LINK, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addWebLink, payload);
      if (response) {
        yield all([
          put({
            type: actions.WEB_LINK_SUCCESS,
            payload: response.data.data.message,
          }),
          put({
            type: profileAction.GET_PROFILE,
          }),
        ]);
      } else {
        yield put({
          type: actions.WEB_LINK_ERROR,
          payload: response.data.data.message,
        });
      }
    } catch (error) {
      yield put({
        type: actions.WEB_LINK_ERROR,
        payload: error,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(addDesktopLink)]);
}
