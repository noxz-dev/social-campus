<template>
  <div class="flex w-full rounded-lg dark:text-white flex-col mb-8 transition-all duration-1000">
    <tribute-textarea
      :autocompleteOptions="autoCompleteOptions"
      :showPreview="showPreview"
      placeholder-text="Hey, was gibt's Neues ?"
      v-model="message"
    ></tribute-textarea>
    <div class="flex justify-between">
      <span
        class="text-xs mt-2 hover:text-highlight-500 cursor-pointer flex items-center hover:underline"
        @click="openMarkdownDoc"
      >
        <span class="">🛈 Markdown wird unterstützt</span></span
      >
      <span
        class="text-xs mt-2 hover:text-highlight-500 cursor-pointer flex items-center hover:underline"
        @click="showPreview = !showPreview"
      >
        <span class="">markdown vorschau</span></span
      >
    </div>

    <div class="h-8">
      <div class="text-red-400" v-for="(error, index) in v.message.$errors" :key="index">
        <span v-if="(file && error.$validator !== 'required') || !file"
          >{{ error.$message
          }}<span v-if="v.message.$errors && message.length > 1000">aktuell {{ message.length }}</span></span
        >
      </div>
    </div>
    <div v-if="!previewUrl && showToggle" class="flex my-4">
      <div class="mr-4">Bild oder Datei Hochladen?</div>
      <toggle-button @toggleStateUpdate="toggle" />
    </div>
    <div v-if="showImageUpload">
      <div
        v-bind="getRootProps()"
        class="border border-dashed p-8 rounded-lg"
        :class="isDragActive ? 'border-brand-500' : 'border-dark-700 dark:border-gray-100'"
      >
        <input v-bind="getInputProps()" />
        <p v-if="isDragActive">Lass einfach los</p>
        <p v-else-if="!isDragActive && !previewUrl">Ziehe eine Datei hierher, oder klicke um eine Datei auszuwählen</p>
      </div>
    </div>
    <div v-if="previewUrl" id="preview" class="flex flex-col items-center relative">
      <img class="w-full rounded-lg h-52 object-cover border" v-if="previewUrl" :src="previewUrl" />
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
          left-2
          top-2
          bg-black
          text-white
          bg-opacity-80
          hover:stroke-red hover:fill-red
          fill-white
          transition
          shadow
          rounded-full
          h-8
          w-8
          flex
          items-center
          justify-center
          focus:outline-none focus:ring-2 focus:ring-white
        "
      >
        <svg viewBox="0 0 24 24" class="">
          <g>
            <path
              d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
            ></path>
          </g>
        </svg>
      </button>
    </div>
    <div v-if="showFilePreview">
      <div class="dark:bg-dark-600 bg-gray-200 p-5 rounded-lg w-full">
        <div class="flex justify-between w-full items-center">
          <div>
            <svg
              class="w-10 h-10 dark:stroke-white stroke-black"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.7367 2.7619H8.08369C6.02469 2.7619 4.24969 4.4309 4.24969 6.4909V17.2039C4.24969 19.3799 5.90869 21.1149 8.08369 21.1149H16.0727C18.1327 21.1149 19.8017 19.2649 19.8017 17.2039V8.0379L14.7367 2.7619Z"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.474 2.75021V5.65921C14.474 7.07921 15.623 8.23121 17.042 8.23421C18.359 8.23721 19.706 8.23821 19.797 8.23221"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M14.284 15.5578H8.88699" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.2425 10.6056H8.88651" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="truncate p-2">{{ dataFile?.name }}</div>
          <div
            role="button"
            tabindex="0"
            @keydown.enter="
              () => {
                previewUrl = '';
                dataFile = undefined;
                showFilePreview = false;
                showToggle = true;
              }
            "
            class="
              p-2
              border
              dark:border-white
              border-black
              rounded-full
              hover:stroke-red hover:fill-red
              transition-all
              dark:fill-white
              flex
              items-center
              justify-center
            "
            @click="
              () => {
                previewUrl = '';
                dataFile = undefined;
                showFilePreview = false;
                showToggle = true;
              }
            "
          >
            <svg viewBox="0 0 24 24" class="w-6">
              <g>
                <path
                  d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-row-reverse">
    <app-button class="ml-4" @click="post">
      Posten
      <svg
        class="animate-spin ml-2 mr-1 h-5 w-5 text-white"
        v-if="loading"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <svg
        v-else
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="ml-2 h-6 w-6"
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
    </app-button>
    <app-button class="!bg-dark-400 hover:!bg-red-700" @click="$emit('close')"> Abbrechen </app-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import { getFeed } from '../../graphql/queries/getFeed';
