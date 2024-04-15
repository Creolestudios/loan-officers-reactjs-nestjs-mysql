import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET LOAN PROGRAM
export const getLOLoanProgramList = (page, pageSize) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LOAN_PROGRAM}?page=${page}&take=${pageSize}&sort_name=sequence_number&sort_value=ASC`,
  });
};

// DELETE LOAN PROGRAM
export const deleteLOLoanProgram = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LOAN_PROGRAM}`,
    data: {
      ...payload,
    },
  });
};

//REARRANGE LOAN PROGRAM
export const rearrangeLOLoanProgram = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LOAN_PROGRAM}/rearrange`,
    data: {
      ...payload,
    },
  });
};

// DEFAULT LOAN PROGRAM
export const defaultLOLoanProgram = () => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LOAN_PROGRAM}/default`,
  });
};

// ADD LOAN PROGRAM
export const saveLOLoanProgram = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LOAN_PROGRAM}`,
    data: {
      ...payload,
    },
  });
};

// EDIT LOAN PROGRAM
export const editLOLoanProgram = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}${apiUrl.LOAN_PROGRAM}`,
    data: {
      ...payload,
    },
  });
};
