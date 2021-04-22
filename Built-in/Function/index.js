function func(a, b) {
    this.a = a;
    this.b = b;
    console.log(this);
    console.log(arguments);
    console.log(a, b);
}



var obj = {
    name: '小明'
}

// func.call(obj, 1, 2);
// console.log('---------------');
// func.myCall(obj, 1, 2);

// func.apply(obj, [1, 2]);
// console.log('---------------');
// func.myApply(obj, [3, 4]);

var func1 = func.myBind(obj, '张三');

// func1('李四');

var newFunc = new func1('王五');

console.log(newFunc);