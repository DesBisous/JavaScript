export function compile(template, state) {
  console.log(template, state)
  const dom = document.createElement('div');
  dom.innerHTML = template;
  return dom;
}