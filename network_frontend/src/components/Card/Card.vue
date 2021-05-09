<template>
  <div class="w-full">
    <div
      class="bg-gray-100 dark:text-white dark:shadow-xl shadow-lg rounded-xl tracking-wide border border-gray-200 dark:border-dark-600"
      :class="'dark:' + bgColorDark"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    bgColorDark: {
      type: String,
      default: 'bg-dark-600',
    },
  },
  setup() {},
});
</script>
