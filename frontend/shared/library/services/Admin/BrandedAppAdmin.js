import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

export const getAdminBrandedApp = (
  page,
  size,
  search,
  ex,
  sort,
  sort_name,
  sort_value
) => {
  return ServiceAuthInstance(
    sort
      ? {
          method: 'GET',
          url: Boolean(search)
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/request?search=${search}&page=1`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/request?page=${page}&take=${size}&sort_name=${sort_name}&sort_value=${sort_value}`,
        }
      : !ex
      ? {
          method: 'GET',
          url: Boolean(search)
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/request?search=${search}&page=1`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/request?page=${page}&take=${size}`,
        }
      : {
          method: 'GET',
          url: Boolean(search)
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/request?search=${search}&is_export=${ex}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/request?is_export=${ex}`,
        }
  );
};

export const getAdminBrandedAppClients = (
  page,
  size,
  search,
  ex,
  sort,
  sort_name,
  sort_value
) => {
  return ServiceAuthInstance(
    sort
      ? {
          method: 'GET',
          url: Boolean(search)
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/primary-brandedapp-users?search=${search}&page=1`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/primary-brandedapp-users?page=${page}&take=${size}&sort_name=${sort_name}&sort_value=${sort_value}`,
        }
      : !ex
      ? {
          method: 'GET',
          url: Boolean(search)
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/primary-brandedapp-users?search=${search}&page=1`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/primary-brandedapp-users?page=${page}&take=${size}`,
        }
      : {
          method: 'GET',
          url: Boolean(search)
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/primary-brandedapp-users?search=${search}&is_export=${ex}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/primary-brandedapp-users?is_export=${ex}`,
        }
  );
};

export const getAdminBrandedAppEmployees = (
  page,
  size,
  search,
  ex,
  sort,
  sort_name,
  sort_value,
  id
) => {
  return ServiceAuthInstance(
    sort
      ? {
          method: 'GET',
          url: Boolean(search)
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/employees/${id}?search=${search}&page=1`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/employees/${id}?page=${page}&take=${size}&sort_name=${sort_name}&sort_value=${sort_value}`,
        }
      : !ex
      ? {
          method: 'GET',
          url: Boolean(search)
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/employees/${id}?search=${search}&page=1`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/employees/${id}?page=${page}&take=${size}`,
        }
      : {
          method: 'GET',
          url: Boolean(search)
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/employees/${id}?search=${search}&is_export=${ex}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/employees/${id}?is_export=${ex}`,
        }
  );
};

export const getAdminBrandedAppInfo = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/info`,
  });
};

export const getAdminBrandedAppByID = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/request/${payload.id}`,
  });
};

export const setAdminBrandedAppStatus = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/playstore-status`,
    data: {
      ...payload,
    },
  });
};

export const setAdminBrandedAppInfo = (payload) => {
  const id = payload.id;
  delete payload.id;
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/info/${id}`,
    data: {
      ...payload,
    },
  });
};

export const acceptAdminBrrandedApp = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/accept`,
    data: {
      ...payload,
    },
  });
};

export const rejectAdminBrandedApp = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.BRANDED_APP}/reject`,
    data: {
      ...payload,
    },
  });
};
