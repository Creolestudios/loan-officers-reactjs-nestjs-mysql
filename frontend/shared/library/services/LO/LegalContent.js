import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET LEGAL PRIVACY
export const getLOLegalPrivacy = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LEGAL_PRIVACY}`,
  });
};

//GET LEGAL DISCLAIMER
export const getLOLegalDisclaimer = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LEGAL_DISCLAIMER}`,
  });
};

// POST LEGAL PRIVACY
export const updateLOLegalPrivacy = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LEGAL_PRIVACY}`,
    data: {
      ...payload,
    },
  });
};

//POST LEGAL DISCLAIMER
export const updateLOLegalDisclaimer = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LEGAL_DISCLAIMER}`,
    data: {
      ...payload,
    },
  });
};
