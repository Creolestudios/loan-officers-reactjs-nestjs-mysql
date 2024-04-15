import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

export const getAdminMarketEmailSignature = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.EMAIL_SIGNATURE}`,
  });
};

export const uploadAdminMarketEmailSignature = (payload) => {
  const formDataPayload = new FormData();
  Object.keys(payload).map((element) => {
    formDataPayload.append(element, payload[element]);
  });
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.EMAIL_SIGNATURE}`,
    data: formDataPayload,
  });
};

export const deleteAdminMarketEmailSignature = (id) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.EMAIL_SIGNATURE}/${id}`,
  });
};
