<template>
  <div>
    <div v-for="index in 30" :key="index">
      <div class="dark:bg-dark-700 w-full h-20 p-0.5 my-1.5">
        <div
          :class="index === 1 ? 'dark:!bg-dark-600 !bg-gray-200' : ''"
          class="cursor-pointer rounded-lg border dark:border-dark-600 bg-white dark:bg-dark-700 dark:hover:!bg-dark-600 hover:!bg-gray-200 px-6 py-5 shadow-sm flex items-center space-x-3 hover:!border-gray-400"
        >
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80"
              alt=""
            />
          </div>
          <div class="flex-1 min-w-0">
            <div class="focus:outline-none">
              <p class="text-sm font-medium dark:text-gray-50 text-gray-900">Leslie Alexander</p>
              <p class="text-sm text-gray-500 truncate">letzte nachricht</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {},
  setup() {
    return {};
  },
});
</script>
<style></style>
