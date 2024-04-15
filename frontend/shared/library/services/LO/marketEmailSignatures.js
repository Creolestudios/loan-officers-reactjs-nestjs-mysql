import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

export const getLOMarketEmailSignature = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.EMAIL_SIGNATURE}`,
  });
};

export const uploadLOMarketEmailSignature = (payload) => {
  const formDataPayload = new FormData();
  Object.keys(payload).map((element) => {
    formDataPayload.append(element, payload[element]);
  });
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.EMAIL_SIGNATURE}`,
    data: formDataPayload,
  });
};

export const deleteLOMarketEmailSignature = (id) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.EMAIL_SIGNATURE}/${id}`,
  });
};

// DEFAULT LEARNING CENTER
export const defaultLOMarkertEmailSignature = () => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.EMAIL_SIGNATURE_DEFAULT}`,
  });
};
