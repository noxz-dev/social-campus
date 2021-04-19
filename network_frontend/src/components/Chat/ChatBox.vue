<template>
  <div class="flex flex-col justify-between h-full">
    <div id="chatContainer" ref="chatContainer" class="overflow-y-auto">
      <div class="w-full px-5 flex flex-col items-between">
        <div class="flex flex-col mt-5">
          <div v-for="message in chat?.messages" :key="message.id">
            <message :message="message.content" :positionRight="message.sendBy.id === user.id"></message>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="py-5 p-2 w-full">
        <input-field
          :showButton="true"
          v-model="newMessage"
          :iconPadding="4"
          inputClasses="text-sm md:text-md p-4"
          buttonText="Senden"
          placeholder="Schreibe eine Nachricht"
          @clicked="sendMessage"
        >
          <template v-slot:icon>
            <svg class="h-6 w-6 fill-gray-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.6115 2C6.30323 2 2 6.20819 2 11.3993C2 16.5903 6.30323 20.7985 11.6115 20.7985C13.8819 20.7985 15.9684 20.0287 17.613 18.7415L20.7371 21.7886L20.8202 21.8586C21.1102 22.0685 21.5214 22.0446 21.7839 21.7873C22.0726 21.5043 22.072 21.0459 21.7825 20.7636L18.6952 17.7523C20.2649 16.0794 21.2231 13.8487 21.2231 11.3993C21.2231 6.20819 16.9198 2 11.6115 2ZM11.6115 3.44774C16.1022 3.44774 19.7426 7.00776 19.7426 11.3993C19.7426 15.7908 16.1022 19.3508 11.6115 19.3508C7.12086 19.3508 3.48044 15.7908 3.48044 11.3993C3.48044 7.00776 7.12086 3.44774 11.6115 3.44774Z"
              />
            </svg>
          </template>
        </input-field>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import InputField from '../Form/InputField.vue';
import { useChatByIdQuery, useSendMessageMutation } from '../../graphql/generated/graphqlOperations';
import Message from './Message.vue';
import { useResult } from '@vue/apollo-composable';
import { SendMessageMutationVariables } from '../../graphql/generated/types';
import gql from 'graphql-tag';
import { useMagicKeys } from '@vueuse/core';
import { chatState } from '../../utils/chatState';
import { useStore } from 'vuex';
export default defineComponent({
  props: {},
  components: { Message, InputField },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const newMessage = ref('');
    const chatContainer = ref();
    const { enter } = useMagicKeys();

    watch(enter, (v) => {
      if (v) sendMessage();
    });

    const chatQueryEnabled = ref(false);

    watch(
      () => chatState.activeChat,
      () => {
        if (chatState.activeChat !== '') {
          chatQueryEnabled.value = true;
        }
      }
    );

    const { result, subscribeToMore, onResult } = useChatByIdQuery(
      () => ({
        chatId: chatState.activeChat,
      }),
      () => ({ enabled: chatQueryEnabled.value })
    );

    subscribeToMore(() => ({
      document: gql`
        subscription newMessage($chatId: String!) {
          newMessage(chatId: $chatId) {
            id
            content
            createdAt
            sendBy {
              id
            }
          }
        }
      `,
      variables: {
        chatId: chatState.activeChat,
      },
    }));

    const chat = useResult(result, null, (data) => data.chatById);

    const { mutate: send } = useSendMessageMutation(() => ({
      variables: <SendMessageMutationVariables>{
        chatId: '89cae01a-9600-4c3c-a07b-cc3c596b3610',
        message: newMessage.value,
      },
    }));

    function sendMessage() {
      scrollDown();
      if (newMessage.value.length > 0) {
        send();
        newMessage.value = '';
      }
    }

    function scrollDown() {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }

    onResult((data) => {
      setTimeout(() => {
        scrollDown();
      }, 0);
    });

    return {
      chat,
      newMessage,
      sendMessage,
      chatContainer,
      scrollDown,
      user,
    };
  },
});
</script>
<style></style>
