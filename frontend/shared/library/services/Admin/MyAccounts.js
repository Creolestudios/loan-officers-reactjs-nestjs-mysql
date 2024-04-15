import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET LEARNING CENTER
export const getAdminMyAccount = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.USER}/profile`,
  });
};

// EDIT LEARNING CENTER
export const editAdminMyAccount = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.USER}/account`,
    data: {
      ...payload,
    },
  });
};

export const editAdminProfilePhoto = (payload) => {
  let formData = new FormData();
  formData.append('profile_photo', payload.profile_photo);
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.USER}/profile-img`,
    data: formData,
  });
};
