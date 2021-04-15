<template>
  <div class="flex w-full rounded-lg dark:text-white flex-col mb-8 transition-all duration-1000">
    <span class="my-4">Ändere den Text deines Posts</span>
    <textarea
      v-model="message"
      class="dark:bg-dark600 border-2 border-gray-700 h-24 resize-none rounded-lg p-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      placeholder="Hey, was gibt's Neues ?"
      @blur="v.message.$touch"
    />
    <div class="h-8">
      <div v-if="v.message.$error" class="text-red-400">Du musst schon was eingeben...</div>
    </div>
  </div>
  <div class="flex flex-row-reverse">
    <button
      class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
      @click="updatePost"
    >
      Ändern
    </button>
    <button
      class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
      @click="$emit('close')"
    >
      Abbrechen
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, PropType, ref } from 'vue';
import { Emitter } from 'mitt';
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { useEditPostMutation } from '../../graphql/generated/graphqlOperations';
import ToggleButton from '../Form/ToggleButton.vue';
import { EditPostMutationVariables, Post } from 'src/graphql/generated/types';
import { getFeed } from '../../graphql/queries/getFeed';
export default defineComponent({
  emits: ['close'],
  components: { ToggleButton },
  props: {
    post: Object as PropType<Post>,
  },
  setup(props, { emit }) {
    const message = ref(props.post?.text);
    const file = ref<File>();
    const previewUrl = ref();
    const showImageUpload = ref(false);

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

    const { mutate: editPost } = useEditPostMutation(() => ({
      variables: <EditPostMutationVariables>{
        text: message.value,
        postId: props.post?.id,
      },
      context: {
        hasUpload: true,
      },
      update: (cache, { data: { editPost } }) => {
        try {
          const dataInStore: any = cache.readQuery({
            query: getFeed,
            variables: {
              skip: 0,
              take: 10,
            },
          });
          const getFeedData = [...dataInStore.getFeed];
          getFeedData.forEach((post) => {
            if (post.id === editPost.id) {
              post = editPost;
            }
          });
          cache.writeQuery({
            query: getFeed,
            variables: {
              skip: 0,
              take: 10,
            },
            data: {
              ...dataInStore,
              getFeed: [...getFeedData],
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
    }));

    const updatePost = () => {
      v.value.$touch();
      if (v.value.$errors.length !== 0) return;
      editPost();
      emit('close');
    };

    return {
      message,
      updatePost,
      v,
      showImageUpload,
      previewUrl,
      toggle,
    };
  },
});
</script>

<style></style>
