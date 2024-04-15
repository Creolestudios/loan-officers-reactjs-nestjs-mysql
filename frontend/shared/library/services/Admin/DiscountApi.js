import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

export const getAdminDiscount = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.DISCOUNT}`,
  });
};

export const viewAdminDiscount = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.DISCOUNT}/view-coupons/${payload.id}`,
  });
};

export const addAdminDiscount = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.DISCOUNT}`,
    data: {
      ...payload,
    },
  });
};
export const deleteAdminDiscount = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.DISCOUNT}/${payload.id}`,
  });
};

export const editAdminDiscount = (payload) => {
  const id = payload.id;
  delete payload.id;
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.DISCOUNT}/${id}`,
    data: {
      ...payload,
    },
  });
};
editAdminDiscount;

export const viewPromocode = (payload) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: payload.search
      ? `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.DISCOUNT}/promocode?search=${payload.search}`
      : `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.DISCOUNT}/promocode/${payload.id}`,
  });
};
