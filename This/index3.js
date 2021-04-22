var obj = {
  a: 1
}

var obj2 = {
  a: 100
}

var a = 2;

function test(b, c, d, e, f) {
  // this 默认 -> 全局对象 window
  console.log(this.a, b, c, d, e, f);
}

test(); // 2 undefined undefined undefined undefined undefined
test.call(obj); // 1 undefined undefined undefined undefined undefined
test.apply(obj); // 1 undefined undefined undefined undefined undefined
test.call(obj, 3, 4); // 1 3 4 undefined undefined undefined
test.apply(obj, [3, 4]); // 1 3 4 undefined undefined undefined

var test1 = test.bind(obj, 3, 4);

test1(); // 1 3 4 undefined undefined undefined

var test2 = test1.bind(obj2, 5, 6);

test2(7); // 1 3 4 5 6 7

/**
 * 这里的 test2 输出为 1 3 4 5 6 7 为什么呢？
 * 首先 bind 绑定的时候会返回一个新的函数 test2，
 * 其次，bind 内部也是使用 call 来改变 this 指向。在 test1 的时候执行， 内部 test 指向定义为 obj
 * test1.bind() 的执行的时候，返回 test2，test2 执行的时候，内部 test1 的 this 会指向 obj2，
 * 随后 test1 执行，内部的 test 的 this 指向还是 obj，所以 this.a 为 1，至于参数会不断透传下去
 */