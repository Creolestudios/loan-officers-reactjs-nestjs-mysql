import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET CHECKLIST
export const getLOCheckList = (page, pageSize) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CHECKLIST}?page=${page}&take=${pageSize}&sort_name=sequence_number&sort_value=ASC`,
  });
};

// ADD CHECKLIST
export const saveLONewCheckList = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CHECKLIST}`,
    data: {
      ...payload,
    },
  });
};

// EDIT CHECKLIST
export const editLOCheckList = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CHECKLIST}`,
    data: {
      ...payload,
    },
  });
};

// REAARANG CHECKLIST
export const rearrangeLOChecklist = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CHECKLIST}/rearrange`,
    data: {
      ...payload,
    },
  });
};

// REAARANG CHECKLIST ITEM
export const rearrangeLOChecklistItem = (payload, id) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}/content/checklist-item/rearrange/${id}`,
    data: {
      ...payload,
    },
  });
};

export const deleteLOChecklist = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CHECKLIST}`,
    data: {
      ...payload,
    },
  });
};

export const deleteLOChecklistItem = (payload, id) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CHECKLIST}/${id}`,
    data: {
      ...payload,
    },
  });
};

// DEFAULT CHECKLIST
export const defaultLOCheklist = () => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CHECKLIST}-default`,
  });
};
