<template>
  <div>
    <div class="flex justify-end mb-4" :class="positionRight ? 'justify-end' : 'justify-start'">
      <div>
        <div
          v-if="positionRight"
          class="mt-4 mr-2 py-3 px-4 bg-highlight-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-xl text-white"
        >
          {{ message }}
        </div>
        <div v-else class="mt-4 mr-2 py-3 px-4 bg-gray-500 rounded-br-2xl rounded-tl-2xl rounded-tr-xl text-white">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
    positionRight: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style></style>
