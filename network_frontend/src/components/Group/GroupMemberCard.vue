<template>
  <div>
    <button
      class="dark:bg-dark-700 w-full focus:outline-indigo-500 text-left"
      @click="
        () => {
          $router.push({ name: 'Profile', params: { id: username } });
        }
      "
    >
      <div
        class="cursor-pointer rounded-lg border dark:border-dark-600 bg-white dark:bg-dark-700 dark:hover:!bg-dark-600 hover:!bg-gray-200 px-6 py-2 pl-1 shadow-sm flex items-center space-x-3 hover:!border-gray-400"
      >
        <div class="flex-shrink-0">
          <img class="w-10 rounded-full object-cover bg-dark-700" alt="" :src="avatar" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="focus:outline-none">
            <p class="text-sm font-medium dark:text-gray-50 text-gray-900">{{ firstname + ' ' + lastname }}</p>
          </div>
          <div class="dark:text-gray-50 text-xs">
            <span class="flex items-center text-green-500" v-if="status"
              ><div class="h-2 rounded-full w-2 bg-green-500 mr-2"></div>
              online</span
            >
            <span class="flex items-center text-gray-400" v-else
              ><div class="h-2 rounded-full w-2 bg-gray-500 mr-2"></div>
              offline</span
            >
          </div>
        </div>
      </div>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    firstname: String,
    lastname: String,
    username: String,
    status: Boolean,
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
  },
  setup() {
    return {};
  },
});
</script>
<style></style>
