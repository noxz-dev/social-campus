<template>
  <div class="flex flex-col justify-between h-full relative">
    <div
      v-show="dragover"
      v-bind="getRootProps()"
      class="
        rounded-lg
        absolute
        dark:text-gray-50
        text-gray-900
        inset-2
        bottom-24
        flex
        justify-center
        items-center
        dark:bg-dark-80
      "
      :class="
        isDragActive
          ? 'border border-dashed border-dark-700 dark:bg-dark-800 bg-gray-200 bg-opacity-90 dark:border-gray-100 !z-40'
          : ''
      "
    >
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive" class="text-xl">Ziehe Datei hierhin</p>
    </div>
    <div class="rounded-full h-28 w-28 fixed bottom-32 mb-1 md:bottom-24 pl-2 z-40" v-if="previewUrl">
      <img :src="previewUrl" class="rounded-xl h-28 w-28 object-cover" />
      <div>
        <button
          @click="
            () => {
              previewUrl = '';
              file = undefined;
            }
          "
          class="
            z-50
            absolute
            right-1
            top-1
            bg-black
            text-white
            bg-opacity-80
            hover:opacity-75
            transition
            shadow
            rounded-full
            h-6
            w-6
            flex
            items-center
            justify-center
            focus:outline-none
            focus:ring-2 focus:ring-white
          "
        >
          <svg viewBox="0 0 24 24" class="fill-white">
            <g>
              <path
                d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
    <div
      id="chatContainer"
      ref="chatContainer"
      class="overflow-y-auto"
      @dragover="dragover = true"
      @mouseleave="dragover = false"
    >
      <div class="w-full px-1 flex flex-col items-between">
        <div class="flex flex-col mt-5">
          <div v-for="message in chat?.messages" :key="message.id">
            <message
              :message="message.content"
              :media="message.media"
              :createdAt="new Date(message.createdAt)"
              :positionRight="message.sendBy.id === user.id"
            ></message>
          </div>
        </div>
      </div>
    </div>
    <unicode-emoji-picker
      filters-position="left"
      ref="emojiPicker"
      class="absolute bottom-36 right-7 md:bottom-24 md:right-28"
      v-show="emojiPickerOpen"
    ></unicode-emoji-picker>
    <div class="w-full pb-32 md:pb-0">
      <div class="pb-4 md:pb-5 p-2 pt-1 w-full mb-14 md:mb-0 fixed md:static bottom-0 dark:bg-dark-700 bg-white">
        <input-field
          :showExtraButton="true"
          :showButton="true"
          v-model="newMessage"
          :iconPadding="4"
          inputClasses="text-sm md:text-md p-4 !pr-[9.5rem] md:!pr-[11.5rem]"
          buttonText="Senden"
          placeholder="Schreibe eine Nachricht"
          @focus="emojiPickerOpen = false"
          @clicked="sendMessage"
          ref="input"
        >
          <template v-slot:extraButton>
            <div @click="openChooseFile">
              <svg
                class="
                  mr-2
                  dark:hover:bg-dark-800
                  hover:bg-gray-200
                  transition
                  stroke-black
                  dark:stroke-white
                  rounded-full
                "
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.21 7.89979V16.0498C21.21 19.0698 19.32 21.1998 16.3 21.1998H7.65C4.63 21.1998 2.75 19.0698 2.75 16.0498V7.89979C2.75 4.87979 4.64 2.75079 7.65 2.75079H16.3C19.32 2.75079 21.21 4.87979 21.21 7.89979Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.28131 16.4321L6.81031 14.8191C7.36131 14.2371 8.28631 14.2341 8.84231 14.8111L9.72731 15.7141C10.3243 16.3231 11.3173 16.2791 11.8583 15.6201L14.0873 12.9091C14.7273 12.1301 15.9013 12.0821 16.6023 12.8051L18.6783 14.9471"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.3135 9.13419C10.3135 10.1022 9.52752 10.8882 8.55952 10.8882C7.59152 10.8882 6.80652 10.1022 6.80652 9.13419C6.80652 8.16619 7.59152 7.38019 8.55952 7.38019C9.52752 7.38019 10.3135 8.16619 10.3135 9.13419Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 256 256"
              class="
                dark:hover:bg-dark-800
                hover:bg-gray-200
                transition
                fill-dark-600
                dark:fill-white
                stroke-black
                dark:stroke-white
                rounded-full
              "
              @click="emojiPickerOpen = !emojiPickerOpen"
            >
              <circle
                cx="128"
                cy="128"
                r="96"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              ></circle>
              <path
                d="M169.57812,151.99627a48.02731,48.02731,0,0,1-83.15624.00073"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              ></path>
              <circle cx="92" cy="108" r="12"></circle>
              <circle cx="164" cy="108" r="12"></circle></svg
          ></template>
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
import { Chat, useChatByIdQuery, useSendMessageMutation } from '../../graphql/generated/types';
import Message from './Message.vue';
import { useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useMagicKeys } from '@vueuse/core';
import { useStore } from 'vuex';
import { EmojiPickerElement } from 'unicode-emoji-picker';
import 'unicode-emoji-picker';
import { useRoute } from 'vue-router';
import { useDropzone } from 'vue3-dropzone';
import { myChats } from '../../graphql/queries/myChats';

