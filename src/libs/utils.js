export const fetcher = (url) => fetch(url).then((res) => res.json());

/**
 *
 * @param {string} key
 * @param {Object} item
 */
export function addToLocalStorage(key, item) {
  item.id = Date.now();
  let data = JSON.parse(localStorage.getItem(key) || "[]");
  data.push(item);
  localStorage.setItem(key, JSON.stringify(data));
  window.alert("Item added to " + key);
}

/**
 *
 * @param {string} key - localstorage element key
 * @param {Number} id - Id of the object to delete
 * @param {Object} obj - Object where item is searched
 * @returns {*}
 */
export function removeFromLocalStorage(key, id, obj) {
  let data = obj.filter((obj) => {
    return obj.id !== id;
  });
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}

/**
 * Group object by identifier
 * @param {Object[]} array
 * @returns {*}
 */
export function groupBy(array) {
  return array.reduce(function (r, a) {
    r[a.size.id] = r[a.size.id] || [];
    r[a.size.id].push(a);
    return r;
  }, Object.create(null));
}
