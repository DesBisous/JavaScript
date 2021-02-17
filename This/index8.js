/**
 * 类中是严格模式
 */

 /**
  * 父亲有一个吃水果的方法 还有一个水果
  * 儿子有自己的水果 -> 儿子使用父亲吃水果的方法吃自己的水果
  */

class Father {
  // constructor() {
  //   this.eat = this.eat.bind(this); // bind 会重新返回一个匿名函数
  // }

  get fruit() {
    return 'apple';
  }

  eat() {
    console.log('I am eating an ' + this.fruit);
  }
}

class Son {
  get fruit() {
    return 'orange';
  }
}

var father = new Father();
var son = new Son();

son.eat = father.eat;

father.eat(); // I am eating an apple
son.eat(); // I am eating an orange

/** 
 * 如何让 son 也吃父亲的水果内？
 * 其实就是把父亲的 eat 内部绑定住父亲的 this
 * 可以这么做，给 Father 增加一个构造函数，如下：
 * constructor() {
 *  this.eat = this.eat.bind(this); // bind 会重新返回一个匿名函数
 * } 
 */




