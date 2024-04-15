import BIO from '@iso/assets/images/BIO.svg';
import CALL from '@iso/assets/images/CALL.svg';
import TEXT from '@iso/assets/images/TEXT.svg';
import EMAIL from '@iso/assets/images/EMAIL.svg';
import DM from '@iso/assets/images/DM.svg';
import { getDashLinkIcons } from '@iso/config/constant';

export const sanitizedObjectData = (data) => {
  const sanitizedData = {};
  Object.keys(data).map((field) => {
    if (typeof data[field] === 'string') {
      sanitizedData[field] = data[field].trim();
    } else {
      sanitizedData[field] = data[field];
    }
  });
  return sanitizedData;
};

export const dashboardHeaderLinkMapper = (links) => {
  if (links) {
    return Object.keys(links)
      .filter((key) => links[key].status)
      .map((key) => {
        if (key === 'bio') {
          return {
            name: 'Bio',
            icon: BIO,
          };
        }
        if (key === 'dm') {
          return {
            name: 'DM',
            icon: DM,
          };
        }
        if (key === 'call') {
          return {
            name: 'Call',
            icon: CALL,
          };
        }
        if (key === 'text') {
          return {
            name: 'Text',
            icon: TEXT,
          };
        }
        if (key === 'email') {
          return {
            name: 'Email',
            icon: EMAIL,
          };
        }
        if (key === 'appointment') {
          return {
            name: links[key].appointment_label,
            icon: getDashLinkIcons(links[key].icon),
            key: 'appointment',
          };
        }
      });
  }

  return [];
};
