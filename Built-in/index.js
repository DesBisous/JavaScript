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
    age: '25'
};

// ------------ forEach ------------

// forEach 第二个参数是能够改变回调函数的 this 指向
list.forEach(function (item, index, arr) {
    console.log('this', this, 'name:', item.name, ' age:', item.age); 
}, obj);

console.log('------------ 分割线 ------------');

// 重写 forEach
list.myForEach(function (item, index, arr) {
    console.log('this', this, 'name:', item.name, ' age:', item.age); 
}, obj);

// ------------ forEach ------------


// ------------ forEach ------------

const map1 = list.map(function (item, index, arr) {
    console.log('this', this, 'name:', item.name, ' age:', item.age); 
    return item;
}, obj);
console.log(map1);


// ------------ forEach ------------