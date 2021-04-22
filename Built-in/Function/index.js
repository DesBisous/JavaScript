function func(a, b) {
    this.a = a;
    this.b = b;
    console.log(this);
    console.log(arguments);
    console.log(a, b);
    return '123'
}



var obj = {
    name: '小明'
}

// console.log(func.call(obj, 1, 2));
// console.log('---------------');
// func.myCall(obj, 1, 2);

// console.log(func.apply(obj, [1, 2]));
// console.log('---------------');
// func.myApply(obj, [3, 4]);

var func1 = func.bind(obj, '张三');
// console.log(func1);

// func1('李四');

// var newFunc = new func1('王五');
// console.log(newFunc);

var currying = progressCurrying(function (a,b,c,d) { console.log(a,b,c,d) }, 'a', 'b');
currying('c')('d')
