<template>
  <div class="bg-dark-800 flex p-1 px-2 rounded-lg font-semibold shadow-lg text-xs md:text-base">
    <div>{{ name }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    name: String,
  },
  setup() {
    return {};
  },
});
</script>
<style></style>
