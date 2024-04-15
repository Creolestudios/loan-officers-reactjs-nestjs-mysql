import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET FHA VALUES
export const getConventionalValues = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}?type=conventional`,
  });
};

// SAVE FHA VALUES
export const saveConventionalValues = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}`,
    data: {
      ...payload,
    },
  });
};

export const deleteLoanFectorforConventional = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}/loan-factor`,
    data: {
      ...payload,
    },
  });
};
