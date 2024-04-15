import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET USERS LIST
export const getAdminUsersBorrower = (
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
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.BORROWER}?search=${search}&page=1&take=${size}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.BORROWER}?page=${page}&take=${size}&sort_name=${sort_name}&sort_value=${sort_value}`,
        }
      : !ex
      ? {
          method: 'GET',
          url: search
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.BORROWER}?search=${search}&page=1&take=${size}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.BORROWER}?page=${page}&take=${size}`,
        }
      : {
          method: 'GET',
          url: search
            ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.BORROWER}?search=${search}&is_export=${ex}`
            : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.BORROWER}?is_export=${ex}`,
        }
  );
};

// GET USER DETAILS
export const getAdminUserDetailBorrower = (params) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: !params?.extraParams
      ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.DETAILS}/${params?.id}?role=${params?.role}`
      : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.PRIMARY_USER}${apiUrlAdmin.DETAILS}/${params?.id}?role=${params?.role}&${params?.extraParams}`,
  });
};
