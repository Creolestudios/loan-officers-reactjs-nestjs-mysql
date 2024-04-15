import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// ANCHOR - LO Profile Data
export const getUserData = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: apiUrlAdmin.USER_PROFILE,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - LO Dashboard Menu List
export const getLODashboardMenuList = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.APP_DASHBOARD_MENU}`,
  });
};

export const deleteAdminAppMenu = (id, menu) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}/appdefaults/${menu}/customlink`,
    data: {
      id,
    },
  });
};

// ANCHOR - LO App Menu List
export const getLOAppMenuList = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.APP_MENU}`,
  });
};
// ANCHOR - LO Mortgage guide List

export const getLOMortgageGuide = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.MORTGAGE_GUIDE}`,
  });
};

// ANCHOR - LO Add Custom Link Dashboard
export const addCustomLinkDashboard = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.ADD_CUSTOM_LINK_DASHBOARD}`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - LO Add Custom Link App
export const addCustomLinkApp = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.ADD_CUSTOM_LINK_APP}`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - LO Dashboard Menu Save
export const saveLODashboardMenu = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.APP_DASHBOARD_MENU}`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - LO App Menu Save
export const saveLOAppMenu = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.APP_MENU}`,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - LO Mortgage guide update
export const updateLOMortgagteGuide = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.MORTGAGE_GUIDE}`,
    data: {
      ...payload,
    },
  });
};
