import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';
const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET USERS LIST
export const getAdminPrimaryLOUsers = (
  page,
  search,
  size,
  ex,
  employee = false,
  sort,
  sort_name,
  sort_value
) => {
  return ServiceAuthInstance(
    sort
      ? {
          method: 'GET',
          url: search
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?search=${search}&page=1&take=${size}&role=2&employee=${employee}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?page=${page}&take=${size}&role=2&sort_name=${sort_name}&sort_value=${sort_value}&employee=${employee}`,
        }
      : !ex
      ? {
          method: 'GET',
          url: search
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?search=${search}&page=1&take=${size}&role=2&employee=${employee}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?page=${page}&take=${size}&role=2&employee=${employee}`,
        }
      : {
          method: 'GET',
          url: search
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?search=${search}&role=2&employee=${employee}&is_export=${ex}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?role=2&employee=${employee}&is_export=${ex}`,
        }
  );
};

export const getAdminPriaryLOUsersDetailes = (id, employee = false) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.DETAILS}/${id}?role=2&employee=${employee}`,
  });
};

// GET USER TRANSACTIONS
export const getAdminTransactionLOUsers = (id, page, size) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.TRANSACTIONS}/${id}?page=${page}&take=${size}&role=2`,
  });
};

export const addAdminPriaryLONote = (id, payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.NOTES}/${id}`,
    data: payload,
  });
};

export const addAdminPriaryLOCredits = (id, payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.CREDITS}/${id}`,
    data: payload,
  });
};

export const editAdminPriaryLONote = (id, payload, user_id) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.NOTES}/${id}/${user_id}`,
    data: payload,
  });
};

export const editAdminPriaryLOCredits = (id, payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.CREDITS}/${id}`,
    data: payload,
  });
};

export const deleteAdminPriaryLOCredits = (id) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.CREDITS}/${id}`,
  });
};

export const deleteAdminPriaryLONotes = (id, user_id) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.NOTES}/${id}/${user_id}`,
  });
};
