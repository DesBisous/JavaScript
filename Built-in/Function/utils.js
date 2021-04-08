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
        func.apply(
            this instanceof arguments.callee ? ( this.__proto__ = _ctx.prototype ) || this : _ctx,
            argu1.concat(argu2)
        );
    }
}

// 柯里化
function progressCurrying(fn) {
    var _this = this
    var len = fn.length;
    var args = Array.prototype.slice.call(arguments, 1);

    return function() {
        var newArgs = args.concat(Array.prototype.slice.call(arguments));
        var _args = [];
        
        for (var i = 0; i < newArgs.length; i += 1) {
            _args.push('newArgs[' + i + ']');
        }

        // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
        if (newArgs.length < len) {
            return eval('progressCurrying.call(_this, fn, ' + _args + ')')
        }

        // 参数收集完毕，则执行fn
        return fn.apply(this, newArgs);
    }
}