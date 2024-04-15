import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET LEARNING CENTER
export const getAdminSupportGuide = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GUIDE}`,
  });
};

export const getAdminSupportGuideCategory = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GUIDE}/category`,
  });
};

// DELETE LEARNING CENTER
export const deleteAdminSupportGuide = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GUIDE}/delete?id=${payload.id}`,
  });
};

export const deleteAdminSupportGuideCategory = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GUIDE}/category/${payload.id}`,
  });
};

// ADD LEARNING CENTER
export const addAdminSupportGuide = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GUIDE}/new`,
    data: {
      ...payload,
    },
  });
};

// GET SUPPPORT FAQS
export const getAdminSupportFaqs = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.FAQS}`,
  });
};

// ADD SUPPPORT FAQS
export const addAdminSupportFaqs = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.FAQS}`,
    data: payload,
  });
};

// EDIT SUPPPORT FAQS
export const editAdminSupportFaqs = (payload, id) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.FAQS}/${id}`,
    data: payload,
  });
};

// DELETE SUPPPORT FAQS
export const deleteAdminSupportFaqs = (id) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.FAQS}/${id}`,
  });
};

export const addAdminSupportGuideCategory = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GUIDE}/category/new`,
    data: {
      ...payload,
    },
  });
};

// EDIT LEARNING CENTER
export const editAdminSupportGuideCategory = (payload) => {
  const id = payload.id;
  delete payload.id;
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GUIDE}/category/${id}`,
    data: {
      ...payload,
    },
  });
};

// EDIT LEARNING CENTER
export const editAdminSupportGuide = (payload) => {
  const id = payload.id;
  delete payload.id;
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GUIDE}/edit/${id}`,
    data: {
      ...payload,
    },
  });
};
export const checkedAdminSupportGuide = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.GUIDE}/checked?id=${payload.id}`,
  });
};

export const rearrangeAdminSupportFaqs = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.FAQS}/rearrange`,
    data: {
      ...payload,
    },
  });
};

export const getAdminSupportReps = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.REPS}`,
  });
};

export const desableAdminSupportReps = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.REPS}/${payload.id}?reps=${payload.status}`,
  });
};
export const saveAdminSupportReps = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.REPS}`,
    data: {
      ...payload,
    },
  });
};
