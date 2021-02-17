import { compile } from './compile.js';

const domPool = [];

export function createApp(options) {
  const { compontents } = options;

  compontents.forEach(item => {
    const [template, state] = item();
    const dom = compile(template, state);
    const ul = [...dom.childNodes].find(item => item.nodeType === 1);
    domPool.push(ul);
  })

  return {
    mount,
  }
}

function mount(el) {
  const app = document.querySelector(el);
  const fragment = document.createDocumentFragment();
  domPool.forEach(item => fragment.appendChild(item));
  console.log(fragment);
  app.appendChild(fragment);
}