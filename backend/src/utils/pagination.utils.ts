/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SuccessResponse } from './types';

export const paginationCounter = (
  total,
  currentPage: number,
  itemPerPage,
  currentResultCount: number,
): SuccessResponse => {
  const item_count = currentResultCount < parseInt(itemPerPage) ? currentResultCount : parseInt(itemPerPage);
  const total_items = parseInt(total);
  const page_count = Math.ceil(total / parseInt(itemPerPage));
  return { item_count, total_items, page_count };
};

export const paginationCounterLO = (
  total,
  currentPage: number,
  itemPerPage,
  currentResultCount: number,
): SuccessResponse => {
  let item_count = 0;
  let total_items = 0;
  const item = currentResultCount < parseInt(itemPerPage) ? currentResultCount : parseInt(itemPerPage);
  item_count = Number(item) + Number(item_count);
  const total_count = parseInt(total);
  total_items = Number(total_count) + Number(total_items);
  const page_count = Math.ceil(total / parseInt(itemPerPage));
  return { item_count, total_items, page_count };
};