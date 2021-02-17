总结：

1. this 是 JavaScript 的关键字，当前环境执行期上下文对象的一个属性，this 在不同的环境、不同作用下，表现是不同的
2. 获取全局对象
    web：window、self、frames、this
    node：global
    worker：self
    通用：globalThis
3. 扩展：Class 中由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过 super 调用的
4. 扩展：Object.create(null); // 输出的对象，没有 __proto__
5. 扩展：Object.create({ a: 1 }); // 输出的对象的 __proto__ 指向了传入的 {a: 1}
6. 使用 bing、call、apply 的时候会变更非箭头函数内的 this 指向
7. 箭头函数 this 总是指向外层非箭头函数的 this 指向
8. 箭头函数是忽略任何形式的 this 指向改变
9. 箭头函数一定不是一个构造函数
10. 箭头函数不是谁调用 this 就会指向谁
11. 对象中的 function 的最近谁调用 this 就指向那个宿主的原则
12. this 的指向的基本原则：谁是调用 this 的寄主，this 就指向谁
13. 对于箭头函数不同，箭头函数内部 this 的指向为最近外层非箭头函数的作用域
14. 构造函数默认隐式返回 this，或者手动返回 this（返回 null， undefined 也是返回 this），这个 this 指向的新对象的构造都是成功的
15. DOM 事件处理函数内部的 this 总是指向被绑定 DOM 元素