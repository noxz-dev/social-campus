import { reactive } from 'vue';

export const navState = reactive({
  lastView: localStorage.getItem('lastView') || '/home',
});
