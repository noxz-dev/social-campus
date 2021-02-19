import { createStore } from 'vuex';
import { userData } from './user.module';

export default createStore({
  modules: {
    userData,
  },
});
