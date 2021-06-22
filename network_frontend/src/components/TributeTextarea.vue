<template>
  <div>
    <vue-tribute :options="autocompleteOptions" elementId="newPostTextArea">
      <div class="w-full relative">
        <textarea
          ref="input"
          :value="modelValue"
          @input="onChanged"
          v-show="!showPreview"
          :class="'dark:bg-' + bgColor"
          id="newPostTextArea"
          class="
            w-full
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
          class="markdown dark:bg-gray-700 bg-gray-200 rounded-lg p-0.5"
          v-if="showPreview"
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
                dark:hover:bg-dark-800
                hover:bg-gray-200
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
    bgColor: {
      type: String,
      default: 'dark-600',
    },
  },
  setup(props, { emit }) {
    const emojiPicker = ref<EmojiPickerElement>();
    const emojiOpen = ref(false);
    const input = ref();

    const onChanged = (e: any) => {
      emit('update:modelValue', e.currentTarget.value);
    };

    //register emoji picker event
    onMounted(() => {
      emojiPicker.value?.addEventListener('emoji-pick', (event) => {
        emit('update:modelValue', props.modelValue + event.detail.emoji);
        emojiOpen.value = false;
      });
    });

    const focus = () => {
      input.value.focus();
    };

    return { emojiOpen, parseMarkdown, onChanged, input, emojiPicker, focus };
  },
});
</script>
<style>
unicode-emoji-picker {
  /* Because the component is built using the "em" unit, everything is scaled up from the font-size */
  /* So you should probably only change this value if you want to resize the component */
  /* It also directly reflects the font-size for the emoji font */
  font-size: 16px;
  max-width: 20em;
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
