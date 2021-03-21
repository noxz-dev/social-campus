<template></template>

<script>
import { useNotificationsSubscription } from '../graphql/generated/graphqlOperations';
import { defineComponent, inject, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const toast = inject('$toast');
    const user = computed(() => store.state.userData.user);

    const { onResult } = useNotificationsSubscription(() => ({
      userId: user.value.id,
    }));

    onResult(({ data }) => {
      console.log('sub', data);
      toast(data.notifications.message, {
        positionY: 'top',
        slotLeft: `<div class="p-1 bg-highlight-800 rounded-full"> <img class="rounded-full w-10 h-10" src="/profile-pics/f8d0783a-77b0-43bf-8e7e-b8aa3540e12f.png"/></div>`,
      });
    });
  },
});
</script>

<style></style>
