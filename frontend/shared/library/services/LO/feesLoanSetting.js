import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET FEES VALUES
export const getFeesValues = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.FEES}`,
  });
};

// EDIT FEES VALUES
export const editFeesValues = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.FEES}`,
    data: {
      ...payload,
    },
  });
};

export const saveFeesValues = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.FEES}`,
    data: {
      ...payload,
    },
  });
};

export const deleteAppDefaultFees = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.FEES}`,
    data: {
      ...payload,
    },
  });
};
