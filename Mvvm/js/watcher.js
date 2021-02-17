import { Dep } from './observer';

export default class Watcher {
  constructor(key, vm, func) {
    this.key = key;
    this.vm = vm;
    this.value = this.get();
    this.func = func;
  }

  update() {
    const oldValue = this.value;
    const newValue = this.vm._data[this.key];
    if (newValue !== oldValue) {
      this.value = newValue;
      this.func(); // 更新视图
    }
  }

  get() {
    Dep.target = this;
    const value = this.vm._data[this.key];
    Dep.target = null;
    return value;
  }

}