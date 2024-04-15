import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

export const getTypesValues = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}`,
  });
};

export const editTypesValues = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.TYPES}`,
    data: {
      ...payload,
    },
  });
};

export const saveDisclaimer = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}/disclaimer`,
    data: {
      ...payload,
    },
  });
};
