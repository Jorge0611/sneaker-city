export const fetcher = (url) => fetch(url).then((res) => res.json());

export function addToLocalStorage(key, item) {
  item.id = Date.now();
  let data = JSON.parse(localStorage.getItem(key) || "[]");
  data.push(item);
  localStorage.setItem(key, JSON.stringify(data));
  window.alert("Item added to " + key);
}

export function removeFromLocalStorage(key, id, obj) {
  let data = obj.filter((obj) => {
    return obj.id !== id;
  });
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}

export function groupBy(arr) {
  let result = arr.reduce(function (r, a) {
    r[a.size.id] = r[a.size.id] || [];
    r[a.size.id].push(a);
    return r;
  }, Object.create(null));
  return result;
}
