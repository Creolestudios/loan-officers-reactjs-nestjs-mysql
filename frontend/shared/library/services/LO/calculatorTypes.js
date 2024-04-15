import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

export const getTypesValues = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CALCULATOR_TYPES}`,
  });
};

export const editTypesValues = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CALCULATOR_TYPES}`,
    data: {
      ...payload,
    },
  });
};

export const saveDisclaimer = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CALCULATOR_DISCLAIMER}`,
    data: {
      ...payload,
    },
  });
};

export const restoreDefaultCalculator = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}/calculation/${payload.type}/default`,
  });
};
