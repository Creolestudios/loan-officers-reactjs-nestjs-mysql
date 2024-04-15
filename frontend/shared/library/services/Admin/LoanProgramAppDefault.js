import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET LOAN PROGRAM
export const getAdminLoanProgramList = (page, pageSize) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LOAN_PROGRAM_APP_DEF}?page=${page}&take=${pageSize}&sort_name=sequence_number&sort_value=ASC`,
  });
};

// DELETE LOAN PROGRAM
export const deleteLOLoanProgram = (payload) => {
  return ServiceAuthInstance({
    method: 'DELETE',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LOAN_PROGRAM_APP_DEF}`,
    data: {
      ...payload,
    },
  });
};

// DEFAULT LOAN PROGRAM
export const defaultLOLoanProgram = () => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LOAN_PROGRAM_APP_DEF}/default`,
  });
};

// ADD LOAN PROGRAM
export const saveLOLoanProgram = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LOAN_PROGRAM_APP_DEF}`,
    data: {
      ...payload,
    },
  });
};

// EDIT LOAN PROGRAM
export const editLOLoanProgram = (payload) => {
  return ServiceAuthInstance({
    method: 'PUT',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.LOAN_PROGRAM_APP_DEF}`,
    data: {
      ...payload,
    },
  });
};

// /appdefaults/loan-program
