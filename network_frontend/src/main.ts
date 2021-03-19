import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import mitt from 'mitt';
import { createApp, h, provide } from 'vue';
import DKToast from 'vue-dk-toast';
// import 'windi.css';
import { defaultClient } from './apollo';
import App from './App.vue';
import './index.css';
import router from './router';
import store from './store';

//create event bus
const eventbus = mitt();

const notificationConfig = {
  positionY: 'top', // 'top' or 'bottom'
  positionX: 'right', // 'left', 'right' or 'center'
  class: 'notification',
};

const app = createApp({
  setup() {
    provideApolloClient(defaultClient);
    provide(DefaultApolloClient, defaultClient);
  },
  render() {
    return h(App);
  },
})
  .use(DKToast, notificationConfig)
  .use(router)
  .use(store);

app.config.globalProperties.eventbus = eventbus;

app.mount('#app');
