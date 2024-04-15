import { ServiceAuthInstance, apiUrl } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET ColorSchema
export const getLOColorSchema = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.COLOR_SCHEMA}`,
  });
};

export const updateLOColorSchema = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.COLOR_SCHEMA}`,
    data: {
      ...payload,
    },
  });
};
