<template>
  <div v-if="open" class="fixed z-60 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="inline-block align-bottom bg-white dark:bg-dark600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        ref="target"
      >
        <div class="flex h-98">
          <div class="h-full w-full">
            <div>
              <img
                class="object-cover"
                src="https://images.unsplash.com/photo-1501884428012-aa321a256730?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80"
                alt=""
              />
            </div>
          </div>
          <div class="w-2/4 bg-green-500 h-full">
            <div>USER AND COMMENTS</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from 'vue';
import { onClickOutside } from '@vueuse/core';
export default defineComponent({
  props: {
    postId: String,
  },
  setup() {
    const open = ref(false);
    const target = ref(null);

    const openModal = () => {
      open.value = true;
    };

    const closeModal = () => {
      open.value = false;
    };

    const internalInstance = getCurrentInstance();
    if (internalInstance) {
      const eventbus = internalInstance.appContext.config.globalProperties.eventbus;
      eventbus?.on('close-post-modal', () => closeModal());
      eventbus?.on('open-post-modal', () => {
        console.log('open trigger');
        openModal();
      });
    }

    onClickOutside(target, (event) => {
      closeModal();
    });

    return {
      target,
      open,
      openModal,
      closeModal,
    };
  },
});
</script>

<style></style>
