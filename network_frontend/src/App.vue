<template>
  <div
    id="app"
    class="dark:bg-dark700"
  >
    <side-bar />
    <top-bar />
    <Contentview />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Contentview from "@/views/Contentview.vue";
import SideBar from '@/components/SideBar.vue';
import TopBar from '@/components/TopBar.vue';
export default defineComponent({
  name: "App",
  components: {
    Contentview,
    TopBar,
    SideBar,
  },
});
</script>

<style>
:root {
  --height-header: 0px;
  --width-sideBar: 100%;
  --height-sideBar: 50px;
  --margin-left-sidebar: 11rem;
}
body {
  background: #181A20;
}
body::-webkit-scrollbar {
  display: none;
}
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>