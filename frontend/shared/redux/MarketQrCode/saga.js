import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import { getLOMarketQRCode } from '@iso/lib/services/LO/marketQrCodes';
import actions from './action';

export function* getMarketQRCode() {
  yield takeEvery(actions.MARKETING_QRCODE, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOMarketQRCode);
      yield put({
        type: actions.MARKETING_QRCODE_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.MARKETING_QRCODE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getMarketQRCode)]);
}
