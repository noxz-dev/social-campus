<template>
  <div ref="target">
    <div class="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        @click="open = !open"
        class="dark:bg-dark-600 border border-dark-500 relative w-full rounded-md shadow-sm pl-3 pr-10 py-[0.62rem] text-left cursor-default focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
      >
        <span class="block truncate"> {{ selected }} </span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
      <div class="absolute mt-1 w-full rounded-md dark:bg-dark-400 bg-gray-100 shadow-lg z-10 overflow-auto">
        <ul
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          class="max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          v-if="open"
        >
          <li
            id="listbox-option-0"
            role="option"
            class="group text-whitetext-gray-100 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-brand-600 hover:text-white duration-100 rounded-lg"
            v-for="option in options"
            :key="option"
            @click="choose(option)"
          >
            <span class="block truncate" :class="selected == option ? 'font-semibold' : 'font-normal'">
              {{ option }}
            </span>

            <span
              class="text-highlight-500 group-hover:text-white absolute inset-y-0 right-0 flex items-center pr-4"
              v-if="option == selected"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
export default defineComponent({
  emits: ['valueChosen'],
  props: {
    options: {
      type: Array,
      default: [],
    },
    initalValue: {
      type: String,
    }
  },
  setup(props, { emit }) {
    if (props.options.length === 0) {
      props.options[0] = 'Kein Element zur Auswahl';
    }
    const selected = ref(props.initalValue || props.options[0]);
    const open = ref(false);
    const target = ref(null);
    const choose = (option) => {
      selected.value = option;
      open.value = false;
      emit('valueChosen', selected.value);
    };
    onClickOutside(target, () => (open.value = false));
    return {
      selected,
      open,
      choose,
      target,
    };
  },
});
</script>

<style></style>
