<template>
  <div class="bg-gray-100 px-4 py-5 sm:px-6 rounded-lg w-full dark:bg-dark600">
    <div class="flex space-x-3">
      <div class="flex-shrink-0 dark:bg-dark-500 rounded-full">
        <div class="h-10 w-10 rounded-full" />
      </div>
      <div class="min-w-0 flex-1">
        <div class="text-sm bg-dark-500 w-40 h-4 rounded-xl"></div>
        <div class="bg-dark-500 w-20 h-4 rounded-xl mt-1"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PermissionContainer from '../PermissionContainer.vue';

export default defineComponent({
  components: { PermissionContainer },
});
</script>

<style scoped></style>
