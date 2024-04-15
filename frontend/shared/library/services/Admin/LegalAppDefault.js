import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET LEGAL PRIVACY
export const getAppDefaultLegal = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LEGAL}?type=${payload.types}`,
  });
};

// POST LEGAL PRIVACY
export const updateAppDefaultLegal = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LEGAL}`,
    data: {
      ...payload,
    },
  });
};
