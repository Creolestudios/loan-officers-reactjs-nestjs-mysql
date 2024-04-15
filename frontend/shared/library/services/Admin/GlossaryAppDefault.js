import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET LEARNING CENTER
export const getAppDefaultGlossary = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url:
      payload.name === 'all'
        ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GLOSSARY}`
        : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GLOSSARY}?search=${payload.name}`,
  });
};

export const addAppDefaultGlossary = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GLOSSARY}`,
    data: {
      ...payload,
    },
  });
};

export const editAppDefaultGlossary = (payload) => {
  const id = payload.id;
  delete payload.id;
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GLOSSARY}/${id}`,
    data: {
      ...payload,
    },
  });
};

export const deleteAppDefaultGlossary = (payload) => {
  const id = payload.service_id;
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GLOSSARY}/${id}`,
    data: {
      ...payload,
    },
  });
};
