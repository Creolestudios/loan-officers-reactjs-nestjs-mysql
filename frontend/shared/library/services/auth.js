import {
  ServiceInstance,
  apiUrl,
  ServiceAuthInstance,
  VERSION,
  SOURCE,
  PREFIX,
  AUTH,
  USER,
  LO_URL,
} from '.';

// ANCHOR - Login
export const login = (payload) => {
  return ServiceInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${AUTH}${apiUrl.LOGIN}`,
    data: {
      ...payload.type,
    },
  });
};

// ANCHOR - Signup
export const signup = (payload) => {
  return ServiceInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${AUTH}${apiUrl.SIGNUP}`,
    data: {
      ...payload.type,
    },
  });
};

// ANCHOR - Verify
export const verify = (payload) => {
  return ServiceInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${AUTH}${apiUrl.VERIFICATION}`,
    data: {
      ...payload.type,
    },
  });
};

// ANCHOR - Resend Code
export const resendCode = (payload) => {
  return ServiceInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${AUTH}${apiUrl.RESEND_CODE}`,
    data: {
      ...payload.type,
    },
  });
};

// ANCHOR - Forgot Password
export const forgotpassword = (payload) => {
  return ServiceInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${AUTH}${apiUrl.FORGOT_PASSWORD}`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - Reset Password
export const resetpassword = (payload) => {
  return ServiceInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${AUTH}${apiUrl.RESET_PASSWORD}`,
    data: {
      ...payload,
    },
  });
};

export const changepassword = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${apiUrl.CHANGE_PASSWORD}`,
    data: {
      ...payload,
    },
  });
};

export const changereport = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${apiUrl.REPORT}`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - Get Report
export const getreport = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${apiUrl.REPORT}`,
  });
};

// ANCHOR - Change Notifaction
export const changenotification = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.NOTIFICATION}`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - Get Notifaction
export const getnotification = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.NOTIFICATION}`,
  });
};

// ANCHOR - Get Notifaction List
export const getnotificationlisting = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.NOTIFICATION_LISTING}`,
  });
};

// ANCHOR - Logout
export const logout = () => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${AUTH}${apiUrl.LOGOUT}`,
  });
};

// ANCHOR - Save Profile
export const saveProfile = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${'/loanofficer'}${
      apiUrl.USER_PROFILE
    }`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - Get Profile
export const getProfile = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${apiUrl.USER_PROFILE}`,
  });
};

// ANCHOR - Save Bio
export const saveBio = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${'/loanofficer'}${apiUrl.BIO}`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - Save Links
export const saveLinks = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${'/loanofficer'}${apiUrl.LINKS}`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - Save Dash Links
export const saveDashHeaderLinks = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${'/header-links'}`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - Save Image
export const saveImage = (payload) => {
  let formData = new FormData();
  formData.append('profile_photo', payload.profile_photo);
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${'/loanofficer'}${apiUrl.IMAGE}`,
    data: formData,
  });
};

// ANCHOR - Save Logo
export const saveLogo = (payload) => {
  let formData = new FormData();
  formData.append('company_logo', payload.company_logo);
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${'/loanofficer'}${apiUrl.LOGO}`,
    data: formData,
  });
};
