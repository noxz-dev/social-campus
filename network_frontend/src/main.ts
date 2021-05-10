import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import mitt from 'mitt';
import 'viewerjs/dist/viewer.css';
import { createApp, h, provide } from 'vue';
import DKToast from 'vue-dk-toast';
import { defaultClient } from './apollo';
import App from './App.vue';
import LazyImageVue from './components/Blurhash/LazyImage.vue';
import AppButton from './components/Form/AppButton.vue';
import './index.css';
import './markdown.css';
import router from './router';
import store from './store';
import vViewer from './utils/vViewer';

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
  .use(vViewer, 'viewer')
  .use(router)
  .use(store);

app.component('app-button', AppButton);
app.component('lazy-image', LazyImageVue);

app.config.globalProperties.eventbus = eventbus;
app.mount('#app');
