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
    res.push(obj);
  }
  // console.log(res)
  return res;
};
