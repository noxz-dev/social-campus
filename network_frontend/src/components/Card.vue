<template>
  <div class="w-full">
    <div
      class="bg-gray-50 dark:text-white shadow-xl rounded-lg mb-6 tracking-wide border border-gray-200 dark:border-dark600"
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
      default: 'bg-dark600',
    },
  },
  setup() {},
});
</script>
