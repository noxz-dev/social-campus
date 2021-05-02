<template></template>

<script lang="ts">
import { NotificationType, useNotificationsSubscription } from '../graphql/generated/types';
import { defineComponent, inject, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vue-dk-toast';
import { Howl } from 'howler';
import lazyImage from '../components/Blurhash/LazyImage.vue';

export default defineComponent({
  components: {
    lazyImage,
  },
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
      if (data?.notifications.type === NotificationType.NewChatMessage) {
        let sound = new Howl({
          src: ['/notification.mp3'],
          volume: 0.1,
        });
        sound.play();
      }
      if (toast)
        toast(data.notifications.message, {
          positionY: 'top',
          slotLeft: `<div class="p-1 bg-highlight-800 rounded-full"> <img  class="rounded-full w-10 h-10" src="/profile-pics/${data.notifications.fromUser.avatar.name}" /></div>`,
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
  @apply mt-20;
}

.dk__toast-mobile-section {
  @apply mt-16;
}

.dk__toast-top-right {
  align-items: flex-end;
}

.notification {
  @apply sm:w-full bg-highlight-700 py-4 md:w-[20rem] text-gray-50 z-40  !important;
}
</style>
