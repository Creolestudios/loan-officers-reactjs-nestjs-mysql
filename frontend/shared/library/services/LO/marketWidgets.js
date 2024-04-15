import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET FHA VALUES
export const getLOMarketWidgets = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}/widget/calculation/default/${payload.id}?type=${payload.types}`,
  });
};

// SAVE FHA VALUES
export const calculateLOMarketWidgets = (payload) => {
  const typs = payload.types;
  const ID = payload.id;

  delete payload.types;
  delete payload.id;

  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.DEFAULT_WIDGETS}${typs}/${ID}`,
    data: {
      ...payload,
    },
  });
};

// GET FHA VALUES
export const getLOMarketWidgetsList = (id) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}/widget/calculation/types/${id}`,
  });
};
