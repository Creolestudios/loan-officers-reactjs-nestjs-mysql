import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET LEARNING CENTER
export const getAdminSubscriptionPlan = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.SUBSCRIPTION}`,
  });
};

// DELETE LEARNING CENTER
export const deleteAdminSubscriptionPlan = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.SUBSCRIPTION}/delete/${payload.id}`,
    data: {
      ...payload,
    },
  });
};

// DEFAULT LEARNING CENTER
export const viewAdminSubscriptionPlan = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.SUBSCRIPTION}/view/${payload.id}`,
  });
};

// ADD LEARNING CENTER
export const saveAdminSubscriptionPlan = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.SUBSCRIPTION}`,
    data: {
      ...payload,
    },
  });
};

// EDIT LEARNING CENTER
export const editAdminSubscriptionPlan = (payload) => {
  const id = payload.id;
  delete payload.id;
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.SUBSCRIPTION}/${id}`,
    data: {
      ...payload,
    },
  });
};
