<template>
  <div
    v-if="open"
    class="fixed z-60 inset-0 overflow-y-auto"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        class="fixed inset-0 transition-opacity"
        aria-hidden="true"
      >
        <div class="absolute inset-0 bg-darkTheme-700 opacity-75" />
      </div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >&#8203;</span>
      <div
        class="inline-block align-bottom bg-white dark:bg-darkTheme-600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white dark:bg-darkTheme-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3
                v-if="headerText"
                id="modal-headline"
                class="text-2xl leading-6 font-medium text-gray-900 dark:text-gray-200"
              >
                {{ headerText }}
              </h3>
              <div class="mt-6">
                <p
                  v-if="contentText"
                  class="text-sm dark:text-gray-200 text-gray-900"
                >
                  {{ contentText }}
                </p>
              </div>
              <slot />
            </div>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-darkTheme-600 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"> 
          <a
            href="#"
            class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-darkTheme-700 focus:ring-indigo-500"
            @click="method"
          >
            Posten
          </a>
          <a
            href="#"
            class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-darkTheme-700 focus:ring-indigo-500"
            @click="closeModal"
          >
            Schließen
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent } from "vue"
export default defineComponent({
    props: {
    headerText: {
      type: String,
      default:"header"
    },
    contentText: {
      type: String,
      default:"content"
    },
    method: {
        type: Function,
        default: () => console.log("button clicked")
    }
    },
    data() {
    return {
      open: false,
    }
  },
  methods: {
    openModal() {
      this.open = true
    },
    closeModal() {
      this.open = false
    },
  },
})
</script>

<style></style>
