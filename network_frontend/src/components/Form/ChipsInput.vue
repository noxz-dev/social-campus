<template>
  <div class="chip-container">
    <span
      v-for="(chip, i) of chips"
      :key="chip.label"
      class="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 mr-1 text-sm font-medium bg-red-100 text-red-800"
    >
      #{{ chip }}
      <button
        @click="deleteChip(i)"
        type="button"
        class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-black hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
      >
        <span class="sr-only">Remove tag</span>
        <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
          <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    </span>
    <input
      v-model="currentInput"
      @keypress.enter="saveChip"
      @keydown.delete="backspaceDelete"
      class="dark:bg-dark-700 bg-white dark:text-gray-50"
      :placeholder="inputPlaceholder"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    set: {
      type: Boolean,
      default: true,
    },
    startTags: {
      type: Array,
      default: [],
    },
    inputPlaceholder: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const chips = ref(props.startTags);
    const currentInput = ref('');

    watch(
      () => props.startTags,
      () => {
        chips.value = props.startTags;
      }
    );

    const saveChip = () => {
      const input = currentInput.value.replaceAll('#', '').replaceAll(' ', '');
      console.log(input);
      if (input === '') return;
      ((props.set && chips.value.indexOf(currentInput.value) === -1) || !props.set) && chips.value.push(input);
      currentInput.value = '';
    };
    const deleteChip = (index: number) => {
      chips.value.splice(index, 1);
    };

    const backspaceDelete = ({ which }) => {
      which == 8 && currentInput.value === '' && chips.value.splice(chips.value.length - 1);
    };

    return {
      chips,
      currentInput,
      saveChip,
      deleteChip,
      backspaceDelete,
    };
  },
});
</script>

<style>
.chip-container {
  @apply bg-white border-b-2 dark:border-white border-black;
  @apply dark:bg-dark-700;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
}

.chip-container input {
  flex: 1 1 auto;
  border: none;
  outline: none;
  padding: 4px;

  /* border: 1px solid white; */
}
</style>