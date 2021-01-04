<template>
  <div class="relative flex w-full">
    <side-bar></side-bar>
    <div class="w-full">
      <top-bar></top-bar>
      <div class="w-full h-full">
        <router-view class="pl-14 md:px-12 py-16" />
      </div>
    </div>
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

<style></style>
