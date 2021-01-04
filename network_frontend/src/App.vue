<template>
  <Contentview />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Contentview from "./views/Contentview.vue";

export default defineComponent({
  name: "App",
  components: {
    Contentview,
  },
});
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
