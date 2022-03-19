const getDelta = (arr, key) => {
  const delta =
    ((arr[arr.length - 1][`${key}`] - arr[arr.length - 2][`${key}`]) /
      arr[arr.length - 1][`${key}`]) *
    100;
  return delta;
};
const getArrGraphData = (arr, key, name) => {
  const res = [];
  for (let i = 0; i < arr.length - 1; i++) {
    obj = {};
    obj[`${name}`] = arr[i][`${key}`];
    res.push(obj);
  }
  return res;
};
