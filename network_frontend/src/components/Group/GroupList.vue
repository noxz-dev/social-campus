<template>
  <div class="w-full justify-center flex">
    <div class="pt-1 md:px-4 w-full">
      <div v-if="!loading" class="flex gap-4 flex-wrap">
        <div v-for="group in groups" :key="group.id" class="xl:w-64 md:w-72 w-full">
          <group-card :group="group" :isMemberOfGroup="isMemberOfGroup"></group-card>
        </div>
      </div>
      <div v-else>
        <div class="w-full flex justify-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GroupCard from './GroupCard.vue';

export default defineComponent({
  components: { GroupCard },
  props: {
    groups: {
      type: Object,
      required: true,
    },
    isMemberOfGroup: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style></style>
