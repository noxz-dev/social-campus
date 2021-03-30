<template>
  <div v-if="open" class="fixed z-50 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-800 opacity-75" />
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white dark:bg-dark600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 md:align-middle sm:max-w-xl w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white dark:bg-dark700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 sm:mt-0 sm:text-left w-full">
              <h3 v-if="headerText" id="modal-headline" class="text-2xl leading-6 font-medium text-gray-900 dark:text-gray-200">
                {{ headerText }}
              </h3>
              <div class="mt-6">
                <p v-if="contentText" class="text-sm dark:text-gray-200 text-gray-900">
                  {{ contentText }}
                </p>
              </div>
              <edit-post :post="post" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue';
import EditPost from './EditPost.vue';
export default defineComponent({
  components: {
    EditPost,
  },
  props: {
    headerText: {
      type: String,
      default: 'header',
    },
    contentText: {
      type: String,
      default: 'content',
    },
  },
  setup() {
    const open = ref(false);
    const post = ref();

    const openModal = (data) => {
      open.value = true;
      post.value = data;
    };

    const closeModal = () => {
      open.value = false;
    };

    const internalInstance = getCurrentInstance();
    if (internalInstance) {
      const eventbus = internalInstance.appContext.config.globalProperties.eventbus;
      eventbus?.on('close-edit-modal', () => closeModal());
      eventbus?.on('open-edit-modal', (data) => openModal(data));
    }

    return {
      open,
      openModal,
      closeModal,
      post,
    };
  },
});
</script>

<style></style>
