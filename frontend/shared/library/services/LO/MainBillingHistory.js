import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET CALLBACK REQUEST LIST
export const getLOBillingHistory = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.BILLING_HISTORY}?${payload.id}`,
  });
};
