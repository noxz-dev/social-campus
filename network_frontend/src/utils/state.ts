import { reactive } from 'vue';

//small store to hold state
export const state = reactive({
  refreshGroup: false,
  groupError: false,
  showNewPostFloatingButton: false,
});
