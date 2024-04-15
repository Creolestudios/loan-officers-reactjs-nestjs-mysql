import { ServiceAuthInstance, apiUrl, LO_URL } from '../index';

const VERSION = '/v1';
const PREFIX = '/api';
const SOURCE = '/web';

// GET AFFORDABILITY VALUES
export const getLOSubscription = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}/type/Standard`,
  });
};

// SAVE AFFORDABILITY VALUES
export const subscribePlanLO = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}`,
    data: {
      ...payload,
    },
  });
};

// DELETE AFFORDABILITY LOAN FECTOR
export const cancelLOSubscription = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}/cancel/Standard`,
  });
};

export const getLOSubscriptionPlanapi = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}/plan`,
  });
};

export const getLOSupportapi = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}/support/faqs`,
  });
};

export const getLOSupportGuideapi = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${LO_URL}/support/guide`,
  });
};

// SAVE AFFORDABILITY VALUES
export const SubscriptionLOApplyPromoCode = (payload) => {
  return ServiceAuthInstance({
    method: 'POST',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}/promocode/apply`,
    data: {
      ...payload,
    },
  });
};

export const getSubscriptionLOApplyPromoCode = () => {
  return ServiceAuthInstance({
    method: 'GET',
    url: `${SOURCE}${PREFIX}${VERSION}${apiUrl.SUBSCRIPTION}/promocode/apply`,
  });
};
