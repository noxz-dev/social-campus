<template>
  <div class="flex w-full rounded-lg dark:text-white flex-col mb-8 transition-all duration-1000">
    <span class="my-4">Ändere den Text deines Posts</span>
    <!-- <textarea
      v-model="message"
      class="
        dark:bg-dark-600
        border-2 border-gray-700
        h-24
        resize-none
        rounded-lg
        p-2
        outline-none
        focus:ring-1 focus:ring-brand-500
        focus:border-indigo-500
      "
      placeholder="Hey, was gibt's Neues ?"
      @blur="v.message.$touch"
    /> -->
    <tribute-textarea
      :autocompleteOptions="autoCompleteOptions"
      :showPreview="false"
      placeholder-text="Hey, was gibt's Neues ?"
      v-model="message"
    ></tribute-textarea>
    <div class="h-8">
      <div v-if="v.message.$error" class="text-red-400">Du musst schon was eingeben...</div>
    </div>
  </div>
  <div class="flex flex-row-reverse">
    <button
      class="
        ml-6
        inline-flex
        items-center
        px-4
        py-2
        border border-transparent
        text-sm
        font-medium
        rounded-md
        shadow-sm
        text-white
        bg-brand-600
        hover:bg-brand-700
        focus:outline-none
        focus:ring-2 focus:ring-offset-2
        dark:focus:ring-offset-dark-700
        focus:ring-brand-500
      "
      @click="updatePost"
    >
      Ändern
    </button>
    <button
      class="
        ml-3
        inline-flex
        items-center
        px-4
        py-2
        border border-transparent
        text-sm
        font-medium
        rounded-md
        shadow-sm
        text-white
        bg-red-600
        hover:bg-red-700
        focus:outline-none
        focus:ring-2 focus:ring-offset-2
        dark:focus:ring-offset-dark-700
        focus:ring-brand-500
      "
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
import { useEditPostMutation } from '../../graphql/generated/types';
import ToggleButton from '../Form/ToggleButton.vue';
import { Post } from '../../graphql/generated/types';
import { getFeed } from '../../graphql/queries/getFeed';
import { useRoute } from 'vue-router';
import { browsePosts } from '../../graphql/queries/browsePosts';
import TributeTextarea from '../../components/TributeTextarea.vue';
export default defineComponent({
  emits: ['close'],
  components: { ToggleButton, TributeTextarea },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const message = ref(props.post?.text);
    const file = ref<File>();
    const previewUrl = ref();
    const showImageUpload = ref(false);
    const route = useRoute();
    const activeTrigger = ref('#');

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
      variables: {
        input: {
          postId: props.post.id,
          content: message.value as string,
        },
      },
      context: {
        hasUpload: true,
      },
      update: (cache, { data: { editPost } }) => {
        cache.modify({
          id: cache.identify(props.post),
          fields: {
            text() {
              return 'ABC';
            },
          },
          broadcast: true,
          optimistic: true,
        });
      },
    }));

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
      autoCompleteOptions,
    };
  },
});
</script>

<style></style>
