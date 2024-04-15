import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET AFFORDABILITY VALUES
export const getAffordabilityValues = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.AFFORDABILITY}`,
  });
};

// SAVE AFFORDABILITY VALUES
export const saveAffordabilityValues = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.AFFORDABILITY}`,
    data: {
      ...payload,
    },
  });
};

// DELETE AFFORDABILITY LOAN FECTOR
export const deleteLoanFectorforAffordability = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LOAN_FECTOR}`,
    data: {
      ...payload,
    },
  });
};
