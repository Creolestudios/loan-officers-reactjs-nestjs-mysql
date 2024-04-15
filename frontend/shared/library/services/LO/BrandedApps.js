import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

export const getLOapprovedBrandedApp = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.BRANDED_APP}/approved/${payload.id}`,
  });
};

export const getLOBrandedAppBillingDetail = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}/payment`,
  });
};

export const getLOBrandedAppInformaton = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}/branded-app/information`,
  });
};

export const getSubscriptionBrandedApp = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}/type/BrandedApp`,
  });
};

export const cancelLOBrandedAppSubscription = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}/cancel/BrandedApp?branded_user_id=${payload.id}`,
  });
};

export const getLOBrandedAppUser = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.BRANDED_APP}/user`,
  });
};

export const getBillingHistoryBrandedApp = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.BRANDED_APP}/billing-history`,
  });
};
export const deleteLoanOficerBApp = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.BRANDED_APP}/${payload.id}`,
    data: {
      ...payload,
    },
  });
};

export const applyLOBrandedApp = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.BRANDED_APP}/apply`,
    data: {
      ...payload,
    },
  });
};

export const postSubscibeLOBrandedApp = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.BRANDED_APP}`,
    data: {
      ...payload,
    },
  });
};

// ADD LO officer branded app
export const addLOofficerBrrandedApp = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.BRANDED_APP}/add-lo`,
    data: {
      ...payload,
    },
  });
};

export const getPlayStoreStatusBrandedApp = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}/playstore-status`,
  });
};
