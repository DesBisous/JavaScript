class People {
  constructor() {
    // 将会定义到实例对象 this 的属性上 -> new -> this -> {}
    this.print = function () {
      console.log('实例属性：', this);
    }
  }

  // 类的原型上的方法 -> People.prototype
  // new -> this -> {} -> __proto__ -> People.prototye
  print() {
    console.log('类原型上的方法：', this);
  }

  // 类的静态方法
  static print() {
    console.log('静态属性');
  }
}

/** 
Class 其实就是 函数
function People() {
  this.print = function () {
    console.log('实例属性：' + this);
  }
}

People.prototype.print = function () {
  console.log('类原型上的属性：' + this);
}

People.print = function () {
  console.log('静态属性：' + this);
}
*/

const man = new People();

/**
 * 输出：实例属性： People {print: ƒ}
 * 这里需要知道的是为什么不是输出“类原型上的方法”，那是因为“类原型上的方法”在 People 在定义的时候就进行的赋予了
 * 而“实例属性”是在 new 的时候，对 constructor 的执行，并且改变 this 为实例对象的时候赋予的一个实例上的方法
 */
man.print();
People.print(); // 输出：静态属性

// 扩展

const PeopleA = Object.create(null); // 输出的对象，没有 __proto__
const PeopleB = Object.create({ a: 1 }); // 输出的对象的 __proto__ 指向了传入的 {a: 1}


class Father {
  constructor(age) {
    this.age = age;
  }

  swim() {
    console.log('Go swimming!!!');
  }
}

class Son extends Father{
  constructor() {
    /**
     * 类似于 call 的继承：在这里 super 相当于把 A 的 constructor 给执行了，
     * 并且让方法中的 this 是 B 的实例，super 当中传递的实参都是在给 A 的 constructor 传递。
     * super(18) 相当于 Father.prototype.constructor.call(this, 18)
     * super.swim() 相当于 Father.prototype.swim()
     */
    super(18);
    this.hooby = 'traval';
    console.log(this.age);
  }

  study() {
    console.log(this);
    this.swim();
  }
}
const son = new Son();

son.study();

// 需要注意，由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过 super 调用的。