import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET AUTO RESPONDER
export const getLOMarketAutoResponder = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.AUTO_RESPONDER}`,
  });
};

// POST AUTO RESPONDER
export const updateLOMarketAutoResponder = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.AUTO_RESPONDER}`,
    data: {
      ...payload,
    },
  });
};

export const defaultLOAutoResponder = () => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.AUTO_RESPONDER}-default`,
  });
};
