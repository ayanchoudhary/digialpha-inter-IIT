import { find } from 'lodash';

const combineDatasets = (set1, set2, key) =>
  set1.map((item) => ({
    value1: item?.[key] || 0,
    value2: find(set2, { date: item.date })?.[key] || 0,
    date: item.date,
  }));

export default combineDatasets;
