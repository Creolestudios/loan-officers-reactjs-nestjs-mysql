import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET Co-Branding
export const getLOCoBranding = (page, size, ex) => {
  return ServiceAuthInstance(
    !ex
      ? {
          method: 'GET',
          url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CO_BRANDING}?page=${page}&take=${size}`,
        }
      : {
          method: 'GET',
          url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CO_BRANDING}?is_export=${ex}`,
        }
  );
};

export const shareLOAppLink = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}/market/share-app`,
    data: {
      ...payload,
    },
  });
};

// GET Co-Branding BY ID
export const getLOCoBrandingByID = (id) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.CO_BRANDING}/${id}`,
  });
};
export const deleteLOCoBranding = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.ADD_CO_BRANDING}/${payload.id}`,
  });
};

export const editLOCoBranding = (payload) => {
  const id = payload.id;
  delete payload.id;
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.ADD_CO_BRANDING}/${id}`,
    data: {
      ...payload,
    },
  });
};

export const addLOCoBranding = (payload) => {
  let formData = new FormData();
  if (payload.profile_photo) {
    formData.append('id', payload.id);
    formData.append('profile_photo', payload.profile_photo);
  } else {
    formData.append('id', payload.id);
    formData.append('logo', payload.logo);
  }
  return ServiceAuthInstance(
    payload.profile_photo
      ? {
          method: 'POST',
          url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.ADD_CO_BRANDING}/profile-photo`,
          data: formData,
        }
      : payload.logo
      ? {
          method: 'POST',
          url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.ADD_CO_BRANDING}/logo`,
          data: formData,
        }
      : {
          method: 'POST',
          url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.ADD_CO_BRANDING}`,
          data: {
            ...payload,
          },
        }
  );
};
