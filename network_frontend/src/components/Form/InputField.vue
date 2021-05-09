<template>
  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center" :class="'pl-' + iconPadding">
      <slot name="icon"></slot>
    </div>
    <input
      ref="input"
      class="dark:text-gray-100 w-full border pr-28 md:pr-36 text-gray-900 dark:bg-dark-600 border-dark-500 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-brand-500 focus:ring-brand-500"
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
      class="my-2 px-4 inset-y-0 flex cursor-pointer absolute md:right-24 right-16 rounded-xl text-white items-center"
    >
      <slot name="extraButton"></slot>
    </div>

    <button
      v-if="showButton"
      @click="emitClick"
      class="inset-y-0 md:hidden cursor-pointer px-6 bg-brand-500 absolute text-center right-0 rounded-lg items-center justify-center font-medium duration-100"
    >
      <slot name="mobileIcon" />
    </button>
    <app-button
      v-if="showButton"
      class="hidden my-2 px-4 inset-y-0 md:flex cursor-pointer absolute right-3 rounded-lg"
      @click="emitClick"
    >
      {{ buttonText }}
    </app-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'InputField',
  emits: ['update:modelValue', 'focus'],
  props: {
    modelValue: String | Number,
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
  },
  setup(props, { emit, slots }) {
    const hasIconSlot = computed(() => slots['icon']);
    const input = ref();

    const emitClick = () => emit('clicked');

    const condtionalClasses = computed(() => {
      return props.inputClasses + (hasIconSlot.value ? ' pl-' + props.inputInset : '');
    });

    const onChanged = (e) => emit('update:modelValue', e.currentTarget.value);

    const focus = () => {
      input.value.focus();
    };

    return { hasIconSlot, onChanged, condtionalClasses, emitClick, input, focus };
  },
});
</script>

<style></style>
