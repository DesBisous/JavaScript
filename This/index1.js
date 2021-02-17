/**
 * this 是 JavaScript 的关键字
 * 当前环境执行期上下文对象的一个属性
 * this 在不同的环境、不同作用下，表现是不同的
 * 
 * 获取全局对象
 * web：window、self、frames、this
 * node：global
 * worker：self
 * 通用：globalThis
 */

var a = 'global -> a';
// global.b = 'global ->b'; // node 环境下全局对象, web 环境下不存在
var obj = {
  a: 'obj -> a',
  test: function () {
    console.log(this.a); // 调用当前方法的对象
    console.log(window.a); // web 环境下全局对象, node 环境下不存在
    // console.log(global.b); // node 环境下全局对象, web 环境下不存在
    console.log(globalThis.a);
  }
}
obj.test();


function useStrict() {
  'use strict' 
  return this;
}

/**
 * 使用严格模式的话，会返回 undefined，因为 useStrict() 没说明谁调用它
 * 但是 window.useStrict() 这样调用的话，严格模式也会返回 window，因为明确表明了谁调用了它
 * 
 * 使用非严格模式的话，都会返回 window
 */
console.log(useStrict())
console.log(window.useStrict())