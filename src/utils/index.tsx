/**
 *
 * @param {object} obj             传入的源对象
 * @param {string | string[]} path 传入的路径
 * @param {any} defaultValue       默认值
 */
export const deepGet = (
  obj: { [prop: string]: any },
  path: string | string[],
  defaultValue?: any
) => {
  const value = (!Array.isArray(path)
    ? path.replace(/\[/g, ".").replace(/\]/g, "").split(".")
    : path
  ).reduce((o, k) => (o || {})[k], obj);
  return value === undefined ? defaultValue : value
};

// var obj = { 'a': [{ 'b': { 'c': 3 } }] };

// var result = deepGet(obj, 'a[0].b.c');
// console.log(result);
// // => 3

// result=deepGet(obj, ['a', '0', 'b', 'c']);
// console.log(result);
// // => 3

// result=deepGet(obj, 'a.b.c', 'default');
// console.log(result);
// => 'default'

export const addBigInter = (str = "159", str2 = "753") => {
  let sum = '';
  let sept = 0;
  let i = str.length - 1;
  let j = str2.length - 1;
  while (j >= 0 || i >= 0) {
    let temp = 0
    let a = 0
    let b = 0
    if (i >= 0) {
      a = Number(str[i])
      i--;
    }
    if (j >= 0) {
      b = Number(str2[j])
      j--;
    }
    temp = a + b + sept;
    if (temp >= 10) {
      temp = temp % 10;
      sept = 1
    } else {
      sept = 0
    }
    sum = temp.toString() + sum
  }
  return Number(sum);
};