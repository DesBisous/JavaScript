let reg1 = /\{\{(.*)\}\}/;

function mvvm(options) {
  this.$options = options;
  this._data = observer(options.data);
  this._methods = options.methods;
  compile(options.el, this);
  for (let key in options.data) {
    Object.defineProperty(this, key, {
      get() {
        return this._data[key]
      },
      set(newValue) {
        this._data[key] = newValue;
      }
    })
  }
  for (let method in this._methods) {
    window[method] = function () {
      this._methods[method].call(this);
    }.bind(this);
  }
}

function observer(data) {
  let obj = {};
  for (let key in data) {
    let _dep = new dep();
    Object.defineProperty(obj, key, {
      get() {
        if (dep.target && !_dep.sub.find( item => item === dep.target)) {
          _dep.add(dep.target);
        }
        return data[key];
      },
      set(newValue) {
        data[key] = newValue;
        _dep.notify();
      }
    })
  }
  return obj
}

function compile(el, vm) {
  let app = document.querySelector(el);

  function _compile(childNode) {
    let childNodes = childNode.childNodes;
    [].slice.call(childNodes).map(childNode => { 
      let nodeType = childNode.nodeType;
      if (nodeType === 3) {
        let content = childNode.textContent;
        
        if (content && content.replace(/\s/, '').trim() && reg1.test(content)) {
          let key = content.match(reg1)[1].trim();
          textUpdate(childNode, vm._data[key]);
          new watcher(vm, key, function (value) {
            textUpdate(childNode, value);
          })
        }
      } else {
        let nodeName = childNode.nodeName;
        if (nodeName === 'INPUT') {
          let key = childNode.getAttribute('v-model').trim();
          if (key) {
            inputUpdate(childNode, vm._data[key]);
            childNode.addEventListener('input', function (e) {
              vm._data[key] = e.target.value;
            })
            new watcher(vm, key, function (value) {
              inputUpdate(childNode, value);
            })
          }
        }
      }
      childNode.childNodes.length && _compile(childNode);
    })
  }
  _compile(app)
}

function watcher(vm, key, cb) {
  this.vm = vm;
  this.key = key,
  this.cb = cb;
  this.value = this.get();
}

watcher.prototype.get = function () {
  dep.target = this;
  let value = this.vm._data[this.key];
  dep.target = null;
  return value;
}

watcher.prototype.update = function () {
  this.cb(this.vm._data[this.key])
}

function dep() {
  this.sub = [];
}

dep.prototype.notify = function () {
  this.sub.map(item => item.update());
};

dep.prototype.add = function (watcher) {
  this.sub.push(watcher);
}
  
dep.target = null;

function textUpdate(node, value) {
  node.textContent = value;
}

function inputUpdate(node, value) {
  node.value = value;
};

var isVaile = function (str) {
  if (str.length % 2 === 1) return false;
  const stack = [];
  for (let s of str) {
    switch (s) {
      case '(':
      case '[':
      case '{':
        stack.push(s);
        break;
      case ')':
        if (stack[stack.length - 1] === '(') stack.pop();
        break;
      case '}':
        if (stack[stack.length - 1] === '{') stack.pop();
        break;
      case ']':
        if (stack[stack.length - 1] === '[') stack.pop();
        break;
      default:
        break;
    }
  }
  return !stack.length;
}

console.log(isVaile('()'))
console.log(isVaile('()[]{}'))
console.log(isVaile('(]'))
console.log(isVaile('([)]'))
console.log(isVaile('{[]}'))

// 浅拷贝的方法，JSON，有什么问题，BFC是什么

// 回流 = 重排， 重绘

// 自定义迭代器，Symbol.iterator
// 对于 Object 是没有内置迭代器 Symbol.iterator 的，所以无法使用 for of 去迭代，因为 for of 依赖于迭代器 Symbol.iterator

// ES6 方式自定义迭代器

const iterator = function* generator(arr) {
  let index = 0;
  while (index < arr.length) {
    yield arr[index++];   
  }
}
const _iterator = iterator([1, 2, 3]);

console.log(_iterator.next());
console.log(_iterator.next());
console.log(_iterator.next());
console.log(_iterator.next());



const obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
}

Object.prototype[Symbol.iterator] = function* () {
  let index = 0;
  while (index < this.length) {
    yield this[index++];   
  }
};

Object.prototype[Symbol.iterator] = function () {
  let index = 0;
  const _this = this;
  return {
    next() {
      return index < _this.length ? { value: _this[index++], done: false } : {value: undefined, done: true}
    }
  }
};


for (let val of obj) {
  console.log(val);
}


function clone(obj, map = new WeakMap()) {
  if (!obj || typeof obj !== 'object') return obj;  // 空或者非对象则返回本身

  // 如果这个对象已经被记录则直接返回
  if( map.get(obj) ) {
    return  map.get(obj);
  }

  //这个对象还没有被记录，将其引用记录在map中，进行拷贝    
  let result = Array.isArray(obj) ? [] : {};  // 拷贝结果
  map.set(obj, result); // 记录引用关系
  for(let key in obj){
    if(obj.hasOwnProperty(key)) {
      result[key] = clone(obj[key]);
    }
  }
  return result;
}

var a = { a: 1, b: null, c: undefined, d: '23', e: a, f: function () { }, g: true }

console.log(a);