export default defineComponent({
  props: {},
  components: { Message, InputField },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const newMessage = ref('');
    const previewUrl = ref();
    const file = ref<File>();
    const chatContainer = ref();
    const { enter } = useMagicKeys();
    const route = useRoute();
    const emojiPickerOpen = ref(false);
    const emojiPicker = ref<EmojiPickerElement>();
    const input = ref();
    const dragover = ref(false);

    //register key watcher to send message on enter
    watch(enter, (v) => {
      if (v) sendMessage();
    });

    //fetch a chat by a given id
    const { result, onResult, subscribeToMore } = useChatByIdQuery(() => ({
      chatId: route.params.id as string,
    }));

    const chat = useResult(result, null, (data) => data.chatById);

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
        chatId: route.params.id,
      },
      updateQuery(prev, { subscriptionData: { data } }) {
        if (prev.chatById.messages.some((p) => p.id == data.newMessage.id)) {
          return prev;
        }
        return Object.assign({}, prev, {
          chatById: [data.newMessage, prev.chatById.messages!],
        });
      },
    }));

    //register the send message mutation
    const { mutate: send } = useSendMessageMutation(() => ({
      variables: {
        input: {
          chatId: route.params.id as string,
          message: newMessage.value,
          file: file.value,
        },
      },
      refetchQueries: [
        {
          query: myChats,
        },
      ],
      update: (cache, { data: { sendMessage } }) => {
        //add the new message to the cache
        cache.modify({
          id: cache.identify(chat.value as Chat),
          fields: {
            messages(existingMessages = []) {
              const newMessageRef = cache.writeFragment({
                data: sendMessage,
                fragment: gql`
                  fragment NewMessage on ChatMessage {
                    id
                    content
                    createdAt
                    media {
                      name
                      blurhash
                    }
                    sendBy {
                      id
                    }
                  }
                `,
              });
              return [...existingMessages, newMessageRef];
            },
          },
        });
      },
    }));

    /**
     * on file drop callback
     */
    const onDrop = (acceptFiles: any[], rejectReasons: any[]) => {
      previewUrl.value = URL.createObjectURL(acceptFiles[0]);
      file.value = acceptFiles[0];
    };

    //register file dropzone
    const { acceptedFiles, getRootProps, getInputProps, ...dropUtils } = useDropzone({
      onDrop,
      noClick: true,
      accept: 'image/jpeg, image/png, image/gif',
      maxFiles: 1,
    });

    /**
     * validate the state and sends the chat message
     */
    async function sendMessage() {
      scrollDown();
      if (newMessage.value.length > 0 || file.value) {
        try {
          await send();
        } finally {
          previewUrl.value = '';
          file.value = undefined;
          newMessage.value = '';
          emojiPickerOpen.value = false;
        }
      }
    }

    const openChooseFile = () => {
      dropUtils.open();
    };

    /**
     * scrolls automaticly down to the newst message
     */
    function scrollDown() {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }

    onResult((data) => {
      setTimeout(() => {
        scrollDown();
      }, 0);
    });

    onMounted(() => {
      input.value.focus();
      emojiPicker.value?.addEventListener('emoji-pick', (event) => {
        newMessage.value += event.detail.emoji;
      });
    });

    watch(
      () => route.params.id,
      () => {
        input.value.focus();
      }
    );

    return {
      chat,
      newMessage,
      sendMessage,
      chatContainer,
      scrollDown,
      user,
      emojiPickerOpen,
      emojiPicker,
      input,
      getRootProps,
      getInputProps,
      ...dropUtils,
      openChooseFile,
      previewUrl,
      file,
      dragover,
    };
  },
});
</script>
<style>
unicode-emoji-picker {
  /* Because the component is built using the "em" unit, everything is scaled up from the font-size */
  /* So you should probably only change this value if you want to resize the component */
  /* It also directly reflects the font-size for the emoji font */
  font-size: 18px;
  max-width: 16em;
}

.dark unicode-emoji-picker {
  --fill-color: #393938;
  --text-color: #fffffc;
  --box-shadow: 0 8px 30px 0 rgba(0, 0, 0, 0.35);
  --filters-border-color: #30302a;
  --filter-fill-color-hover: #454540;
  --content-scrollbar-thumb-fill-color: #50504a;
  --content-scrollbar-thumb-fill-color-hover: #76766f;
  --filter-active-marker-border-color: #595955;
  --title-bar-fill-color: rgba(57, 57, 55, 0.96);
  --search-input-border-color: #50504a;
  --search-input-border-color-hover: #eee;
  --emoji-border-color-hover: #595955;
  --variations-backdrop-fill-color: rgba(57, 57, 55, 0.8);
  --emoji-variation-marker-border-color: #50504a;
  --emoji-variation-marker-border-color-hover: #76766f;
}
</style>
