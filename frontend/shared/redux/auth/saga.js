import { all, takeEvery, put, fork, call, delay } from 'redux-saga/effects';
import { history } from '@iso/lib/helpers/history';
import authActions from '@iso/redux/app/actions';
import { getToken, clearToken } from '@iso/lib/helpers/utility';
import { message, notification } from 'antd';
import {
  signup,
  verify,
  resendCode,
  login,
  forgotpassword,
  resetpassword,
  logout,
  saveProfile,
  getProfile,
  saveBio,
  saveLinks,
  saveImage,
  changereport,
  getreport,
  saveLogo,
  changepassword,
  changenotification,
  getnotification,
  getnotificationlisting,
  saveDashHeaderLinks,
} from '@iso/lib/services/auth';
import actions from './actions';
import action from '../Admin/MyAccount/action';
import {
  signInWithEmail,
  signUpWithEmailAndPassword,
  signOut,
} from '@iso/lib/firebase/firebase.authentication.util';
const fakeApiCall = true; // auth0 or express JWT

export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function* ({
    payload,
    history,
    from,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(login, payload);
      if (response.data.is_admin) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          profile: 'Profile',
          email: payload.type.email,
          type_role: 1,
        });
        yield put({
          type: action.GET_ADMIN_MY_ACCOUNT,
        });

        history.push(`/admin/dashboard/billing/primary-lo`);
      } else {
        // firebase login signup for chat messaging
        signUpWithEmailAndPassword(payload.type.email, payload.type.password)
          .then(function (result) {
            signInWithEmail(payload.type.email, payload.type.password);
          })
          .catch(function (error) {
            error?.code === 'auth/email-already-in-use' &&
              signInWithEmail(payload.type.email, payload.type.password);
          });

        if (!response.data.is_email_verified) {
          history.push({
            pathname: `/portal/verification`,
            search: `?type=VERIFY&email=${payload.type.email}`,
          });
        } else {
          yield put({
            type: actions.LOGIN_SUCCESS,
            token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            profile: 'Profile',
            email: payload.type.email,
            type_role: 2,
          });
          yield put({
            type: authActions.CHANGE_CURRENT,
            current: 'app-settings/profile',
          });
          history.push(`/portal/dashboard/app-settings/profile`);
        }
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.LOGIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    if (localStorage.getItem('remember_me')) {
      yield sessionStorage.clear();
      yield localStorage.setItem('id_token', payload.token);
      yield localStorage.setItem('refresh_token', payload.refresh_token);
      yield localStorage.setItem('type_role', payload.type_role);
    } else {
      yield localStorage.removeItem('id_token');
      yield localStorage.removeItem('refresh_token');
      yield sessionStorage.setItem('id_token', payload.token);
      yield sessionStorage.setItem('refresh_token', payload.refresh_token);
    }
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {});
}

export function* checkLogout() {
  yield takeEvery(actions.LOGOUT, function* ({ payload, history }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(logout);
      signOut();
      yield clearToken();
      yield localStorage.clear();
      if (payload.type == 'LO') {
        history.push(`/portal/signin`);
      } else {
        history.push(`/admin/signin`);
      }
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
      });
    }
  });
}

