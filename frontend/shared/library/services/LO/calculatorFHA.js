import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET FHA VALUES
export const getFHAValues = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.FHA}`,
  });
};

// SAVE FHA VALUES
export const saveFHAValues = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.FHA}`,
    data: {
      ...payload,
    },
  });
};

export const deleteLoanFectorforFHA = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LOAN_FECTOR}`,
    data: {
      ...payload,
    },
  });
};
