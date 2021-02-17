export default function observer(data, vm) {
  if (!data || typeof data !== 'object') return;

  const _data = {};

  for (let key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const dep = new Dep();

      Object.defineProperty(_data, key, {
        get() {
          Dep.target && dep.addDep(Dep.target); // 收集依赖
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
          dep.notify(); // 更新依赖
        }
      })
    }
  }
  return _data;
}

export class Dep {

  constructor() {
    this.deps = [];
  }

  addDep(dep) {
    if (!this.deps.find(item => item === dep)) {
      this.deps.push(dep);
    }
  }

  notify() {
    this.deps.forEach(dep => dep.update());
  }
}

Dep.target = null;