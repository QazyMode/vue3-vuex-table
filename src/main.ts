import { createApp } from 'vue';
import {
  Button,
  Input,
  InputNumber,
  Table,
} from 'ant-design-vue';

import App from './App.vue';
import { store } from './store';

createApp(App)
  .use(InputNumber)
  .use(Button)
  .use(Input)
  .use(Table)
  .use(store)
  .mount('#app');
