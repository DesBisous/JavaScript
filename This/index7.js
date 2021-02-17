var oBtn1 = document.getElementById('btn1');

oBtn1.onclick = function () {
  console.log(this); // 输出了：<button id="btn1">click</button>
}

oBtn1.addEventListener('click', function () {
  console.log(this); // 输出了：<button id="btn1">click</button>
}, false);

// 事件处理函数内部的 this 总是指向被绑定 DOM 元素

!(function (doc) { 
  var oBtn2 = doc.getElementById('btn2');

  function Plus() {
    this.a = 1;
    this.b = 2;
    this.init();
  }

  Plus.prototype.init = function () {
    this.bindEvent();
  }

  Plus.prototype.bindEvent = function () {
    oBtn2.addEventListener('click', this.handleBtnClick, false);
  }

  Plus.prototype.handleBtnClick = function () {
    console.log(this); // <button id="btn2">+</button>
    console.log(this.a + this.b); // NaN
  }

  window.Plus = Plus;
})(document)

var plus = new Plus();
/**
 * 这里点击 btn2 事件，handleBtnClick 内部的 this 为 dom 元素本身
 * 如果需要内部 this 为 Plus 实例，可有以下方式：
 */
// 方式一
Plus.prototype.bindEvent = function () {
  oBtn2.addEventListener('click', this.handleBtnClick.bind(this), false);
}
// 方式二
function Plus() {
  this.a = 1;
  this.b = 2;
  this.handleBtnClick = this.handleBtnClick.bind(this);
  this.init();
}
// 方式三
Plus.prototype.bindEvent = function () {
  oBtn2.addEventListener('click', () => this.handleBtnClick(), false);
}

/**
 * 总结：
 * DOM 事件处理函数内部的 this 总是指向被绑定 DOM 元素
 */

