// 重写 forEach
Array.prototype.myForEach = function (cb, _this = window) {
    if (typeof cb !== 'function') throw new TypeError(cb + ' is not a function');
    const array = this;
    const len = array.length;

    for(let i = 0; i < len; i += 1 ) {
        cb.apply(_this, [array[i], i, array]);
    }
}