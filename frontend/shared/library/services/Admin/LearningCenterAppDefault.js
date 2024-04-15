import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET LEARNING CENTER
export const getLOLearningCenterList = (page, pageSize) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LEARNING_CENTER_APP_DEF}?page=${page}&take=${pageSize}&sort_name=sequence_number&sort_value=ASC`,
  });
};

// DELETE LEARNING CENTER
export const deleteLOLearningCenter = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LEARNING_CENTER_APP_DEF}`,
    data: {
      ...payload,
    },
  });
};

// DEFAULT LEARNING CENTER
export const defaultLOLearningCenter = () => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LEARNING_CENTER_APP_DEF}/default`,
  });
};

// ADD LEARNING CENTER
export const saveLOLearningCenter = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LEARNING_CENTER_APP_DEF}`,
    data: {
      ...payload,
    },
  });
};

// EDIT LEARNING CENTER
export const editLOLearningCenter = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LEARNING_CENTER_APP_DEF}`,
    data: {
      ...payload,
    },
  });
};
