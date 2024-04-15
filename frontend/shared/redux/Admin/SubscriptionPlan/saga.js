import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  getAdminSubscriptionPlan,
  saveAdminSubscriptionPlan,
  deleteAdminSubscriptionPlan,
  viewAdminSubscriptionPlan,
  editAdminSubscriptionPlan,
} from '@iso/lib/services/Admin/SubscriptionPlans';
import { message, notification } from 'antd';
import { history } from '@iso/lib/helpers/history';

import actions from './action';

export function* getSubscriptionPlanList() {
  yield takeEvery(actions.ADMIN_SUBSCRIPTION_PLAN, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getAdminSubscriptionPlan);
      yield put({
        type: actions.ADMIN_SUBSCRIPTION_PLAN_SUCCESS,
        list: response.data.data.subscriptionPlan,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADMIN_SUBSCRIPTION_PLAN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* viewSubscriptionPlanList() {
  yield takeEvery(actions.VIEW_ADMIN_SUBSCRIPTION_PLAN, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(viewAdminSubscriptionPlan, payload);
      if (response.data.status && Object.keys(response.data.data).length) {
        yield put({
          type: actions.VIEW_ADMIN_SUBSCRIPTION_PLAN_SUCCESS,
          list: response.data.data.subscriptionPlan,
        });
      } else {
        yield put({
          type: actions.VIEW_ADMIN_SUBSCRIPTION_PLAN_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.VIEW_ADMIN_SUBSCRIPTION_PLAN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveSubscriptionPlanList() {
  yield takeEvery(actions.SAVE_ADMIN_SUBSCRIPTION_PLAN, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveAdminSubscriptionPlan, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.SAVE_ADMIN_SUBSCRIPTION_PLAN_SUCCESS,
        });
        history.push(`/admin/dashboard/subscription-plans`);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_ADMIN_SUBSCRIPTION_PLAN_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* editSubscriptionPlan() {
  yield takeEvery(actions.EDIT_ADMIN_SUBSCRIPTION_PLAN, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(editAdminSubscriptionPlan, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.EDIT_ADMIN_SUBSCRIPTION_PLAN_SUCCESS,
        });
        history.push(`/admin/dashboard/subscription-plans`);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.EDIT_ADMIN_SUBSCRIPTION_PLAN_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteSubscriptionPlan() {
  yield takeEvery(actions.DELETE_ADMIN_SUBSCRIPTION_PLAN, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteAdminSubscriptionPlan, payload);
      if (response.data.status) {
        notification.success({
          message: 'Subscription plan deleted successfully',
        });
        yield put({
          type: actions.DELETE_ADMIN_SUBSCRIPTION_PLAN_SUCCESS,
        });
        yield put({
          type: actions.ADMIN_SUBSCRIPTION_PLAN,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_ADMIN_SUBSCRIPTION_PLAN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getSubscriptionPlanList)]);
  yield all([fork(saveSubscriptionPlanList)]);
  yield all([fork(viewSubscriptionPlanList)]);
  yield all([fork(editSubscriptionPlan)]);
  yield all([fork(deleteSubscriptionPlan)]);
}
