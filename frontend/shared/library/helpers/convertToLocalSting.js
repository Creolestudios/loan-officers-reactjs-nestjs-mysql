import { typeofStringCheck } from '@iso/lib/helpers/utility';

export const converter = (item) => {
  if (item === null) {
    return '--';
  }
  return typeofStringCheck(item)
    ? item.includes(',')
      ? item
      : Number(item.replace(/\$/, '')).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
    : Number(item).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
};
