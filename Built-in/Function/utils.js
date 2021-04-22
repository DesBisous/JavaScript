Function.prototype.myCall = function(ctx) {
    var _ctx = ctx !== null && ctx !== undefined ? Object(ctx) : window;
    var func = this;
    var argu = [];
    _ctx.func = func;

    for (var i = 1; i < arguments.length; i += 1) {
        argu.push('arguments[' + i + ']');
    }

    var res = eval('_ctx.func(' + argu + ')');
    delete _ctx.func;

    return res;
}

Function.prototype.myApply = function(ctx, first) {
    var _ctx = ctx !== null && ctx !== undefined ? Object(ctx) : window;
    var func = this;
    _ctx.func = func;
    var res;

    if (Array.isArray(first)) {
        var argu = [];
    
        for (var i = 0; i < first.length; i += 1) {
            argu.push('first[' + i + ']');
        }

        res = eval('_ctx.func(' + argu + ')');
    } else if(typeof first === 'undefined' || typeof first === 'function' || typeof first === 'object') {
        res = _ctx.func();
    } else {
        throw new TypeError('CreateListFromArrayLike called on non-object')
    }

    _ctx.func && delete _ctx.func;

    return res;
}

Function.prototype.myBind = function (ctx) {
    var _ctx = ctx !== null && ctx !== undefined ? Object(ctx) : window;
    var func = this;
    var argu1 = [].slice.call(arguments).splice(1);

    return function() {
        var argu2 = [].slice.call(arguments);
        // instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
        func.apply(
            this instanceof arguments.callee ? ( this.__proto__ = _ctx.prototype ) || this : _ctx,
            argu1.concat(argu2)
        );
    }
}