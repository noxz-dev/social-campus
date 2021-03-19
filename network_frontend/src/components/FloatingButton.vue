<template>
  <div class="fixed z-60 bottom-0 right-0 mr-5 mb-20 md:mb-10 md:mr-10">
    <button
      type="button"
      class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: String,
  },
  setup() {
    console.log('hey loaded');
  },
});
</script>

<style></style>
