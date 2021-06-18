import { createStore } from 'vuex';
import { userData } from './user.module';

//create the vuex store
export default createStore({
  modules: {
    userData,
  },
});
