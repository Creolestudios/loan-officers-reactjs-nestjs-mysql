import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET FHA VALUES
export const getFHAValues = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}?type=fha`,
  });
};

// SAVE FHA VALUES
export const saveFHAValues = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}`,
    data: {
      ...payload,
    },
  });
};

export const deleteLoanFectorforFHA = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}/loan-factor`,
    data: {
      ...payload,
    },
  });
};
