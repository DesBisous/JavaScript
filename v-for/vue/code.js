import { compile } from './compile.js';

const domPool = new Map();

export function createApp(options) {
  const { compontents } = options;

  compontents.forEach(item => {
    const [template, state] = item();
    const dom = compile(template, state);
    const ul = [...dom.childNodes].find(item => item.nodeType === 1);
    domPool.set(state.title, {
      template: template,
      dom: ul
    });
  })

  return {
    mount,
  }
}

function mount(el) {
  const app = document.querySelector(el);
  const fragment = document.createDocumentFragment();
  domPool.forEach(item => fragment.appendChild(item.dom));
  app.appendChild(fragment);
}

export function update(state) {
  console.log(state);
  const { template, dom } = domPool.get(state.title);
  const newDom = compile(template, state);
  const newUl = [...newDom.childNodes].find(item => item.nodeType === 1);
  dom.parentNode.replaceChild(newUl, dom);
  domPool.set(state.title, {
    template,
    dom: newUl
  })
}