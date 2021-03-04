const list = [{
    name: '张三',
    age: 17
}, {
    name: '李四',
    age: 18
}, {
    name: '王五',
    age: 29
}];

const obj = {
    name: 'Benson',
    age: 25
};

console.log('------------ forEach ------------');

// forEach 第二个参数是能够改变回调函数的 this 指向
list.forEach(function (item, index, arr) {
    console.log('this', this, 'name:', item.name, ' age:', item.age); 
}, obj);

console.log('------------ 分割线 ------------');

// 重写 forEach
list.myForEach(function (item, index, arr) {
    console.log('this', this, 'name:', item.name, ' age:', item.age); 
}, obj);

console.log('------------ map ------------');

const map1 = list.map(function (item, index, arr) {
    console.log('this', this, 'name:', item.name, ' age:', item.age); 
    return item;
}, obj);
console.log(JSON.stringify(map1));

const map2 = list.myMap(function (item, index, arr) {
    console.log('this', this, 'name:', item.name, ' age:', item.age); 
    return item;
}, obj);
console.log(JSON.stringify(map2));

console.log('------------ filter ------------');

const filter1 = list.filter(function (item, index, arr) {
    return item.age < 20;
}, obj)
console.log(JSON.stringify(filter1));

const filters2 = list.myFilter(function (item, index, arr) {
    return item.age < 18;
}, obj);
console.log(JSON.stringify(filters2));

console.log('------------ every ------------');

const every1 = list.every(function (item, index, arr) {
    return item.age < 20
}, obj)
console.log('every  ', every1);

const every2 = list.myEvery(function (item, index, arr) {
    return item.age < 30
}, obj)
console.log('myEvery', every2);

console.log('------------ some ------------');

const some1 = list.some(function (item, index, arr) {
    return item.age < 20
}, obj)
console.log('some  ', some1);

const some2 = list.mySome(function (item, index, arr) {
    return item.age < 10
}, obj)
console.log('mySome', some2);

console.log('------------ reduce ------------');

const reduce1 = list.reduce(function (prev, item, index, arr) {
    prev.push(item)
    return prev;
}, [])
console.log(JSON.stringify(reduce1));

const reduce2 = list.myReduce(function (prev, item, index, arr) {
    prev.push(item)
    return prev;
}, [])
console.log(JSON.stringify(reduce2));

console.log('------------ reduceRight ------------');

const reduceRight1 = list.reduceRight(function (prev, item, index, arr) {
    prev.push(item)
    return prev;
}, [])
console.log(JSON.stringify(reduceRight1));

const reduceRight2 = list.myReduceRight(function (prev, item, index, arr) {
    prev.push(item)
    return prev;
}, [])
console.log(JSON.stringify(reduceRight2));

console.log('------------ reverse ------------');

const reverse1 = list.reverse();
console.log('reverse1', JSON.stringify(reverse1));
console.log('list    ', JSON.stringify(list));

const reverse2 = list.myReverse();
console.log('reverse2', JSON.stringify(reverse2));
console.log('list    ', JSON.stringify(list));