import useVuelidate from '@vuelidate/core';
import { minLength, required, maxLength, helpers } from '@vuelidate/validators';
import { getPostsFromUser } from '../../graphql/queries/postFromUser';
import { useAddPostMutation } from '../../graphql/generated/types';
import ToggleButton from '../Form/ToggleButton.vue';
import { useRoute } from 'vue-router';
import { Tag, User } from '../../graphql/generated/types';
import VueTribute from '../VueTribute.vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { browsePosts } from '../../graphql/queries/browsePosts';
import { getPostsFromGroup } from '../../graphql/queries/getPostsFromGroup';
import { useMagicKeys } from '@vueuse/core';
import { EmojiPickerElement } from 'unicode-emoji-picker';
import { parseMarkdown } from '../../utils/postUtils';
import 'unicode-emoji-picker';
import TributeTextarea from '../../components/Form/TributeTextarea.vue';
export default defineComponent({
  components: { ToggleButton, VueTribute, TributeTextarea },
  emits: ['close'],
  setup(_, { emit }) {
    const message = ref('');
    const route = useRoute();
    const file = ref<File>();
    const previewUrl = ref();
    const tags = ref<string[]>();
    const showImageUpload = ref(false);
    const groupId = ref();
    const { control_enter } = useMagicKeys();
    const emojiOpen = ref(false);
    const emojiPicker = ref<EmojiPickerElement>();
    const showPreview = ref(false);
    const showFilePreview = ref(false);
    const activeTrigger = ref('#');
    const showToggle = ref(true);
    const dataFile = ref<File>();

    watch(
      () => message.value,
      () => {
        if (
          message.value.charAt(message.value.length - 1) === '#' ||
          message.value.charAt(message.value.length - 1) === '@'
        ) {
          activeTrigger.value = message.value.charAt(message.value.length - 1);
        }
      }
    );

    //register key handler to send the post with ctrl + enter
    watch(control_enter, (v) => {
      if (v) post();
    });

    const toggle = () => {
      showImageUpload.value = !showImageUpload.value;
    };

    //validation rules
    const rules = computed(() => ({
      message: {
        required: helpers.withMessage('Du musst schon was eingeben...', required),
        minLength: helpers.withMessage('Du musst schon was eingeben...', minLength(1)),
        maxLength: helpers.withMessage('Maximal 1500 Zeichen, ', maxLength(1500)),
      },
    }));

    const v = useVuelidate(rules, { message });

    const { mutate: newPost, loading } = useAddPostMutation(() => ({
      variables: {
        input: {
          content: message.value,
          image: file.value,
          groupId: groupId.value,
          tags: tags.value,
          file: dataFile.value,
        },
      },
      context: {
        hasUpload: true,
      },
      update: (cache, { data: { addPost } }) => {
        //add the new post to the cache
        try {
          if (route.path === '/home') {
            const dataInStore: any = cache.readQuery({ query: getFeed, variables: { offset: 0, limit: 10 } });
            cache.writeQuery({
              query: getFeed,
              variables: {
                offset: 0,
                limit: 10,
              },
              data: {
                ...dataInStore,
                getFeed: [...dataInStore.getFeed, addPost],
              },
            });
          } else if (route.path.includes('/user')) {
            const dataInStoreProfile: any = cache.readQuery({
              query: getPostsFromUser,
              variables: { userID: route.params.id },
            });
            cache.writeQuery({
              query: getPostsFromUser,
              variables: { userID: route.params.id },
              data: {
                ...dataInStoreProfile,
                getPostsFromUser: [...dataInStoreProfile.getPostsFromUser, addPost],
              },
            });
          } else if (route.path === '/browse') {
            const dataInStore: any = cache.readQuery({
              query: browsePosts,
              variables: { skip: 0, take: 10, tags: [] },
            });
            cache.writeQuery({
              query: browsePosts,
              variables: {
                skip: 0,
                take: 10,
                tags: [],
              },
              data: {
                ...dataInStore,
                browsePosts: [...dataInStore.browsePosts, addPost],
              },
            });
          } else if (route.name === 'Group') {
            const dataInStore: any = cache.readQuery({
              query: getPostsFromGroup,
              variables: { groupId: groupId.value },
            });
            cache.writeQuery({
              query: getPostsFromGroup,
              variables: {
                groupId: groupId.value,
              },
              data: {
                ...dataInStore,
                getPostsFromGroup: [...dataInStore.getPostsFromGroup, addPost],
              },
            });
          }
        } catch (err) {
          console.log(err);
        }
      },
    }));

    /**
     * dropzone file callback, to handle the droped file
     */
    const onDrop = (acceptFiles: any[], rejectReasons: any[]) => {
      if (acceptFiles[0].type.includes('pdf')) {
        showImageUpload.value = false;
        showFilePreview.value = true;
        showToggle.value = false;
        dataFile.value = acceptFiles[0];
      } else {
        previewUrl.value = URL.createObjectURL(acceptFiles[0]);
        file.value = acceptFiles[0];
        showImageUpload.value = false;
      }
    };

    //find all tags and post the post
    const post = async () => {
      v.value.$touch();
      if (v.value.$errors.length !== 0) {
        if (!file.value && !dataFile.value) return;
      }
      try {
        let foundTags = message.value.match(/#[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g);
        if (foundTags) {
          foundTags = foundTags?.map((tag) => tag.replace('#', ''));
          tags.value = [...foundTags];
        }
        if (route.path.includes('/groups/') && route.params.id) groupId.value = route.params.id;
        await newPost();
      } finally {
        emit('close');
      }
    };

    const openMarkdownDoc = () => {
      window.open('https://guides.github.com/features/mastering-markdown/');
    };

    //setup the file dropzone
    const { getRootProps, getInputProps, ...rest } = useDropzone({
      onDrop,
      accept: 'image/jpeg, image/png, image/gif, .pdf',
    });

    const { onResult: onTags } = useQuery(gql`
      query {
        getAllTags {
          id
          name
        }
      }
    `);

    //set tags and update the format
    onTags(({ data: { getAllTags } }) => {
      const tags = getAllTags.map((tag: Tag) => {
        return { key: tag.name, value: tag.name };
      });
      autoCompleteOptions.collection[1].values.push(...tags);
    });

    //options for tag, mention autocomplete
    const autoCompleteOptions = {
      noMatchTemplate() {
        if (activeTrigger.value === '#') return '<li>Kein Tag gefunden - Tag wird erstellt</li>';
        else if (activeTrigger.value === '@') return '<li>Kein Benutzer gefunden</li>';
      },
      collection: [
        {
          trigger: '@',
          values: [] as string[],
          positionMenu: true,
        },
        {
          trigger: '#',
          values: [] as string[],
          positionMenu: true,
        },
      ],
    };

    const { onResult: onUsers } = useQuery(gql`
      query {
        getUsers {
          id
          firstname
          lastname
          username
        }
      }
    `);

    //set users and change format for the auto complete
    onUsers(({ data: { getUsers } }) => {
      const users = getUsers.map((user: User) => {
        return { key: user.firstname + ' ' + user.lastname + ' @' + user.username, value: user.username };
      });
      autoCompleteOptions.collection[0].values.push(...users);
    });

    return {
      message,
      post,
      v,
      showImageUpload,
      previewUrl,
      toggle,
      getRootProps,
      getInputProps,
      ...rest,
      autoCompleteOptions,
      openMarkdownDoc,
      emojiOpen,
      emojiPicker,
      loading,
      parseMarkdown,
      showPreview,
      file,
      showFilePreview,
      showToggle,
      dataFile,
    };
  },
});
</script>

<style></style>
