<template>
  <div class="flex flex-col justify-between h-full">
    <div id="chatContainer" ref="chatContainer" class="overflow-y-auto">
      <div class="w-full px-1 flex flex-col items-between">
        <div class="flex flex-col mt-5">
          <div v-for="message in chat?.messages" :key="message.id">
            <message :message="message.content" :positionRight="message.sendBy.id === user.id"></message>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="py-5 p-2 w-full mb-14 md:mb-0">
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
          <template v-slot:mobileIcon>
            <svg
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="h-6 w-6"
            >
              <g id="Iconly/Bulk/Send" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Send" transform="translate(2.000000, 2.000000)" fill-rule="nonzero">
                  <path
                    d="M19.4274202,0.578298605 C18.9274202,0.0672986048 18.1874202,-0.121701395 17.4974202,0.0782986048 L1.40742017,4.7272986 C0.679420165,4.9292986 0.163420165,5.5062986 0.024420165,6.2382986 C-0.117579835,6.9842986 0.378420165,7.9322986 1.02642017,8.3282986 L6.05742017,11.4002986 C6.57342017,11.7162986 7.23942017,11.6372986 7.66642017,11.2092986 L13.4274202,5.4482986 C13.7174202,5.1472986 14.1974202,5.1472986 14.4874202,5.4482986 C14.7774202,5.7372986 14.7774202,6.2082986 14.4874202,6.5082986 L8.71642017,12.2692986 C8.28842017,12.6972986 8.20842017,13.3612986 8.52342017,13.8782986 L11.5974202,18.9282986 C11.9574202,19.5272986 12.5774202,19.8682986 13.2574202,19.8682986 C13.3374202,19.8682986 13.4274202,19.8682986 13.5074202,19.8572986 C14.2874202,19.7582986 14.9074202,19.2272986 15.1374202,18.4772986 L19.9074202,2.5082986 C20.1174202,1.8282986 19.9274202,1.0882986 19.4274202,0.578298605"
                    id="Fill-1"
                    class="fill-white"
                  ></path>
                  <path
                    d="M7.45142017,17.1421986 C7.74342017,17.4351986 7.74342017,17.9101986 7.45142017,18.2031986 L6.08542017,19.5681986 C5.93942017,19.7151986 5.74742017,19.7881986 5.55542017,19.7881986 C5.36342017,19.7881986 5.17142017,19.7151986 5.02542017,19.5681986 C4.73242017,19.2751986 4.73242017,18.8011986 5.02542017,18.5081986 L6.39042017,17.1421986 C6.68342017,16.8501986 7.15842017,16.8501986 7.45142017,17.1421986 Z M6.66772017,13.3541986 C6.95972017,13.6471986 6.95972017,14.1221986 6.66772017,14.4151986 L5.30172017,15.7801986 C5.15572017,15.9271986 4.96372017,16.0001986 4.77172017,16.0001986 C4.57972017,16.0001986 4.38772017,15.9271986 4.24172017,15.7801986 C3.94872017,15.4871986 3.94872017,15.0131986 4.24172017,14.7201986 L5.60672017,13.3541986 C5.89972017,13.0621986 6.37472017,13.0621986 6.66772017,13.3541986 Z M2.90652017,12.1617986 C3.19852017,12.4547986 3.19852017,12.9297986 2.90652017,13.2227986 L1.54052017,14.5877986 C1.39452017,14.7347986 1.20252017,14.8077986 1.01052017,14.8077986 C0.818520165,14.8077986 0.626520165,14.7347986 0.480520165,14.5877986 C0.187520165,14.2947986 0.187520165,13.8207986 0.480520165,13.5277986 L1.84552017,12.1617986 C2.13852017,11.8697986 2.61352017,11.8697986 2.90652017,12.1617986 Z"
                    id="Combined-Shape"
                    opacity="0.400000006"
                    class="fill-white"
                  ></path>
                </g>
              </g>
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
import { Howl, Howler } from 'howler';
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
      updateQuery(result, { subscriptionData }) {
        if (subscriptionData.data.newMessage.sendBy.id !== user.value.id) {
          // new Audio('/notification.mp3').play();
          var sound = new Howl({
            src: ['/notification.mp3'],
          });

          sound.play();
        }
        return result;
      },
    }));

    const chat = useResult(result, null, (data) => data.chatById);

    const { mutate: send } = useSendMessageMutation(() => ({
      variables: <SendMessageMutationVariables>{
        chatId: chatState.activeChat,
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

    onMounted(() => {
      document.querySelector('body')?.click();
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
