<template>
  <div v-if="open" class="fixed z-50 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-dark-900 opacity-75" />
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white dark:bg-dark-600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 md:align-middle sm:max-w-xl w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white dark:bg-dark-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
              <div class="flex w-full rounded-lg dark:text-white flex-col mb-8 transition-all duration-1000">
                <span class="mb-2"></span>
                <div class="flex">
                  <input-field placeholder="Gruppenname" class="w-2/3 mr-6" />
                  <custom-select :options="SelectOptions" class="w-1/3" />
                </div>
                <textarea
                  class="dark:bg-[#3C3F48] border-2 mt-5 border-gray-700 h-24 resize-none rounded-lg p-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Gruppenbeschreibung"
                />
              </div>
              <div class="flex flex-row-reverse">
                <button
                  class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                  @click=""
                >
                  Gruppe erstellen
                </button>
                <button
                  class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                  @click="closeModal"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue';
import CustomSelect from './CustomSelect.vue';
import InputField from './InputField.vue';
export default defineComponent({
  components: { InputField, CustomSelect },
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

    const openModal = () => {
      open.value = true;
    };

    const closeModal = () => {
      open.value = false;
    };

    const internalInstance = getCurrentInstance();
    if (internalInstance) {
      const eventbus = internalInstance.appContext.config.globalProperties.eventbus;
      eventbus?.on('close-new-group-modal', () => closeModal());
      eventbus?.on('open-new-group-modal', () => openModal());
    }

    enum SelectOptions {
      PUBLIC = 'Öffentlich',
      PRIVATE = 'Privat',
    }

    return {
      open,
      openModal,
      closeModal,
      SelectOptions: Object.values(SelectOptions),
    };
  },
});
</script>

<style></style>
