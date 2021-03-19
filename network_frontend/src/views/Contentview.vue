<template>
  <div id="contentView">
    <router-view
      class="md:rounded-2xl md:rounded-r-none md:rounded-b-none border-2 border-r-0 border-b-0 border-dark600 h-full xl:ml-44 ml-0 md:ml-16 border-l-0 md:border-l-2"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style>
#contentView {
  /* padding: 0px 10px 20px 10px; */
  padding-top: 70px;
  height: 100vh;
}
</style>
