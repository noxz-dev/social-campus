import { reactive } from 'vue';

//save the lastview to enhance the user-experience
export const navState = reactive({
  lastView: localStorage.getItem('lastView') || '/home',
});
