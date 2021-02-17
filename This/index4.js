// 一
'use strict'
const test = () => {
  console.log(this);
}
function test1() {
  console.log(this);
}
const test2 = function () {
  console.log(this);
}
test(); // window
test1(); // undefined
test2(); // undefined

// 严格模式下，箭头函数绑定了 window -> this

// 二
var obj = {
  a: 1
}

var a = 2;

const test = () => {
  console.log(this.a);
}

test(); // 2
test.call(obj); // 2
test.apply(obj); // 2
var test1 = test.bind(obj);
test1(); // 2

new test(); // test is not constructor

obj.test = () => {
  console.log(obj);
  console.log(this);
}
obj.test(); // obj/window

/**
 * 箭头函数是忽略任何形式的 this 指向改变 
 * 箭头函数一定不是一个构造函数
 * 箭头函数不是谁调用 this 就会指向谁
 */

 // 三
obj.test = function () {
  const t1 = () => {
    console.log(this);
  }
  t1();
}
obj.test(); // obj

obj.test = () => {
  const t1 = () => {
    console.log(this);
  }
  t1();
}
obj.test(); // window

obj.test = function() {
  const t1 = () => {
    // t1 是箭头函数 this -> obj
    const t2 = () => {
      console.log(this);
    }
    t2();
  }
  t1();
}
obj.test(); // obj

obj.test = function() {
  const t1 = function() {
    const t2 = () => {
      // t1 是普通函数 this -> window
      console.log(this);
    }
    t2()
  }
  t1();
}
obj.test(); // window

/**
 * 总结：
 * 箭头函数 this 总是指向外层非箭头函数的 this 指向
 * 箭头函数是忽略任何形式的 this 指向改变 
 * 箭头函数一定不是一个构造函数
 * 箭头函数不是谁调用 this 就会指向谁
 */