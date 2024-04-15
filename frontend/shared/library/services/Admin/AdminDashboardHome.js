import { ServiceAuthInstance, apiUrlAdmin, ADMIN_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET DASHBOARD DATA
export const getAdminDashboardTotalUser = (id) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.DASHBOARD_HOME}/${id}`,
  });
};

export const getAdminDashboardNewAccount = (id, startDate, endDate) => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}${apiUrlAdmin.DASHBOARD_HOME}/${id}?startDate=${startDate}&endDate=${endDate}`,
  });
};

export const getAdminDashboardRecentActivity = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}/appdefaults/recent-activity`,
  });
};

export const getAdminDashboardAppInstalltion = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${ADMIN_URL}/branded-app/app-installations`,
  });
};
