<template>
  <!-- <side-bar />
  <top-bar /> -->
  <div id="contentView">
    <router-view class="rounded-2xl rounded-r-none rounded-b-none border-2 border-r-0 border-b-0 border-dark600 h-full xl:ml-44 ml-16" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SideBar from '@/components/SideBar.vue';
import TopBar from '@/components/TopBar.vue';
export default defineComponent({
  components: {
    TopBar,
    SideBar,
  },
});
</script>

<style>
#contentView {
  /* padding: 0px 10px 20px 10px; */
  padding-top: 70px;
  height: 100vh;
}
</style>
