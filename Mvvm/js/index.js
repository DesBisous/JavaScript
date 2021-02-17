import observer from './observer';
import compile from './compile';

!(function () {
  const data = new mvvm({
      el: '#app',
      data() {
        return {
          name: 'Benson',
          age: '18',
        }
      },
      methods: {
        onChange(e) {
          this.name = '社畜';
          this.age = '26'
        }
      }
  });
  
  function mvvm(options) {
    const data = options.data();
    this.vm = this;
    this.el = options.el;
    this._methods = options.methods;
    this._data = observer(data, this.vm); // 监听者
    compile(this.el, this.vm); // 编译

    handleData.call(this, data); // this 实例上绑定属性
    handleMethods.call(this); // this 实例上绑定方法
  }

  function handleData(data) {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        Object.defineProperty(this, key, {
          get() {
            return this._data[key]
          },
          set(newValue) {
            this._data[key] = newValue; 
          }
        })
      }
    }
  }

  function handleMethods() {
    for (const method in this._methods) {
      this[method] = function (e) { this._methods[method].call(this, e) }
    }
  }

})()


