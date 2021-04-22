// 使用的是 function Object() {} 构造函数构造的
var obj1 = {
    a: 1,
    b: 2
}

// 使用 Object.create() 进行构造，可传入一个 prototype 对象, 传入 null 为一个无 prototype 对象
var obj2 = Object.create({
    a: 1,
    b: 2
});

// 使用 Object.defineProperty 进行属性定义
var obj3 = {};
Object.defineProperty(obj3, 'a', {
    get() {
        console.log(this)
        return 1;
    }
})
console.log(obj3.a); // 这里输出 obj3
// 这里 this 指向的就是 obj3

function Test() {
    this.a = 1;
    this.b = 2;
    console.log(this);

    // return this; // 默认行为
    return {
        a: 3,
        b: 4
    }
    // return null; // 也是返回 this
    // return undefined; // 也是返回 this
    // return 非 object 也返回 this
}

var obj4 = new Test(); // obj4 -> { a: 3, b: 4 }、console.log(this) -> Test {a: 1, b: 2}
console.log(obj4);
/**
 * new 过程：
 * var _obj = {};
 * _obj.__proto__ == Test.prototype;
 * var res = Test.call(_obj);
 * return typeof res === 'object' && res !== null ? res : obj;
 * 
 * 总结：
 * 构造函数默认隐式返回 this，或者手动返回 this，这个 this 指向的新对象的构造都是成功的
 * 如果手动返回一个新对象，那么这个 this 指向的那个对象将会被忽略，失效掉，因为失去了引用，相当于没有 new，比如如下：
 */

 var obj5 = new Test(); // { a: 3, b: 4 }
 var obj6 = Test(); // { a: 3, b: 4 }