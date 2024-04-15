import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET FEES_APP_DEF VALUES
export const getFeesValues = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.FEES_APP_DEF}`,
  });
};

// EDIT FEES_APP_DEF VALUES
export const editFeesValues = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.FEES_APP_DEF}`,
    data: {
      ...payload,
    },
  });
};

export const saveFeesValues = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.FEES_APP_DEF}`,
    data: {
      ...payload,
    },
  });
};

export const deleteAppDefaultFees = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.FEES_APP_DEF}`,
    data: {
      ...payload,
    },
  });
};
