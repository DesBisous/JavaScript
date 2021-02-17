import { createApp } from '../vue';

import ComponentA from './components/ComponentA';
import ComponentB from './components/ComponentB';

const app = createApp({
  compontents: [
    ComponentA,
    ComponentB
  ]
});

app.mount('#app');