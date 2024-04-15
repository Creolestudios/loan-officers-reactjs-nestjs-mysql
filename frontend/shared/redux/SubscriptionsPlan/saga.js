import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getLOSubscription,
  cancelLOSubscription,
  subscribePlanLO,
  getLOSupportapi,
  getLOSubscriptionPlanapi,
  getLOSupportGuideapi,
  SubscriptionLOApplyPromoCode,
  getSubscriptionLOApplyPromoCode,
} from '@iso/lib/services/LO/SubscriptionsPlan';
import { history } from '@iso/lib/helpers/history';

import actions from './action';
import { message, notification } from 'antd';

export function* getSubscription() {
  yield takeEvery(actions.LO_SUBSCRIPTION, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOSubscription);
      if (response.data.status) {
        yield put({
          type: actions.LO_SUBSCRIPTION_SUCCESS,
          list: response.data.data.Subscription_list,
          BApp: response.data.data.branded_app_apply,
          status: true,
        });
        if (!response.data.data.Subscription_list) {
          history.push(`/portal/dashboard/subscription/subscribe`);
        }
      } else {
        yield put({ type: actions.LO_SUBSCRIPTION_ERROR });
      }
    } catch (error) {
      if (error.response.status !== 401) {
        history.push(`/portal/dashboard/subscription/subscribe`);
      }
      yield put({ type: actions.LO_SUBSCRIPTION_ERROR, status: false });
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* cancelSubscription() {
  yield takeEvery(actions.CANCEL_LO_SUBSCRIPTION, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(cancelLOSubscription);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.CANCEL_LO_SUBSCRIPTION_SUCCESS,
        });
        yield put({
          type: actions.LO_SUBSCRIPTION,
        });
      } else {
        yield put({ type: actions.CANCEL_LO_SUBSCRIPTION_ERROR });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.CANCEL_LO_SUBSCRIPTION_ERROR });

      notification.success({
        message: error.response.data.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getApplyPromoCodeSagas() {
  yield takeEvery(actions.GET_SUBSCRIPTION_APPLY_PROMO_CODE, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getSubscriptionLOApplyPromoCode);
      if (response.data.status) {
        yield put({
          type: actions.GET_SUBSCRIPTION_APPLY_PROMO_CODE_SUCCESS,
          list: response.data.data.futureCodes,
        });
      }
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* subscribePlan() {
  yield takeEvery(actions.LO_SUBSCRIBE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(subscribePlanLO, payload);
      if (response.data.status) {
        notification.success({
          message: 'Subscription Successful',
        });
        yield put({
          type: actions.LO_SUBSCRIBE_SUCCESS,
          Customer_ID: response.data.data.customer_id,
        });
        history.push(`/portal/dashboard/subscription`);
      } else {
        yield put({ type: actions.LO_SUBSCRIBE_ERROR });
      }
    } catch (error) {
      message.error(error.response.data.message);

      yield put({ type: actions.LO_SUBSCRIBE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getSubscriptionPlansSaga() {
  yield takeEvery(actions.LO_ALL_PLAN_SUBSCRIPTION, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOSubscriptionPlanapi);
      if (response.data.status) {
        yield put({
          type: actions.LO_ALL_PLAN_SUBSCRIPTION_SUCCESS,
          list: response.data.data.subscription_plans,
          status: true,
        });
      } else {
        yield put({ type: actions.LO_ALL_PLAN_SUBSCRIPTION_ERROR });
      }
    } catch (error) {
      yield put({
        type: actions.LO_ALL_PLAN_SUBSCRIPTION_ERROR,
        status: false,
      });
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getLOSupportFaqsSage() {
  yield takeEvery(actions.LO_SUPPORT_FAQS, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOSupportapi);
      if (response.data.status) {
        yield put({
          type: actions.LO_SUPPORT_FAQS_SUCCESS,
          list: response.data.data.faqs_list,
        });
      } else {
        yield put({ type: actions.LO_SUPPORT_FAQS_ERROR });
      }
    } catch (error) {
      yield put({ type: actions.LO_SUPPORT_FAQS_ERROR });
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getLOSupportGuideSaga() {
  yield takeEvery(actions.LO_SUPPORT_GUIDE, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOSupportGuideapi);
      if (response.data.status) {
        yield put({
          type: actions.LO_SUPPORT_GUIDE_SUCCESS,
          list: response.data.data.guide_list,
        });
      } else {
        yield put({ type: actions.LO_SUPPORT_GUIDE_ERROR });
      }
    } catch (error) {
      yield put({ type: actions.LO_SUPPORT_GUIDE_ERROR });
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* applyPromoCodeSagas() {
  yield takeEvery(actions.LO_SUBSCRIPTION_APPLY_PROMO_CODE, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(SubscriptionLOApplyPromoCode, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.LO_SUBSCRIPTION_APPLY_PROMO_CODE_SUCCESS,
        });
        yield put({
          type: actions.GET_SUBSCRIPTION_APPLY_PROMO_CODE,
        });
        // history.push(`/portal/dashboard/subscription`);
      } else {
        yield put({ type: actions.LO_SUBSCRIPTION_APPLY_PROMO_CODE_ERROR });
      }
    } catch (error) {
      message.error(error.response.data.message);

      yield put({ type: actions.LO_SUBSCRIPTION_APPLY_PROMO_CODE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export default function* rootSaga() {
  yield all([fork(getSubscription)]);
  yield all([fork(cancelSubscription)]);
  yield all([fork(subscribePlan)]);
  yield all([fork(getSubscriptionPlansSaga)]);
  yield all([fork(getLOSupportFaqsSage)]);
  yield all([fork(getLOSupportGuideSaga)]);
  yield all([fork(applyPromoCodeSagas)]);
  yield all([fork(getApplyPromoCodeSagas)]);
}
