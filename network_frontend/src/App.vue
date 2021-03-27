<template>
  <div id="app" class="dark:bg-dark700">
    <div v-if="showLogin" class="h-screen">
      <router-view></router-view>
    </div>
    <div v-else ckass="w-full flex">
      <notifications-overlay />
      <side-bar />
      <top-bar />
      <Contentview />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Contentview from '@/views/Contentview.vue';
import SideBar from './components/Sidebar/Sidebar.vue';
import TopBar from '@/components/TopBar.vue';
import { useRoute } from 'vue-router';
import NotificationsOverlay from './components/NotificationsOverlay.vue';

export default defineComponent({
  name: 'App',
  components: {
    Contentview,
    TopBar,
    SideBar,
    NotificationsOverlay,
  },
  setup() {
    const showLogin = ref(true);
    const route = useRoute();

    watch(
      () => route.path,
      async (newParams) => {
        showLogin.value = route.path === '/login';
      }
    );

    return {
      showLogin,
    };
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
  background: #181a20;
}
body::-webkit-scrollbar {
  display: none;
}
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #272b2f;
}
*::-webkit-scrollbar {
  width: 12px;
  background-color: #272b2f;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #363b41;
}
</style>
