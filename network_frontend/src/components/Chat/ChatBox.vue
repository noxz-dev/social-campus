<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <div class="w-full px-5 flex flex-col items-between">
        <div class="flex flex-col mt-5">
          <message message="HEYYY" :positionRight="true"></message>
          <message message="HEYYY" :positionRight="false"></message>
        </div>
      </div>
    </div>
    <div class="py-5 p-2">
      <input
        class="w-full dark:bg-dark-600 py-5 px-3 rounded-lg text-dark-900 dark:text-gray-50"
        type="text"
        placeholder="type your message here..."
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Message from './Message.vue';
export default defineComponent({
  props: {},
  components: { Message },
  setup() {
    return {};
  },
});
</script>
<style></style>
