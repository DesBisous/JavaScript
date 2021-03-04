// deepClone
function deepClone(origin, hashMap = new WeakMap()) {
    if (!origin || typeof origin !== 'object') return origin;

    if (origin instanceof Date) {
        return new Date(origin);
    }

    if (origin instanceof RegExp) {
        return new RegExp(origin);
    }

    if (hashMap.get(origin)) {
        return hashMap.get(origin);
    }

    const obj = origin.constructor();
    hashMap.set(origin, obj);

    for (let key in origin) {
        if (Object.prototype.hasOwnProperty.call(origin, key)) {
            obj[key] = deepClone(origin[key], hashMap);
        }
    }
    return obj;
}

// 重写 forEach
Array.prototype.myForEach = function (cb, _this = window) {
    if (typeof cb !== 'function') throw new TypeError(cb + ' is not a function');
    const array = this;
    const len = array.length;

    for (let i = 0; i < len; i += 1) {
        cb.apply(_this, [array[i], i, array]);
    }
}

// 重写 map
Array.prototype.myMap = function (cb, _this = window) {
    if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
    const array = this;
    const len = array.length;
    const newArray = [];

    for (let i = 0; i < len; i += 1) {
        const res = cb.apply(_this, [array[i], i, array]);
        res && (newArray.push(deepClone(res)));
    }
    return newArray;
}

// 重写 filter
Array.prototype.myFilter = function (cb, _this = window) {
    if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
    const array = this;
    const len = array.length;
    const newArray = [];

    for (let i = 0; i < len; i += 1) {
        const res = cb.apply(_this, [array[i], i, array]);
        res && (newArray.push(array[i]));
    }
    return newArray;
}

// 重写 every
Array.prototype.myEvery = function (cb, _this = window) {
    if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
    const array = this;
    const len = array.length;

    for (let i = 0; i < len; i += 1) {
        const res = cb.apply(_this, [array[i], i, array]);
        if (!res) return false;
    }
    return true;
}

// 重写 somw
Array.prototype.mySome = function (cb, _this = window) {
    if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
    const array = this;
    const len = array.length;

    for (let i = 0; i < len; i += 1) {
        const res = cb.apply(_this, [array[i], i, array]);
        if (res) return true;
    }
    return false;
}

// 重写 reduce
Array.prototype.myReduce = function (cb, initValue, _this = window) {
    if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
    const array = this;
    const len = array.length;

    for (let i = 0; i < len; i += 1) {
        const item = deepClone(array[i]);
        initValue = cb.apply(_this, [initValue, item, i, array]);
    }
    return initValue;
}

// 重写 reduceRight
Array.prototype.myReduceRight = function (cb, initValue, _this = window) {
    if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
    const array = this;
    const len = array.length;

    for (let i = len - 1; i >= 0; i -= 1) {
        const item = deepClone(array[i]);
        initValue = cb.apply(_this, [initValue, item, i, array]);
    }
    return initValue;
}

// 重写 reverse
Array.prototype.myReverse = function () {
    const array = this;
    const len = array.length;
    let left = 0;
    let right = len - 1;

    while (left < right) {
        const temp = array[right];
        array[right] = array[left];
        array[left] = temp;
        left += 1;
        right -= 1;
    }

    return array;
}