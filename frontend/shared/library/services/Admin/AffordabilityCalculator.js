import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET AFFORDABILITY VALUES
export const getAffordabilityValues = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}?type=affordability`,
  });
};

// SAVE AFFORDABILITY VALUES
export const saveAffordabilityValues = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}`,
    data: {
      ...payload,
    },
  });
};

// DELETE AFFORDABILITY LOAN FECTOR
export const deleteLoanFectorforAffordability = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CALCULATOR}/loan-factor`,
    data: {
      ...payload,
    },
  });
};
