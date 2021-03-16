<template>
  <div id="app" class="dark:bg-dark700">
    <div v-if="showLogin">
      <router-view></router-view>
    </div>
    <div v-else>
      <side-bar />
      <top-bar />
      <Contentview />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Contentview from '@/views/Contentview.vue';
import SideBar from '@/components/SideBar.vue';
import TopBar from '@/components/TopBar.vue';
import { useRoute } from 'vue-router';
import { useSubscription } from '@vue/apollo-composable';
import gql from 'graphql-tag';
export default defineComponent({
  name: 'App',
  components: {
    Contentview,
    TopBar,
    SideBar,
  },
  setup() {
    const showLogin = ref(true);
    const route = useRoute();

    const { onResult } = useSubscription(gql`
      subscription newPost {
        newPost {
          id
          text
        }
      }
    `);

    onResult((res) => {
      console.log('sub triggerd');
      console.log(res);
    });

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
</style>
