<template>
  <button
    type="button"
    @click="toggle()"
    class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-none focus:outline-none focus:ring-2 focus:ring-brand"
    aria-pressed="false"
    :class="toggleState ? 'bg-brand-500' : 'bg-dark-400'"
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
      :class="toggleState ? 'translate-x-5' : 'translate-x-0'"
    ></span>
  </button>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'InputField',
  emits: ['toggleStateUpdate'],
  props: {
    initalState: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, slots }) {
    const toggleState = ref(props.initalState);
    const toggle = () => {
      toggleState.value = !toggleState.value;
      emit('toggleStateUpdate', toggleState.value);
    };
    return { toggle, toggleState };
  },
});
</script>

<style></style>
