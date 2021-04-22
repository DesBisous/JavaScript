window.onload = function () {
  // func1();
  // func2();
}

// 方案一
function func1() {
  const max = { tagName: null, count: 0};
  const map = new Map();
  const list = document.querySelectorAll('*');
  for (let item of list) {
    let count = map.get(item.tagName);
    count ? (count += 1) : (count = 1);
    map.set(item.tagName, count);
    if (max.count < count) {
      max.tagName = item.tagName;
      max.count = count;
    }
  }
  console.log(map);
  console.log(max);
}

// 方案二
function func2() {
  const max = { tagName: null, count: 0};
  const map = new Map();
  const root = document.querySelector('html');
  const traverse = function (node) {
    let count = map.get(node.tagName);
    count ? (count += 1) : (count = 1);
    map.set(node.tagName, count);
    if (max.count < count) {
      max.tagName = node.tagName;
      max.count = count;
    }
    const children = node.children;
    for (let child of children) {
      traverse(child);
    }
  }
  traverse(root);
  console.log(map);
  console.log(max);
}