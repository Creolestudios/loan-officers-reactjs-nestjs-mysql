import axios from 'axios';
import { message, Button, Space } from 'antd';
import { clearToken } from '@iso/lib/helpers/utility';
import { history } from '@iso/lib/helpers/history';
export const ADMIN_URL = '/admin';
export const LO_URL = '/loanofficer';

export const VERSION = '/v1';
export const PREFIX = '/api';
export const SOURCE = '/web';
export const AUTH = '/auth';
export const USER = '/user';

// SECTION - AXIOS INSTANCE

// Axios NoAuth Instance
export const ServiceInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
});

// Axios Auth Instance
export const ServiceAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
});

// SECTION - API URLS
export const apiUrl = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgotpassword',
  CHANGE_PASSWORD: '/changepassword',
  REPORT: '/report',
  RESET_PASSWORD: '/resetpassword',
  USER_PROFILE: '/profile',
  VERIFICATION: '/verificationcode',
  RESEND_CODE: '/resendverificationcode',
  LOGOUT: '/logout',
  BIO: '/profile-bio',
  LINKS: '/profile-link',
  IMAGE: '/profile-img',
  LOGO: '/profile-logo',
  DASHBOARD_HOME: '/activity/dashboard',
  APP_DASHBOARD_MENU: '/appsetting/dashboard-menu',
  ADD_CUSTOM_LINK_DASHBOARD: '/appsetting/dashboard-menu/customlink',
  ADD_CUSTOM_LINK_APP: '/appsetting/app-menu/customlink',
  APP_MENU: '/appsetting/app-menu',
  CO_BRAND_CUSTOM_LINK: '/activity/cobrand-officer/custom-links',
  LOAN_PROGRAM: '/content/loan-program',
  USER_GENERATE_REPORT: '/activity/users-generate',
  USER_CALCULATION_GENERATE_REPORT: '/activity/users-calculation-generate',
  LEARNING_CENTER: '/content/learning-center',
  LEGAL_PRIVACY: '/content/legal/privacy',
  LEGAL_DISCLAIMER: '/content/legal/disclaimer',
  CHECKLIST: '/content/checklists',
  CALLBACK_REQUEST: '/activity/callback-request',
  DOCUMENTS: '/activity/documents',
  USERS: '/activity/users',
  USERS_CHAT_ID: '/activity/chat-id',
  USERS_CHAT_DOC: '/activity/chat-document',
  FEES: '/calculation/service-fees',
  FHA: '/calculation/fha',
  LOAN_FECTOR: '/calculation/loan-factor',
  CONVENTIONAL: '/calculation/conventional',
  JUMBO: '/calculation/jumbo',
  USDA: '/calculation/usda',
  VA: '/calculation/va',
  AFFORDABILITY: '/calculation/affordability',
  CALCULATOR_TYPES: '/calculation/types',
  CALCULATOR_DISCLAIMER: '/calculation/disclaimer',
  USERS_DETAILES: '/activity/users/',
  USER_CALCULATIONS: '/activity/users-calculation/',
  USER_UPLOAD_DOCUMENTS: '/activity/users-documents/',
  USER_CALCULATION_DETAILS: '/activity/calculation/',
  QR_CODE: '/market/qrcode',
  EMAIL_SIGNATURE: '/market/emailsignature',
  EMAIL_SIGNATURE_DEFAULT: '/market/emailsignature-default',
  AUTO_RESPONDER: '/market/auto-responder',
  MORTGAGE_GUIDE: '/appsetting/mortgage-guide',
  CO_BRANDING: '/activity/cobrand-officers',
  ADD_CO_BRANDING: '/activity/cobrand-officer',
  COLOR_SCHEMA: '/user/color-schema',
  DEFAULT_WIDGETS: '/market/calculation/',
  BILLING_HISTORY: '/subscription/billing-history',
  SUBSCRIPTION: '/subscription',
  BRANDED_APP: '/subscription/branded-app',
  NOTIFICATION: '/activity/notification-settings',
  NOTIFICATION_LISTING: '/activity/listing/notifications',
  PUSH_NOTIFICATION: '/activity/notification/all',
  MESSAGE_NOTIFICATION: '/user/message/notification',
  WEB_LINK: '/web-link',
};

