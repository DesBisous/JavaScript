const reg = /\{\{(.*?)\}\}/g
const direactives = ['v-for'];

export function compile(template, state) {
  const dom = document.createElement('div');
  dom.innerHTML = template;
  handleCompile(dom.querySelector('ul'), state);
  dom.innerHTML = dom.innerHTML.replace(reg, function (match, pKey) { 
    return state[pKey.trim()];
  })
  return dom;
}

function handleCompile(dom, state) {
  const childrens = dom.childNodes;
  childrens.forEach(element => {
    if (element.nodeType === 1) {
      if (direactives.includes(element.tagName.toLowerCase())) {
        switch (element.tagName.toLowerCase()) {
          case 'v-for':
            const fragment = document.createDocumentFragment();
            const key = element.getAttribute('list');
            const tag = element.getAttribute('tag');
            const _class = element.getAttribute('class');
            const list = state[key];
            list.forEach(item => {
              const domItem = document.createElement(tag);
              domItem.setAttribute('class', _class);
              const childStr = element.innerHTML.replace(reg, function (match, attrKey) {
                const _attrKey = attrKey.trim();
                return item[_attrKey];
              })
              domItem.innerHTML = childStr;
              fragment.appendChild(domItem)
            })
            element.parentNode.replaceChild(fragment, element)
            break;
          default:
            break;
        }
      }
    }
    element.childNodes && handleCompile(element, state);
  });
}