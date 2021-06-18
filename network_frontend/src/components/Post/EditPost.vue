<template>
  <div class="flex w-full rounded-lg dark:text-white flex-col mb-8 transition-all duration-1000">
    <span class="my-4">Ändere den Text deines Posts</span>
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
import { computed, defineComponent, PropType, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { useEditPostMutation } from '../../graphql/generated/types';
import ToggleButton from '../Form/ToggleButton.vue';
import { Post } from '../../graphql/generated/types';
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
    const previewUrl = ref();
    const activeTrigger = ref('#');


    //input validation rules
    const rules = computed(() => ({
      message: {
        required,
        minLength: minLength(1),
      },
    }));

    const v = useVuelidate(rules, { message });

    //register the mutation to edit the post
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

    /**
     * validates the input and updates the post with the new content
     */
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
      previewUrl,
      autoCompleteOptions,
    };
  },
});
</script>

<style></style>
