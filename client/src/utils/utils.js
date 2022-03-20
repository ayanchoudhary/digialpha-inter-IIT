export const getDelta = (arr, key) => {
  const delta = ((arr[0][`${key}`] - arr[1][`${key}`]) / arr[0][`${key}`]) * 100;
  return delta;
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
