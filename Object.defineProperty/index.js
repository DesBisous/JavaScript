import observer from './observer.js';

!(function (doc) {
  const name = doc.querySelector('#name');
  const email = doc.querySelector('#email');
  const age = doc.querySelector('#age');
  const submit = doc.querySelector('#submit');

  const info = observer({ name: '', email: '', age: '' });
  
  console.log(info);

  submit.addEventListener('click', function (e) {
    info['name'] = name.value;
    info['email'] = email.value;
    info['age'] = age.value;
  })
})(document)