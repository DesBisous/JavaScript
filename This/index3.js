var obj = {
  a: 1
}

var obj2 = {
  a: 100
}

var a = 2;

function test(b, c) {
  // this 默认 -> 全局对象 window
  console.log(this.a, b, c);
}

test(); // 2 undefined undefined
test.call(obj); // 1 undefined undefined
test.apply(obj); // 1 undefined undefined
test.call(obj, 3, 4); // 1 3 4
test.apply(obj, [3, 4]); // 1 3 4

var test1 = test.bind(obj, 3, 4);

test1(); // 1 3 4

var test2 = test1.bind(obj2, 5, 6);

test2(); // 1 3 4

/**
 * 这里的 test2 输出为 1 3 4 为什么呢？
 * 首先 bind 绑定的时候会返回一个新的函数，该函数并不会接受任何参数的，
 * 其次，bind 内部也是使用 call 来改变 this 指向。在 test1 的时候，就已经把 test 内部的指向定义为 obj 了
 * test1.bind() 的执行的时候，其实是传入给 test1 函数，但是 test1 接收的参数，不会传递到到 test 形参中的
 * obj2 也是绑定在 test1 函数上，但是执行 test1 的时候，执行 test 的 this 绑定的是 obj 了
 */