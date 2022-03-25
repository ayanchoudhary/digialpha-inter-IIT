import { isNumber, last, reduce, slice } from 'lodash';

export const getDelta = (arr, key) => {
  if (arr.length > 1 && arr[0][`${key}`] != 0) {
    const delta = ((arr[0][`${key}`] - arr[1][`${key}`]) / arr[0][`${key}`]) * 100;
    return delta;
  }
  if (arr.length == 1) {
    return 100;
  }
  return 0;
};

export const getArrGraphData = (arr, key, name) => {
  const res = [];
  for (let i = 0; i < arr.length - 1; i++) {
    let obj = [];
    obj[`${name}`] = arr[i][`${key}`];
    obj.date = getKeyNameFromFillingData(arr[i].filingDate);
    res.push(obj);
  }
  return res;
};

const getKeyNameFromFillingData = (filingDate) =>
  filingDate ? `${filingDate.quarter}-${filingDate.year}` : '';

export const getCumulativeSum = (arr, key, kFormat = true) => {
  const reducedSum = reduce(arr, (sum, curr) => sum + curr[`${key}`], 0) || 0;
  return kFormat ? kFormatter(reducedSum) : reducedSum;
};

export const kFormatter = (num) =>
  Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'M'
    : Math.sign(num) * Math.abs(num).toFixed(2) + 'k';

export const truncateDatapoints = (arr, key, maxLength = 5) => {
  if (arr.length <= maxLength) return arr;
  const remVal = reduce(slice(arr, maxLength), (sum, curr) => sum + curr[key], 0);
  const remDate = `${arr[maxLength]?.date}-${last(arr)?.date}`;
  return [...slice(arr, 0, maxLength), { date: remDate, [key]: remVal }];
};

export const preciseRoundOff = (num, decimals = 2) =>
  isNumber(num) && num % 1 != 0 ? parseFloat(num).toFixed(decimals) : num;
