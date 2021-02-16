<template>
  <div
    id="profile"
    class="flex h-full items-center pt-10 bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto text-gray-100"
  >
    PROFILE
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style>
#profile::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #272b2f;
}
#profile::-webkit-scrollbar {
  width: 12px;
  background-color: #272b2f;
}
#profile::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #363b41;
}
</style>
