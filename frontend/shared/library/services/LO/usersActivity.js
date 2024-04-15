import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';
const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET USERS LIST
export const getLOUsers = (page, search, size, ex) => {
  return ServiceAuthInstance(
    !ex
      ? {
          method: 'GET',
          url: search
            ? `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USERS}?search=${search}&page=1&take=${size}`
            : `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USERS}?page=${page}&take=${size}`,
        }
      : {
          method: 'GET',
          url: search
            ? `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USERS}?search=${search}&is_export=${ex}`
            : `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USERS}?is_export=${ex}`,
        }
  );
};

export const getLOUsersDetailes = (id) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USERS_DETAILES}${id}`,
  });
};

export const createLOChatId = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USERS_CHAT_ID}`,
    data: {
      ...payload,
    },
  });
};

export const userSendPushNotifiation = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.PUSH_NOTIFICATION}`,
    data: {
      ...payload,
    },
  });
};

export const userSendMessageNotifiation = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `/mob${PREFIX}${VERSION}${apiUrl.MESSAGE_NOTIFICATION}`,
    data: {
      ...payload,
    },
  });
};

export const uploadeLOUserChatDocs = (payload) => {
  let formData = new FormData();
  formData.append('chat_document', payload.upload_docs);
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USERS_CHAT_DOC}`,
    data: formData,
  });
};

export const getLOUserCalculationDetailes = (id, cal_id) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USER_CALCULATION_DETAILS}${id}/${cal_id}`,
  });
};

export const getLOUsersCalculations = (id, params, page, search, size) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: search
      ? `${SOURCE}${PREFIX}${VERSION}${LO_URL}${
          apiUrl.USER_CALCULATIONS
        }${id}?search=${search}&page=1&take=${size}${
          params && params.is_saved !== undefined
            ? params.is_saved
              ? '&is_saved=true'
              : '&is_saved=false'
            : ''
        }`
      : `${SOURCE}${PREFIX}${VERSION}${LO_URL}${
          apiUrl.USER_CALCULATIONS
        }${id}?page=${page}&take=${size}${
          params && params.is_saved !== undefined
            ? params.is_saved
              ? '&is_saved=true'
              : '&is_saved=false'
            : ''
        }`,
  });
};

export const getLOUserUploadDocuments = (id, page, search, size) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: search
      ? `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USER_UPLOAD_DOCUMENTS}${id}?search=${search}&page=1&take=${size}`
      : `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USER_UPLOAD_DOCUMENTS}${id}?page=${page}&take=${size}`,
  });
};

export const getLOUsersGenerateReports = (payload) => {
  return ServiceAuthInstance(
    payload.from
      ? {
          method: 'GET',
          responseType: 'arraybuffer',
          url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USER_GENERATE_REPORT}?to=${payload.to}&from=${payload.from}`,
        }
      : {
          method: 'GET',
          responseType: 'arraybuffer',
          url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.USER_CALCULATION_GENERATE_REPORT}?id=${payload.id}&loan_type=${payload.loan_type}&calculate_type=${payload.calculate_type}`,
        }
  );
};
