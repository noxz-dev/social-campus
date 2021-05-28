<template>
  <div>
    <vue-tribute :options="autocompleteOptions" elementId="newPostTextArea">
      <div class="w-full relative">
        <textarea
          ref="input"
          :value="modelValue"
          @input="onChanged"
          v-if="!showPreview"
          id="newPostTextArea"
          class="
            w-full
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
          :placeholder="placeholderText"
        />
        <div
          class="markdown bg-gray-700 rounded-lg p-0.5"
          v-else
          v-html="parseMarkdown(modelValue).sanitizedContent"
        ></div>
        <div class="absolute rounded-full h-4 w-4 top-0 right-0 mt-1 mr-3" v-if="!showPreview">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 256 256"
              class="
                hover:bg-dark-800
                rounded-full
                transition
                fill-dark-600
                dark:fill-white
                stroke-black
                dark:stroke-white
              "
              @click="emojiOpen = !emojiOpen"
            >
              <rect width="256" height="256" fill="none"></rect>
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
              <circle cx="164" cy="108" r="12"></circle>
            </svg>
          </div>
          <unicode-emoji-picker
            filters-position="left"
            ref="emojiPicker"
            class="absolute right-0 -mr-2 z-20"
            v-show="emojiOpen"
          ></unicode-emoji-picker>
        </div>
      </div>
    </vue-tribute>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { parseMarkdown } from '../utils/postUtils';
import VueTribute from '../components/VueTribute.vue';
import 'unicode-emoji-picker';
import { EmojiPickerElement } from 'unicode-emoji-picker';
export default defineComponent({
  components: { VueTribute },
  emits: ['update:modelValue', 'focus'],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholderText: {
      type: String,
      required: true,
    },
    autocompleteOptions: {
      type: Object,
      required: true,
    },
    showPreview: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const emojiPicker = ref<EmojiPickerElement>();
    const emojiOpen = ref(false);
    const input = ref();

    const onChanged = (e: any) => {
      emit('update:modelValue', e.currentTarget.value);
    };

    onMounted(() => {
      emojiPicker.value?.addEventListener('emoji-pick', (event) => {
        emit('update:modelValue', props.modelValue + event.detail.emoji);
        emojiOpen.value = false;
      });
    });

    return { emojiOpen, parseMarkdown, onChanged, input, emojiPicker };
  },
});
</script>
<style></style>
