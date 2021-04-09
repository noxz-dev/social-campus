<template>
  <button
    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-highlight-600 hover:bg-highlight-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {},
});
</script>

<style></style>
