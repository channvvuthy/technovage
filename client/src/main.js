import { createApp, provide, h } from 'vue';
import { createPinia } from 'pinia';
import { DefaultApolloClient } from '@vue/apollo-composable';

import App from './App.vue';
import router from './router';
import CoreuiVue from '@coreui/vue';
import CIcon from '@coreui/icons-vue';
import { iconsSet as icons } from '@/assets/icons';
import DocsExample from '@/components/DocsExample';
import apolloClient from './apollo';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(createPinia());
app.use(router);
app.use(CoreuiVue);
app.provide('icons', icons);
app.component('CIcon', CIcon);
app.component('DocsExample', DocsExample);

app.mount('#app');
