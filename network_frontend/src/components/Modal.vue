<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed z-40 inset-0 overflow-y-auto" @close="open = false" :open="open">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 dark:bg-dark-600 !bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom bg-white dark:bg-dark-700 rounded-lg text-left overflow-visible shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-xl w-full"
          >
            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <DialogTitle as="h3" class="text-2xl font-medium leading-6 pb-2 text-gray-900 dark:text-gray-50">
                    {{ headerText }}
                  </DialogTitle>
                  <div class="mt-2 w-full">
                    <slot />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue';
import { defineComponent, getCurrentInstance, ref } from 'vue';
export default defineComponent({
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
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

    /** 
     * opens the modal
    */
    const openModal = (payload?: any) => {
      open.value = true;
    };

    /**
     * closes the modal
     */
    const closeModal = () => {
      open.value = false;
    };

    return {
      open,
      openModal,
      closeModal,
    };
  },
});
</script>

<style></style>
