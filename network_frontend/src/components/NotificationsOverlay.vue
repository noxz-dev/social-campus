<template></template>

<script lang="ts">
import { useNotificationsSubscription } from '../graphql/generated/types';
import { defineComponent, inject, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vue-dk-toast';

export default defineComponent({
  setup() {
    const store = useStore();
    const toast = inject<Toast>('$toast');
    const user = computed(() => store.state.userData.user);

    const subscriptionEnabled = ref(false);

    watch(
      () => store.state.userData.user,
      () => {
        if (user.value.id) {
          subscriptionEnabled.value = true;
        }
      }
    );

    const { onResult } = useNotificationsSubscription(
      () => ({
        userId: user.value.id,
      }),
      () => ({
        enabled: subscriptionEnabled.value,
      })
    );

    onResult(({ data }) => {
      console.log('sub', data);
      if (toast)
        toast(data.notifications.message, {
          positionY: 'top',
          slotLeft: `<div class="p-1 bg-highlight-800 rounded-full"> <img class="rounded-full w-10 h-10" src="/profile-pics/${data.notifications.fromUser.avatar.name}"/></div>`,
        });
    });
  },
});
</script>

<style>
.dk__toast-container,
.dk__toast-mobile-container {
  width: 100% !important;
}

.dk__toast-section {
  @apply mt-20 !important;
}

.dk__toast-top-right {
  align-items: flex-end;
}

.notification {
  @apply sm:w-full bg-highlight-700 py-4 md:w-[20rem] text-gray-50 z-40  !important;
}
</style>
