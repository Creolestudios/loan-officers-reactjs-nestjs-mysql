import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET USDA VALUES
export const getUSDAValues = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USDA}`,
  });
};

// SAVE USDA VALUES
export const saveUSDAValues = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USDA}`,
    data: {
      ...payload,
    },
  });
};

// DELETE USDA LOAN FECTOR
export const deleteLoanFectorforUSDA = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LOAN_FECTOR}`,
    data: {
      ...payload,
    },
  });
};
