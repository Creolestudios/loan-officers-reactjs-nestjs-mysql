import { ServiceAuthInstance, apiUrl, USER } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

export const addWebLink = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${USER}${apiUrl.WEB_LINK}`,
    data: {
      ...payload,
    },
  });
};
