<template>
  <div class="flex w-full rounded-lg dark:text-white flex-col mb-8 transition-all duration-1000">
    <vue-tribute :options="autoCompleteOptions" elementId="newPostTextArea">
      <textarea
        id="newPostTextArea"
        v-model="message"
        class="dark:bg-dark600 border-2 border-gray-700 h-24 resize-none rounded-lg p-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Hey, was gibt's Neues ?"
        @blur="v.message.$touch"
      />
    </vue-tribute>
    <span class="text-xs mt-2 hover:text-highlight-500 cursor-pointer flex items-center" @click="openMarkdownDoku">
      <span class="m">Markdown wird unterstützt</span></span
    >
    <div class="h-8">
      <div v-if="v.message.$error" class="text-red-400">Du musst schon was eingeben...</div>
    </div>
    <div v-if="!previewUrl" class="flex my-4">
      <div class="mr-4">Bild Hochladen?</div>
      <toggle-button @toggleStateUpdate="toggle" />
    </div>
    <div v-if="showImageUpload">
      <div
        v-bind="getRootProps()"
        class="border border-dashed p-8 rounded-lg"
        :class="isDragActive ? 'border-highlight-500' : 'border-dark700 dark:border-gray-100'"
      >
        <input v-bind="getInputProps()" />
        <p v-if="isDragActive">Lass einfach los</p>
        <p v-else-if="!isDragActive && !previewUrl">Ziehe ein Bild hierher, oder klicke um ein Bild auszuwählen</p>
      </div>
    </div>
    <div v-if="previewUrl" id="preview" class="flex flex-col items-center relative">
      <img class="w-full rounded-lg h-52 object-cover border" v-if="previewUrl" :src="previewUrl" />
      <button
        @click="previewUrl = ''"
        class="z-50 absolute left-2 top-2 bg-black text-white bg-opacity-80 hover:opacity-75 transition shadow rounded-full h-8 w-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
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
  <div class="flex flex-row-reverse">
    <button
      class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
      @click="post"
    >
      Posten
      <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="ml-2 h-6 w-6">
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
    </button>
    <button
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-dark400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
      @click="eventbus.emit('close-modal')"
    >
      Abbrechen
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, unref } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import { getFeed } from '../graphql/queries/getFeed';
import { Emitter } from 'mitt';
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { getPostsFromUser } from '../graphql/queries/postFromUser';
import { useAddPostMutation } from '../graphql/generated/graphqlOperations';
import ToggleButton from '../components/ToggleButton.vue';
import { useRoute } from 'vue-router';
import { AddPostMutationVariables, Tag, User } from '../graphql/generated/types';
import VueTribute from './VueTribute.vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { browsePosts } from '../graphql/queries/browsePosts';
import { getPostsFromGroup } from '../graphql/queries/getPostsFromGroup';
export default defineComponent({
  components: { ToggleButton, VueTribute },
  setup() {
    const message = ref('');
    const route = useRoute();
    const file = ref<File>();
    const previewUrl = ref();
    const tags = ref<string[]>();
    const showImageUpload = ref(false);
    const groupId = ref();

    const toggle = () => {
      showImageUpload.value = !showImageUpload.value;
    };

    let eventbus: Emitter;
    const internalInstance = getCurrentInstance();
    if (internalInstance) {
      eventbus = internalInstance.appContext.config.globalProperties.eventbus;
    }

    const rules = computed(() => ({
      message: {
        required,
        minLength: minLength(1),
      },
    }));

    const v = useVuelidate(rules, { message });

    const { mutate: newPost } = useAddPostMutation(() => ({
      variables: <AddPostMutationVariables>{
        text: message.value,
        file: file.value,
        tags: tags.value,
        groupID: groupId.value,
      },
      context: {
        hasUpload: true,
      },
      update: (cache, { data: { addPost } }) => {
        try {
          if (route.path === '/home') {
            const dataInStore: any = cache.readQuery({ query: getFeed, variables: { skip: 0, take: 10 } });
            cache.writeQuery({
              query: getFeed,
              variables: {
                skip: 0,
                take: 10,
              },
              data: {
                ...dataInStore,
                getFeed: [...dataInStore.getFeed, addPost],
              },
            });
          } else if (route.path.includes('/user')) {
            const dataInStoreProfile: any = cache.readQuery({ query: getPostsFromUser, variables: { userID: route.params.id } });
            cache.writeQuery({
              query: getPostsFromUser,
              variables: { userID: route.params.id },
              data: {
                ...dataInStoreProfile,
                getPostsFromUser: [...dataInStoreProfile.getPostsFromUser, addPost],
              },
            });
          } else if (route.path === '/browse') {
            const dataInStore: any = cache.readQuery({ query: browsePosts, variables: { skip: 0, take: 10, tags: [] } });
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
            const dataInStore: any = cache.readQuery({ query: getPostsFromGroup, variables: { groupId: groupId.value } });
            cache.writeQuery({
              query: getPostsFromGroup,
              variables: {
                groupId: groupId.value,
              },
              data: {
                ...dataInStore,
                browsePosts: [...dataInStore.getPostsFromGroup, addPost],
              },
            });
          }
        } catch (err) {
          console.log(err);
        }
      },
    }));

    const onDrop = (acceptFiles: any[], rejectReasons: any[]) => {
      previewUrl.value = URL.createObjectURL(acceptFiles[0]);
      file.value = acceptFiles[0];
      showImageUpload.value = false;
    };

    const post = () => {
      v.value.$touch();
      if (v.value.$errors.length !== 0) {
        if (!file.value) return;
      }

      let foundTags = message.value.match(/#\w\w*/g);
      if (foundTags) {
        foundTags = foundTags?.map((tag) => tag.replace('#', ''));
        tags.value = [...foundTags];
      }
      if (route.path.includes('/groups/') && route.params.id) groupId.value = route.params.id;
      newPost();
      eventbus.emit('close-modal');
    };

    const openMarkdownDoku = () => {
      window.open('https://guides.github.com/features/mastering-markdown/');
    };

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

    const autoCompleteOptions = {
      collection: [
        {
          trigger: '@',
          values: [],
          positionMenu: true,
        },
        {
          trigger: '#',
          values: [],
          positionMenu: true,
        },
      ],
    };

    const { onResult: onTags } = useQuery(gql`
      query {
        getAllTags {
          id
          name
        }
      }
    `);

    onTags(({ data: { getAllTags } }) => {
      const tags = getAllTags.map((tag: Tag) => {
        return { key: tag.name, value: tag.name };
      });
      autoCompleteOptions.collection[1].values.push(...tags);
    });

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

    onUsers(({ data: { getUsers } }) => {
      const users = getUsers.map((user: User) => {
        return { key: user.firstname + ' ' + user.lastname, value: user.username };
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
      autoCompleteOptions,
      openMarkdownDoku,
      ...rest,
    };
  },
});
</script>

<style>
.tribute-container {
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(#000, 0.13);
}
.tribute-container ul {
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(#000, 0.13);
  background-clip: padding-box;
  overflow: hidden;
}
.tribute-container li {
  color: #3f5efb;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}
.tribute-container li.highlight,
.tribute-container li:hover {
  background: #3f5efb;
  color: #fff;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}
</style>