// SECTION - API URLS FOR ADMIN
export const apiUrlAdmin = {
  BRANDED_APP: '/branded-app',
  PRIMARY_USER: '/user',
  DETAILS: '/details',
  TRANSACTIONS: '/transactions',
  NOTES: '/notes',
  CREDITS: '/credits',
  BORROWER: '/borrower',
  SUBSCRIPTION: '/subscription',
  GUIDE: '/support/guide',
  FAQS: '/support/faqs',
  REPS: '/support/reps',
  DASHBOARD_HOME: '/user/dashboard',
  CHECKLIST_APP_DEFAULT: '/appdefaults/checklists',
  LEARNING_CENTER_APP_DEF: '/appdefaults/learning-center',
  FEES_APP_DEF: '/appdefaults/service-fees',
  LOAN_PROGRAM_APP_DEF: '/appdefaults/loan-program',
  APP_DASHBOARD_MENU: '/appdefaults/dashboard-menu',
  APP_MENU: '/appdefaults/app-menu',
  MORTGAGE_GUIDE: '/appdefaults/mortgage-guide',
  ADD_CUSTOM_LINK_DASHBOARD: '/appdefaults/dashboard-menu/customlink',
  ADD_CUSTOM_LINK_APP: '/appdefaults/app-menu/customlink',
  LEGAL: '/appdefaults/legal',
  GLOSSARY: '/appdefaults/glossary',
  CALCULATOR: '/appdefaults/calculation',
  EMAIL_SIGNATURE: '/market/emailsignature',
  DISCOUNT: '/discount',
  MESSAGE: '/appdefaults/message',
  USER: '/user',
  TYPES: '/appdefaults/types',
};

// Axios NoAuth Instance - Response
ServiceInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { data } = error.response;
    if (data && data.message) {
      message.error(data.message);
    }
    return Promise.reject(error);
  }
);

ServiceAuthInstance.interceptors.request.use((config) => {
  const accessToken =
    localStorage.getItem('id_token') || sessionStorage.getItem('id_token');
  config.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : '';
  return config;
});

function _getRefreshToken() {
  const refreshToken =
    localStorage.getItem('refresh_token') ||
    sessionStorage.getItem('refresh_token');
  return refreshToken;
}

function _setToken(tokenObj) {
  if (localStorage.getItem('remember_me')) {
    sessionStorage.clear();
    localStorage.setItem('id_token', tokenObj.access_token);
    localStorage.setItem('refresh_token', tokenObj.refresh_token);
  } else {
    localStorage.clear();
    sessionStorage.setItem('id_token', tokenObj.access_token);
    sessionStorage.setItem('refresh_token', tokenObj.refresh_token);
  }
}

/* Axios refresh token logic - will be used auth instance of axios */

ServiceAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Reject promise if usual error
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    /*
     * When response code is 401, try to refresh the token.
     * Eject the interceptor so it doesn't loop in case
     * token refresh causes the 401 response
     */
    ServiceAuthInstance.interceptors.response.eject(ServiceAuthInstance);
    return ServiceInstance.post(
      `${SOURCE}${PREFIX}${VERSION}${AUTH}/refreshtoken`,
      {
        refresh_token: _getRefreshToken(),
      }
    )
      .then((response) => {
        _setToken(response.data);
        error.response.config.headers['Authorization'] =
          'Bearer ' + response.data.access_token;
        return axios(error.response.config);
      })
      .catch((error) => {
        clearToken();
        history.push(`/portal/signin`);
        return Promise.reject(error);
      });
  }
);
