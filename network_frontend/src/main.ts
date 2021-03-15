import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import mitt from 'mitt';
import { createApp, h, provide } from 'vue';
// import 'windi.css';
import { defaultClient } from './apollo';
import App from './App.vue';
import './index.css';
import router from './router';
import store from './store';

//create event bus
const eventbus = mitt();

const app = createApp({
  setup() {
    provideApolloClient(defaultClient);
    provide(DefaultApolloClient, defaultClient);
  },
  render() {
    return h(App);
  },
})
  .use(router)
  .use(store);

app.config.globalProperties.eventbus = eventbus;

app.mount('#app');
