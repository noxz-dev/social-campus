<template>
  <button
    :disabled="disabled"
    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-700 focus:ring-brand-500 disabled:opacity-50"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
});
</script>

<style></style>
