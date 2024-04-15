import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOColorSchema,
  updateLOColorSchema,
} from '@iso/lib/services/LO/ColorSchemaAppSetting';
import actions from './action';
import { message, notification } from 'antd';

export function* getColorSchema() {
  yield takeEvery(actions.LO_COLOR_SCHEMA, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLOColorSchema);
      yield put({
        type: actions.LO_COLOR_SCHEMA_SUCCESS,
        list: response.data.data,
      });
    } catch (error) {
      yield put({ type: actions.LO_COLOR_SCHEMA_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* updateColorSchema() {
  yield takeEvery(actions.UPDATE_LO_COLOR_SCHEMA, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(updateLOColorSchema, payload);
      if (response.data.status) {
        notification.success({
          message: 'Color Scheme update successfully',
        });
        yield put({
          type: actions.UPDATE_LO_COLOR_SCHEMA_SUCCESS,
          list: response.data.data,
        });
      }
    } catch (error) {
      yield put({ type: actions.UPDATE_LO_COLOR_SCHEMA_ERROR });
      message.error(error.response && error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getColorSchema)]);
  yield all([fork(updateColorSchema)]);
}
