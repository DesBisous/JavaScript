import tpl from './tpl.js';

export default function observer(info) {

  const infoData = {};

  init();
  initInfoData();


  function initInfoData() {
    for (const key in info) {
      if (Object.hasOwnProperty.call(info, key)) {
        Object.defineProperty(infoData, key, {
          get() {
            return info[key];
          },
          set(newValue) {
            if (!newValue || info[key] === newValue) return;
            info[key] = newValue;
            localStorage.setItem('info', JSON.stringify(info));
            document.querySelector(`.__${key}`).innerHTML = info[key];
          }
        });
      }
    }
  }

  function init() {
    let localInfo = localStorage.getItem('info');
    if (localInfo) {
      localInfo = JSON.parse(localInfo);
      for (const key in localInfo) {
        if (Object.hasOwnProperty.call(localInfo, key)) {
          if (info[key] !== localInfo[key]) {
            info[key] = localInfo[key];
          }
        }
      }
    }
    render(info);
  }

  function render(data) {
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const age = document.querySelector('#age');
    const infoTable = document.querySelector('#infoTable');
    name.value = data.name || undefined;
    email.value = data.email || undefined;
    age.value = data.age || undefined;
    infoTable.innerHTML = tpl(data);
  }

  return infoData;
}