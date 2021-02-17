export function reactive(data) {
  if (!isObject) return data;

  return new Proxy(data, handleProxy);
}

function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

function handleProxy() {
  const get = createGet();
  const set = createSet();
  return {
    get,
    set,
  }
}

function createGet() {
  return function (target, key, receiver) {
    return Reflect.get(target, key, receiver);
  }
}

function createSet() {
  return function (target, key, value, receiver) {
    Reflect.set(target, key, value, receiver);
  }
}