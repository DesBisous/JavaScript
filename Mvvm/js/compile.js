import Watcher from './watcher';

export default function compile(el, vm) {
  const elNode = typeof el === 'string' ? document.querySelector(el) : el;
  if (elNode) {
    const fragment = createFragment(elNode);
    compileNodes(fragment, vm);
    // 删除 #app 的所有子节点，这里模拟 vue 的 template 的模式，
    // index.html 只有一个 < div id = 'app' ></ >
    elNode.innerHtml = '';
    elNode.appendChild(fragment);
  }

}

function createFragment(el) {
  const fragment = document.createDocumentFragment();
  const childNodes = el.childNodes;
  [].slice.call(childNodes).forEach(childNode => {
    fragment.appendChild(childNode);
  });
  return fragment
}

function compileNodes(el, vm) {
  const childNodes = el.childNodes;
  [].slice.call(childNodes).forEach(childNode => { 
    const nodeType = childNode.nodeType;
    if (nodeType === 3) {
      handleText(childNode, vm);
    } else {
      handleElement(childNode, vm);
    }
    childNode.childNodes.length && compileNodes(childNode, vm);
  })
}

function handleText(node, vm) {
  const reg = new RegExp(/\{\{(.*)\}\}/);
  const nodeValue = node.nodeValue;
  if (reg.test(nodeValue)) {
    const list = reg.exec(nodeValue);
    const key = list[1].trim();
    update.textUpdate(node, key, vm); // 初始化
    new Watcher(key, vm, function () {
      update.textUpdate(node, key, vm);
    });
  }
}

function handleElement(node, vm) {
  const attrs = node.attributes;
  [].slice.call(attrs).forEach(attr => {
    let exp = attr.name;
    if (isDirective(exp)) {
      exp = exp.substr(2);
      const key = attr.nodeValue;
      update[exp + 'Update'](node, key, vm); // 初始化
      if (exp === 'model') {
        node.addEventListener('input', function (e) {
          vm._data[key] = e.target.value;
        }, false);
      }
      new Watcher(key, vm, function () {
        update[exp + 'Update'](node, key, vm);
      });
    }
    if (isEvent(exp)) {
      exp = exp.substr(5);
      const key = attr.nodeValue;
      node.addEventListener(exp, function (e) {
        vm[key](e);
      }, false);
    }
  })
}

const update = {
  textUpdate(node, key, vm) {
    if (node.nodeType === 3) {
      const parentNode = node.parentNode;
      node.nodeValue = vm._data[key];
    } else {
      node.innerHTML = vm._data[key];
    }
  },
  modelUpdate(node, key, vm) {
    node.value = vm._data[key];
  }
};

function isDirective(exp) {
  const list = ['v-model', 'v-text'];
  return list.some(item => item === exp);
}

function isEvent(exp) {
  const list = ['v-on:click'];
  return list.some(item => item === exp);
}