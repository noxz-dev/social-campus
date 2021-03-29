<template>
  <div>
    <div id="groups" class="flex h-full items-center pt-10 bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto" />
    <div class="pl-2 hidden"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style>
#home::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #272b2f;
}
#home::-webkit-scrollbar {
  width: 12px;
  background-color: #272b2f;
}
#home::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #363b41;
}
</style>
