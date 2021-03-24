<template>
  <div class="w-full">
    <div class="bg-white dark:text-white shadow-2xl rounded-lg mb-6 tracking-wide" :class="'dark:' + bgColorDark">
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
