<template>
  <div>
    <div class="flex justify-center py-2">
      <app-button @click="modal?.openModal()">Erstelle einen neuen Chat</app-button>
    </div>
    <div class="pb-20">
      <div v-for="chat in chats" :key="chat.id">
        <button
          class="dark:bg-dark-700 w-full h-20 p-0.5 my-1.5 focus:outline-indigo-500 text-left"
          @click="setActiveChat(chat.id)"
        >
          <div
            :class="chat.id === $route.params.id ? 'dark:!bg-dark-600 !bg-gray-200' : ''"
            class="cursor-pointer rounded-lg border dark:border-dark-600 bg-white dark:bg-dark-700 dark:hover:!bg-dark-600 hover:!bg-gray-200 px-6 py-5 shadow-sm flex items-center space-x-3 hover:!border-gray-400"
          >
            <div class="flex-shrink-0" v-if="chat">
              <img
                class="h-10 w-10 rounded-full object-cover"
                :src="chat.members.filter((m) => m.id !== user.id)[0].profilePicLink"
                alt=""
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="focus:outline-none">
                <p class="text-sm font-medium dark:text-gray-50 text-gray-900">
                  {{ chat.members.filter((m) => m.id !== user.id)[0].firstname }}
                </p>
                <p class="text-sm text-gray-500 truncate">letzte nachricht</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>

    <modal ref="modal" content-text="" header-text="Neuer Chat">
      <new-chat
        @close="
          () => {
            modal?.closeModal();
            refetch();
          }
        "
      />
    </modal>
  </div>
</template>
<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, ref } from 'vue';
import { useMyChatsQuery } from '../../graphql/generated/graphqlOperations';
import Modal from '../../components/Modal.vue';
import NewChat from './NewChat.vue';
import { chatState } from '../../utils/chatState';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import breakpoints from '../../utils/breakpoints';
export default defineComponent({
  emits: ['user-choosen'],
  components: { NewChat, Modal },
  props: {},
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const user = computed(() => store.state.userData.user);

    const modal = ref<InstanceType<typeof Modal>>();
    const { result, refetch, onResult } = useMyChatsQuery();

    const chats = useResult(result, null, (data) => data.myChats);
    let firstload = true;
    onResult(() => {
      console.log('set active chat');
      if (chats.value && breakpoints.is !== 'sm' && firstload && route.name !== 'ChatBox')
        router.push({ name: 'ChatBox', params: { id: chats.value[0].id } });
      firstload = false;
    });

    const setActiveChat = (chatId: string) => {
      console.log('UPDATED CHAT');
      router.push({ name: 'ChatBox', params: { id: chatId } });
      emit('user-choosen');
      console.log(chatId);
    };

    return { chats, modal, refetch, setActiveChat, chatState, user };
  },
});
</script>
<style></style>
