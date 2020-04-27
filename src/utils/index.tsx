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
