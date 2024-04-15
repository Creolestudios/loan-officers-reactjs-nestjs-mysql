import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET CALLBACK REQUEST LIST
export const getLOCallbackRequest = (page, search, size) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: search
      ? `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CALLBACK_REQUEST}?search=${search}&page=1&take=${size}`
      : `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CALLBACK_REQUEST}?page=${page}&take=${size}`,
  });
};
