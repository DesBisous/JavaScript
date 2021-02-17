// test3 输入变量赋值一个函数，这个在执行的时候才会进行声明和赋值，所以必须写在前面
const test3 = () => {
    console.log(this);
}

var obj = {
    a: 1,
    b: 2,
    test: function() {
        console.log(this.a);
    },
    test2: test2,
    test3: test3,
    c: {
        d: 4,
        test4: function () {
            console.log(this.d);
        }
    },
    test5: function () {
        function test6() {
            console.log(this);
        }
        test6();
    }
}

obj.__proto__ = {
    e: 20
}

// 预编译的时候函数 test2 就声明了和定义了
function test2() {
    console.log(this.b);
}

obj.test(); // 1
obj.test2(); // 2
obj.test3(); // window
obj.c.test4(); // 4 这里按照对象中的 function 的最近谁调用 this 就指向那个宿主的原则即可了解
obj.test5(); // window, 要知道的是 test6 的调用寄主就是 window·
console.log(obj.e); // 20

var obj2 = Object.create({
    test0: function () {
        console.log(this.a + this.b);
    }
});

obj2.a = 1;
obj2.b = 2;

obj2.test0(); // 1 + 2 = 3 这里的 this 指向就是 obj2

/**
 * 总结：
 * this 的指向的基本原则：谁是调用 this 的寄主，this 就指向谁
 * 另类的就是对于箭头函数不同，箭头函数内部 this 的指向为最近外层非箭头函数的作用域
 */