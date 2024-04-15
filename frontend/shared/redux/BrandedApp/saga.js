import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import {
  addLOofficerBrrandedApp,
  getLOBrandedAppUser,
  getLOapprovedBrandedApp,
  getBillingHistoryBrandedApp,
  deleteLoanOficerBApp,
  postSubscibeLOBrandedApp,
  applyLOBrandedApp,
  getSubscriptionBrandedApp,
  cancelLOBrandedAppSubscription,
  getLOBrandedAppBillingDetail,
  getLOBrandedAppInformaton,
  getPlayStoreStatusBrandedApp,
} from '@iso/lib/services/LO/BrandedApps';
import actions from './action';
import { message, notification } from 'antd';
import { history } from '@iso/lib/helpers/history';

export function* getApprovedBrandedApp() {
  yield takeEvery(actions.GET_APPROVED_BRANDED_APP, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOapprovedBrandedApp, payload);
      yield put({
        type: actions.GET_APPROVED_BRANDED_APP_SUCCESS,
      });
      history.push(`/portal/dashboard/sub-branded-app`);
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_APPROVED_BRANDED_APP_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getBrandedAppInfo() {
  yield takeEvery(actions.GET_APPROVED_BRANDED_APP_INFO, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOBrandedAppInformaton);
      yield put({
        type: actions.GET_APPROVED_BRANDED_APP_INFO_SUCCESS,
        list: response.data.data.loanOfficerDetail,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_APPROVED_BRANDED_APP_INFO_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getPlayStoreStatusSagas() {
  yield takeEvery(actions.GET_PLAYSTORE_STATUS, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getPlayStoreStatusBrandedApp);
      yield put({
        type: actions.GET_PLAYSTORE_STATUS_SUCCESS,
        play_store_status: response.data.data.playstore_status,
      });
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getBillingHistoryBApp() {
  yield takeEvery(actions.GET_BRANDED_APP_BILLING_HISTORY, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getBillingHistoryBrandedApp);

      yield put({
        type: actions.GET_BRANDED_APP_BILLING_HISTORY_SUCCESS,
        list: response.data.data.Billing_History,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_BRANDED_APP_BILLING_HISTORY_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getBillingDetailBApp() {
  yield takeEvery(actions.GET_BILLING_DETAIL, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLOBrandedAppBillingDetail);
      yield put({
        type: actions.GET_BILLING_DETAIL_SUCCESS,
        list: response.data.data.payment_details,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_BILLING_DETAIL_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getSubscriptionBApp() {
  yield takeEvery(actions.GET_SUBSCRIPTIO_BRANDED_APP, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getSubscriptionBrandedApp);
      yield put({
        type: actions.GET_SUBSCRIPTIO_BRANDED_APP_SUCCESS,
        list: response.data.data.Subscription_list,
        b_id: response.data.data.Branded_App_Status.branded_user_id,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_SUBSCRIPTIO_BRANDED_APP_ERROR });

      // !Boolean(payload.bApp) && message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* cancelSubscription() {
  yield takeEvery(actions.CANCEL_SUBSCRIPTIO_BRANDED_APP, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(cancelLOBrandedAppSubscription, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.CANCEL_SUBSCRIPTIO_BRANDED_APP_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.CANCEL_SUBSCRIPTIO_BRANDED_APP_ERROR });

      notification.success({
        message: error?.response?.data?.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getBrandedAppUser() {
  yield takeEvery(actions.GET_BRANDED_APP_USER, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLOBrandedAppUser);

      yield put({
        type: actions.GET_BRANDED_APP_USER_SUCCESS,
        list: response.data.data.Loan_Officers_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_BRANDED_APP_USER_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* applyBrandedApp() {
  yield takeEvery(actions.APPLY_BRANDED_APP, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(applyLOBrandedApp, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.APPLY_BRANDED_APP_SUCCESS,
          adminApproved: response.data.data.is_admin_approved,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APPLY_BRANDED_APP_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* postSubscibeBrandedApp() {
  yield takeEvery(actions.SUBSCRIBE_BRANDED_APP, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(postSubscibeLOBrandedApp, payload);
      if (response.data.status) {
        notification.success({
          message: 'Subscription Successful',
        });
        yield put({
          type: actions.GET_SUBSCRIPTIO_BRANDED_APP,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SUBSCRIBE_BRANDED_APP_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addLoanOfficerBrrandedApp() {
  yield takeEvery(actions.ADD_LOAN_OFFICER_BRANDED_APP, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addLOofficerBrrandedApp, payload);
      if (response.data.status) {
        notification.success({
          message: response.data.data.message,
        });
        yield put({
          type: actions.ADD_LOAN_OFFICER_BRANDED_APP_SUCCESS,
        });
        yield put({
          type: actions.GET_BRANDED_APP_USER,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADD_LOAN_OFFICER_BRANDED_APP_ERROR });
      message.error(error.response.data.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteLoanOficerBrandedApp() {
  yield takeEvery(actions.DELETE_LO_BRANDED_APP, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(deleteLoanOficerBApp, payload);
      if (response.data.status) {
        notification.success({
          message: 'LoanOfficer deleted Successfully!!',
        });
        yield put({
          type: actions.DELETE_LO_BRANDED_APP_SUCCESS,
          id: response.data.data.id,
        });
        yield put({
          type: actions.GET_BRANDED_APP_USER,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.DELETE_LO_BRANDED_APP_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getApprovedBrandedApp)]);
  yield all([fork(getBillingHistoryBApp)]);
  yield all([fork(getBrandedAppUser)]);
  yield all([fork(applyBrandedApp)]);
  yield all([fork(postSubscibeBrandedApp)]);
  yield all([fork(addLoanOfficerBrrandedApp)]);
  yield all([fork(deleteLoanOficerBrandedApp)]);
  yield all([fork(getSubscriptionBApp)]);
  yield all([fork(cancelSubscription)]);
  yield all([fork(getBillingDetailBApp)]);
  yield all([fork(getBrandedAppInfo)]);
  yield all([fork(getPlayStoreStatusSagas)]);
}
