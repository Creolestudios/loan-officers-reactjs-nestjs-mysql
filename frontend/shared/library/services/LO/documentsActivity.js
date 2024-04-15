import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET DOCUMENTS
export const getLODocuments = (page, search, size) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: search
      ? `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.DOCUMENTS}?search=${search}&page=1&take=${size}`
      : `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.DOCUMENTS}?page=${page}&take=${size}`,
  });
};
