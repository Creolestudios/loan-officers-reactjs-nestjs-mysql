import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAdminDiscount,
  viewAdminDiscount,
  addAdminDiscount,
  viewPromocode,
  editAdminDiscount,
  deleteAdminDiscount,
} from '@iso/lib/services/Admin/DiscountApi';
import actions from './action';
import { message, notification } from 'antd';
import { history } from '@iso/lib/helpers/history';

export function* getDiscounts() {
  yield takeEvery(actions.GET_DISCOUNT, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminDiscount);
      yield put({
        type: actions.GET_DISCOUNT_SUCCESS,
        list: response.data.data.discount_list,
      });
    } catch (error) {
      yield put({ type: actions.GET_DISCOUNT_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* viewCoupons() {
  yield takeEvery(actions.VIEW_COUPONS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(viewAdminDiscount, payload);
      if (response.data.status) {
        yield put({
          type: actions.VIEW_COUPONS_SUCCESS,
          list: response.data.data.promoCodeDetails,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.VIEW_COUPONS_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addDisounts() {
  yield takeEvery(actions.ADD_GET_DISCOUNT, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addAdminDiscount, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.ADD_GET_DISCOUNT_SUCCESS,
        });
        history.push(`/admin/dashboard/discounts`);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADD_GET_DISCOUNT_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteDisounts() {
  yield takeEvery(actions.DELETE_DISCOUNT_CODE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteAdminDiscount, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
          id: response.data.data.id,
        });
        yield put({
          type: actions.DELETE_DISCOUNT_CODE_SUCCESS,
          id: response.data.data.id,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_DISCOUNT_CODE_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editDisounts() {
  yield takeEvery(actions.EDIT_DISCOUNT_CODE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(editAdminDiscount, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.EDIT_DISCOUNT_CODE_SUCCESS,
        });
        history.push(`/admin/dashboard/discounts`);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_DISCOUNT_CODE_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* viewPromoCode() {
  yield takeEvery(actions.VIEW_PROMO_CODE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(viewPromocode, payload);
      if (response.data.status) {
        yield put({
          type: actions.VIEW_PROMO_CODE_SUCCESS,
          list: response.data.data.discount_list,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.VIEW_PROMO_CODE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getDiscounts)]);
  yield all([fork(viewCoupons)]);
  yield all([fork(addDisounts)]);
  yield all([fork(viewPromoCode)]);
  yield all([fork(editDisounts)]);
  yield all([fork(deleteDisounts)]);
}
