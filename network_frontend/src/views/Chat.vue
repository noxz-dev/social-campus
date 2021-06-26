<template>
  <div>
    <div id="chats" class="flex h-full items-center bg-white dark:bg-dark-700 flex-col rounded-2xl overflow-y-auto">
      <div class="w-full h-full flex">
        <div
          id="userContainer"
          v-if="$route.name !== 'ChatBox' || breakpoints.is !== 'sm'"
          class="w-full md:w-1/4 dark:bg-dark-700 h-full overflow-y-auto border-r border-dark-500"
        >
          <chat-users @user-choosen="usersActive = false" />
        </div>
        <div class="flex-1 dark:bg-dark-700 h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ChatUsers from '../components/Chat/ChatUsers.vue';
import breakpoints from '../utils/breakpoints';
import ChatBox from '../components/Chat/ChatBox.vue';

export default defineComponent({
  components: { ChatUsers, ChatBox },
  setup() {
    const usersActive = ref(true);

    return {
      usersActive,
      breakpoints,
    };
  },
});
</script>

<style>
@screen md {
  #userContainer::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.897);
    box-shadow: inset 0 0 6px #ffffff;
    border-radius: 10px;
    background-color: #ffffff;
  }
  #userContainer::-webkit-scrollbar {
    width: 4px;
    background-color: #ffffff;
  }
  #userContainer::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.4);
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.4);
    background-color: #d8d8d8;
  }

  .dark #userContainer::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px #181a20;
    box-shadow: inset 0 0 6px #181a20;
    background-color: #181a20;
  }
  .dark #userContainer::-webkit-scrollbar {
    width: 4px;
    background-color: #181a20;
  }
  .dark #userContainer::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #363b41;
  }
}
</style>
