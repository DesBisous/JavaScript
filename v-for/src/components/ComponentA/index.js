import { reactive } from '../../../vue/reactive';

const template = `
  <ul>
    <h1>{{ title }}</h1>
    <p>{{ time }}</p>
    <v-for list="data" tag="li" class="item">
      <span>姓名: {{ name }}</span>
      <span>年龄: {{ age }}</span>
    </v-for>
  </ul>
`;

export default function () {
  const state = reactive({
    title: 'ComponentA',
    time: '2021-02-17',
    data: [
      {
        name: '小敏',
        age: '18'
      },
      {
        name: '小明',
        age: '17',
      },
      {
        name: '小白',
        age: '18'
      }
    ],
  });

  setTimeout(function () {
    state.time = '2021-02-18';
  }, 3000)

  return [template, state];
}