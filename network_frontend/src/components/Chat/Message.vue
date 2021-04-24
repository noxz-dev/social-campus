<template>
  <div class="w-full">
    <div class="flex mb-2 w-full" :class="positionRight ? 'justify-end' : 'justify-start'">
      <div>
        <div
          v-if="positionRight"
          class="mr-2 py-2 px-4 max-w-xs md:max-w-xl bg-highlight-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-xl text-white"
        >
          <span class="break-words">{{ message }}</span>
          <span class="ml-2 text-[0.7rem] text-gray-300">{{ dayjs(createdAt).format('HH:mm') }}</span>
        </div>
        <div v-else class="mr-2 py-2 px-4 max-w-xl bg-gray-500 rounded-br-2xl rounded-tl-2xl rounded-tr-xl text-white">
          <span class="break-words">{{ message }}</span>
          <span class="ml-2 text-[0.7rem] text-gray-300">{{ dayjs(createdAt).format('HH:mm') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
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
    createdAt: {
      type: Date,
      required: true,
    },
  },
  setup() {
    return {
      dayjs,
    };
  },
});
</script>
<style></style>
