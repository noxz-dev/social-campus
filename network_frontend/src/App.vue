<template>
  <div id="app" class="">
    <div v-if="showLogin" class="h-screen">
      <router-view></router-view>
    </div>
    <div v-else ckass="w-full flex">
      <notifications-overlay />
      <side-bar />
      <top-bar />
      <Contentview />
      <audio id="notificationSound" src="/notification.mp3" muted></audio>
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
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

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
* {
  -webkit-tap-highlight-color: transparent;
}

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
@screen md {
  *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.897);
    box-shadow: inset 0 0 6px #ffffff;
    border-radius: 10px;
    background-color: #ffffff;
  }
  *::-webkit-scrollbar {
    width: 12px;
    background-color: #ffffff;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.4);
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.4);
    background-color: #d8d8d8;
  }

  .dark *::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px #181a20;
    box-shadow: inset 0 0 6px #181a20;
    background-color: #181a20;
  }
  .dark *::-webkit-scrollbar {
    width: 12px;
    background-color: #181a20;
  }
  .dark *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #363b41;
  }
}
</style>
