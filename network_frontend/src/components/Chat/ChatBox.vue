<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <div class="w-full px-5 flex flex-col items-between">
        <div class="flex flex-col mt-5">
          <div class="flex justify-end mb-4">
            <div class="mr-2 py-3 px-4 bg-highlight-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-xl text-white">
              first chat message
            </div>
          </div>
          <div class="flex justify-start mb-4 w-2/3">
            <div class="ml-2 py-3 px-4 bg-dark-400 rounded-br-2xl rounded-tr-2xl rounded-tl-xl text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat at praesentium, aut ullam delectus odio
              error sit rem. Architecto nulla doloribus laborum illo rem enim dolor odio saepe, consequatur quas?
            </div>
          </div>
          <div class="flex justify-end mb-4">
            <div>
              <div class="mr-2 py-3 px-4 bg-highlight-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-xl text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, repudiandae.
              </div>

              <div class="mt-4 mr-2 py-3 px-4 bg-highlight-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-xl text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis!
              </div>
            </div>
          </div>
          <div class="flex justify-start mb-4">
            <div class="ml-2 py-3 px-4 bg-dark-400 rounded-br-2xl rounded-tr-2xl rounded-tl-xl text-white">
              hey cool whatsup
            </div>
          </div>
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
export default defineComponent({
  props: {},
  setup() {
    return {};
  },
});
</script>
<style></style>
