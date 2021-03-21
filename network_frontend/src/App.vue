<template>
  <div id="app" class="dark:bg-dark700">
    <div v-if="showLogin">
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

.notification {
  @apply bg-highlight-700 py-5 text-gray-50 z-50 mt-20 md:max-w-xs xl:ml-80 lg:ml-28 !important;
}
</style>