export function* signupSuccess() {
  yield takeEvery(actions.SIGNUP, function* ({ payload, history }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(signup, payload);
      yield put({
        type: actions.SIGNUP_SUCCESS,
        email: response.data.email,
      });
      history.push({
        pathname: `/portal/verification`,
        search: `?type=VERIFY&email=${response.data.email}`,
      });
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* verification() {
  yield takeEvery(actions.VERIFICATION, function* ({ payload, history }) {
    try {
      const response = yield call(verify, payload);
      if (response.status) {
        message.success(response.message);
      }
      const { type, email, code, is_admin } = payload.type;

      if (is_admin) {
        if (type === 'RESET') {
          history.push({
            pathname: `/admin/resetpassword-admin`,
            search: `?code=${code}&email=${email}`,
          });
        } else if (type === 'VERIFY') {
          yield put({ type: actions.LOGIN_WITH_OTHER, payload: response });
        }
      } else {
        if (type === 'RESET') {
          history.push({
            pathname: `/portal/resetPassword`,
            search: `?code=${code}&email=${email}`,
          });
        } else if (type === 'VERIFY') {
          yield put({ type: actions.LOGIN_WITH_OTHER, payload: response });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function* loginWithOtherFunction() {
  yield takeEvery(actions.LOGIN_WITH_OTHER, function* ({ payload }) {
    yield put({
      type: actions.LOGIN_SUCCESS,
      token: payload.data.access_token,
      refresh_token: payload.data.refresh_token,
      profile: 'Profile',
    });

    yield put({
      type: authActions.CHANGE_CURRENT,
      current: 'app-settings/profile',
    });

    history.push(`/portal/dashboard/app-settings/profile`);
  });
}

export function* resend() {
  yield takeEvery(actions.RESEND, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(resendCode, payload);

      if (response.status) {
        message.success(response.message);
      }
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* forgotPassword() {
  yield takeEvery(actions.FORGOT_PASSWORD, function* ({ payload, history }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const is_admin = payload.is_admin;
      const response = yield forgotpassword(payload);
      yield put({
        type: actions.FORGOT_PASSWORD_SUCCESS,
        email: payload.email,
      });
      if (is_admin) {
        history.push({
          pathname: `/admin/verification-admin`,
          search: `?type=RESET&email=${payload.email}`,
        });
      } else {
        history.push({
          pathname: `/portal/verification`,
          search: `?type=RESET&email=${payload.email}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* resetPassword() {
  yield takeEvery(actions.RESET_PASSWORD, function* ({ payload, history }) {
    try {
      const is_admin = payload.is_admin;
      const response = yield resetpassword(payload);
      if (response.status) {
        message.success(response.message);
      }
      if (is_admin) {
        history.push(`/admin/signin`);
      } else {
        history.push(`/portal/signin`);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function* profileUpdate() {
  yield takeEvery(actions.SAVE_PROFILE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const Links = payload.links;
      delete payload.links;
      const { data } = yield call(saveProfile, payload);
      if (data.message) {
        notification.success({
          message: data.message,
        });
      }
      if (data.data.token) {
        yield sessionStorage.clear();
        yield localStorage.setItem(
          'access_token',
          data.data.token.access_token
        );
        yield localStorage.setItem(
          'refresh_token',
          data.data.token.refresh_token
        );
      }
      if (data.status) {
        if (Links) {
          yield put({
            type: actions.SAVE_LINKS,
            payload: Links,
          });
        }
        yield delay(1000);
        yield put({
          type: actions.GET_PROFILE,
        });
      }
    } catch (error) {
      console.log(error);
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* bioUpdate() {
  yield takeEvery(actions.SAVE_BIO, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const is_contact_details = payload?.is_contact_details;
      const { data: resData } = yield call(saveBio, payload);
      if (resData?.status && !is_contact_details) {
        notification.success({
          message: 'Profile updated successfully',
        });
      }

      yield put({
        type: actions.SAVE_BIO_STATE,
        payload: resData.data,
      });
      if (is_contact_details) {
        yield put({
          type: actions.SAVE_PROFILE,
          payload: is_contact_details,
        });
      }
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* imageUpdate() {
  yield takeEvery(actions.SAVE_IMAGE, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const { data: resData } = yield call(saveImage, payload);
      yield put({
        type: actions.SAVE_IMAGE_STATE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* logoUpdate() {
  yield takeEvery(actions.SAVE_LOGO, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const { data: resData } = yield call(saveLogo, payload);
      yield put({
        type: actions.SAVE_LOGO_STATE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* linksUpdate() {
  yield takeEvery(actions.SAVE_LINKS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      let myAc = payload.myAccount;
      delete payload.myAccount;
      const response = yield call(saveLinks, payload);
      if (response.data.message) {
        if (!myAc) {
          notification.success({
            message: response.data.message,
          });
        }
        myAc = false;
      }

      yield put({
        type: actions.SAVE_LINKS_SUCCESS,
        links: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* updateDashLinks() {
  yield takeEvery(actions.SAVE_DASH_LINKS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      yield call(saveDashHeaderLinks, payload);
      yield put({
        type: actions.GET_PROFILE,
      });
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getProfileData() {
  yield takeEvery(actions.GET_PROFILE, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getProfile);
      yield put({
        type: actions.GET_PROFILE_SUCCESS,
        payload: response.data.data,
      });
      yield localStorage.setItem('type_role', response.data.data.role);
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* changePassword() {
  yield takeEvery(actions.CHANGE_PASSWORD, function* ({ payload }) {
    try {
      const response = yield call(changepassword, payload);

      if (response.status) {
        notification.success({
          message: response.data.message,
        });
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log('error', error);
    }
  });
}

export function* getReport() {
  yield takeEvery(actions.GET_REPORT, function* () {
    try {
      const response = yield call(getreport);

      if (response.status) {
        yield put({
          type: actions.GET_REPORT_SUCCESS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log('error', error);
    }
  });
}

export function* changeReport() {
  yield takeEvery(actions.CHANGE_REPORT, function* ({ payload }) {
    try {
      const response = yield call(changereport, payload);

      if (response.status) {
        yield put({
          type: actions.CHANGE_REPORT_SUCCESS,
          payload: response.data.data,
        });
        notification.success({
          message: 'Report Updated Successfully.',
        });
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log('error', error);
    }
  });
}

export function* getNotification() {
  yield takeEvery(actions.GET_NOTIFICATION, function* () {
    try {
      const response = yield call(getnotification);
      if (response.status) {
        yield put({
          type: actions.GET_NOTIFICATION_SUCCESS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log('error', error);
    }
  });
}

export function* changeNotification() {
  yield takeEvery(actions.CHANGE_NOTIFICATION, function* ({ payload }) {
    try {
      const response = yield call(changenotification, payload);
      if (response.status) {
        yield put({
          type: actions.CHANGE_NOTIFICATION_SUCCESS,
          payload: response.data.data,
        });
        notification.success({
          message: 'Notification Updated Successfully.',
        });
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log('error', error);
    }
  });
}
export function* getNotificationListingSaga() {
  yield takeEvery(actions.GET_NOTIFICATION_LISTING, function* ({ payload }) {
    try {
      const response = yield call(getnotificationlisting, payload);
      if (response?.status) {
        yield put({
          type: actions.GET_NOTIFICATION_LISTING_SUCCESS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      // message.error(error.response.data.message);
      console.log('error', error);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(resend),
    fork(verification),
    fork(loginWithOtherFunction),
    fork(signupSuccess),
    fork(forgotPassword),
    fork(resetPassword),
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(checkLogout),
    fork(profileUpdate),
    fork(getProfileData),
    fork(bioUpdate),
    fork(linksUpdate),
    fork(updateDashLinks),
    fork(imageUpdate),
    fork(logoUpdate),
    fork(changePassword),
    fork(getReport),
    fork(changeReport),
    fork(getNotification),
    fork(changeNotification),
    fork(getNotificationListingSaga),
  ]);
}
