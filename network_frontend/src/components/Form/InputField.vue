<template>
  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center" :class="'pl-' + iconPadding">
      <slot name="icon"></slot>
    </div>
    <input
      class="dark:text-gray-100 w-full border text-gray-900 dark:bg-dark500 border-dark500 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-highlight-500 focus:ring-highlight-500"
      :type="type"
      :value="modelValue"
      @input="onChanged"
      :placeholder="placeholder"
      :class="condtionalClasses"
      :autocomplete="autocomplete"
      :required="required"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'InputField',
  emits: ['update:modelValue'],
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
  },
  setup(props, { emit, slots }) {
    const hasIconSlot = computed(() => slots['icon']);
    const condtionalClasses = computed(() => {
      return props.inputClasses + (hasIconSlot.value ? ' pl-' + props.inputInset : '');
    });
    const onChanged = (e) => emit('update:modelValue', e.currentTarget.value);
    return { hasIconSlot, onChanged, condtionalClasses };
  },
});
</script>

<style></style>
