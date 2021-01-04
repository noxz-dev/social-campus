<template>
  <div
    class="flex justify-center items-center w-5/6 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/4 h-48 dark:bg-gray-800 rounded-lg dark:text-white flex-col mb-8"
  >
    <div class="text-2xl p-3 font-bold">Neuer Post</div>
    <textarea class="bg-gray-700 w-5/6 h-24 resize-none rounded-lg p-2 outline-none" placeholder="hey, was machst du gerade ?"></textarea>
    <div class="bg-blue-400 p-2 rounded-lg self-end mt-4 mb-4 mr-4 cursor-pointer">Posten</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style></style>
