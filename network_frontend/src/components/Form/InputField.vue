<template>
  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center" :class="'pl-' + iconPadding">
      <slot name="icon"></slot>
    </div>
    <input
      ref="input"
      class="
        dark:text-gray-100
        w-full
        border
        pr-28
        md:pr-36
        text-gray-900
        dark:bg-dark-600
        border-dark-500
        rounded-lg
        placeholder-gray-400
        focus:outline-none focus:ring-1 focus:border-brand-500 focus:ring-brand-500
      "
      :type="type"
      :value="modelValue"
      @input="onChanged"
      :placeholder="placeholder"
      :class="condtionalClasses"
      :autocomplete="autocomplete"
      :required="required"
      :disabled="disabled"
      @focus="$emit('focus')"
    />

    <div
      v-if="showExtraButton"
      class="my-2 px-4 inset-y-0 flex cursor-pointer absolute md:right-24 right-16 rounded-xl text-white items-center"
    >
      <slot name="extraButton"></slot>
    </div>

    <button
      v-if="showButton"
      @click="emitClick"
      :disabled="disabled"
      class="
        inset-y-0
        md:hidden
        cursor-pointer
        px-6
        bg-brand-500
        absolute
        text-center
        right-0
        rounded-lg
        items-center
        justify-center
        font-medium
        duration-100
      "
    >
      <slot name="mobileIcon" />
    </button>
    <app-button
      :disabled="disabled"
      v-if="showButton"
      class="hidden my-2 px-4 inset-y-0 md:flex cursor-pointer absolute right-3 rounded-lg"
      @click="emitClick"
    >
      <div v-if="!disabled">{{ buttonText }}</div>
      <svg
        class="animate-spin ml-2 mr-1 h-5 w-5 text-white"
        v-if="disabled"
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
    </app-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'InputField',
  emits: ['update:modelValue', 'focus', 'clicked'],
  props: {
    modelValue: String,
    placeholder: String,
    name: String,
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    inputInset: {
      type: Number,
      default: 14,
    },
    iconPadding: {
      type: Number,
      default: 2,
    },
    inputClasses: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
    },
    showButton: {
      type: Boolean,
    },
    showExtraButton: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, slots }) {
    const hasIconSlot = computed(() => slots['icon']);
    const input = ref();

    const emitClick = () => emit('clicked');

    const condtionalClasses = computed(() => {
      return props.inputClasses + (hasIconSlot.value ? ' pl-' + props.inputInset : '');
    });

    const onChanged = (e: any) => emit('update:modelValue', e.currentTarget.value);

    const focus = () => {
      input.value.focus();
    };

    return { hasIconSlot, onChanged, condtionalClasses, emitClick, input, focus };
  },
});
</script>

<style></style>
