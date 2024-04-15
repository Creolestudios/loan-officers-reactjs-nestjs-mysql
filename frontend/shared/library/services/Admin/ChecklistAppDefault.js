import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET CHECKLIST_APP_DEFAULT
export const getLOCheckListAdmin = (page, pageSize) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CHECKLIST_APP_DEFAULT}?page=${page}&take=${pageSize}&sort_name=sequence_number&sort_value=ASC`,
  });
};

// ADD CHECKLIST_APP_DEFAULT
export const saveLONewCheckList = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CHECKLIST_APP_DEFAULT}`,
    data: {
      ...payload,
    },
  });
};

// EDIT CHECKLIST_APP_DEFAULT
export const editLOCheckList = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CHECKLIST_APP_DEFAULT}`,
    data: {
      ...payload,
    },
  });
};

export const deleteLOChecklist = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CHECKLIST_APP_DEFAULT}`,
    data: {
      ...payload,
    },
  });
};

export const deleteLOChecklistItem = (payload, id) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CHECKLIST_APP_DEFAULT}/${id}`,
    data: {
      ...payload,
    },
  });
};

// DEFAULT CHECKLIST_APP_DEFAULT
export const defaultLOCheklist = () => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.CHECKLIST_APP_DEFAULT}-default`,
  });
};
