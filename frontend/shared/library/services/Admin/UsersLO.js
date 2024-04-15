import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';
const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

export const getAdminUsersLO = (
  page,
  search,
  size,
  ex,
  sort,
  sort_name,
  sort_value
) => {
  return ServiceAuthInstance(
    sort
      ? {
          method: 'GET',
          url: search
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?search=${search}&userLO=true&page=1&take=${size}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?page=${page}&take=${size}&userLO=true&sort_name=${sort_name}&sort_value=${sort_value}`,
        }
      : !ex
      ? {
          method: 'GET',
          url: search
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?search=${search}&userLO=true&page=1&take=${size}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?page=${page}&take=${size}&userLO=true`,
        }
      : {
          method: 'GET',
          url: search
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?search=${search}&userLO=true&is_export=${ex}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}?userLO=true&is_export=${ex}`,
        }
  );
};

export const getAdminUsersLODetailes = (id) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}/details/${id}`,
  });
};

export const getAdminUserDefaultData = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}/defaults/${payload.id}?defaults=${payload.def}&types=${payload.type}`,
  });
};

export const AdminDisable = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}/disabled/${payload.id}?enable_disable_status=${payload.enable_disable_status}`,
  });
};
