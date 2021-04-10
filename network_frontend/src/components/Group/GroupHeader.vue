<template>
  <div class="flex flex-col dark:bg-dark-600 bg-gray-100 p-6 items-center w-full rounded-xl">
    <div class="bg-pink-300 w-full rounded-xl h-72">
      <lazy-image src="" blurhash="AePC3PmlGv{c" />
    </div>
    <div class="w-full mt-6 py-10 flex justify-between">
      <div class="flex flex-col">
        <div class="text-xl font-semibold dark:text-gray-50 text-gray-900">Praxisprojekt Elektronikindustrie</div>
        <div class="flex">
          <div></div>
          <div class="text-lg font-semibold dark:text-gray-400 text-gray-900">Private Gruppe</div>
          <div class="w-1"></div>
          <div class="text-lg font-semibold dark:text-gray-400 text-gray-900">· 1k Mitglieder</div>
        </div>
      </div>
      <div class="flex h-full items-center">
        <div class="ml-10">
          <app-button>Einladen</app-button>
        </div>
      </div>
    </div>
    <div class="w-full mt-6 py-4 text-lg font-semibold dark:text-gray-50 text-gray-900">
      <div class="flex sm:space-x-10 space-x-0 sm:space-y-0 sm:flex-row transition-all duration-1000 w-full">
        <div
          class="py-1 px-2 rounded-lg"
          @click="$emit('switchComponent', GroupComponents.GROUP_FEED)"
          :class="{ 'bg-indigo-500': activeComponent == GroupComponents.GROUP_FEED }"
        >
          <span class="dark:text-gray-50 text-gray-900">Feed</span>
          <span class="ml-2 font-light dark:text-gray-50 text-gray-900">{{ numberFormatter(9800) }}</span>
        </div>
        <div
          class="py-1 px-2 rounded-lg"
          @click="$emit('switchComponent', GroupComponents.GROUP_WIKI)"
          :class="{ 'bg-indigo-500': activeComponent == GroupComponents.GROUP_WIKI }"
        >
          <span class="dark:text-gray-50 text-gray-900">Wiki</span>
        </div>
        <div class="py-1 px-2 rounded-lg" @click="$emit('switchComponent', GroupComponents.GROUP_FEED)">
          <span class="dark:text-gray-50 text-gray-900">Files</span>
          <span class="ml-2 font-light dark:text-gray-50 text-gray-900"></span>
        </div>
        <div class="py-1 px-2 rounded-lg" @click="$emit('switchComponent', GroupComponents.GROUP_FEED)">
          <span class="dark:text-gray-50 text-gray-900">Everything is possible...</span>
          <span class="ml-2 font-light dark:text-gray-50 text-gray-900"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import LazyImage from '../Blurhash/LazyImage.vue';
import { numberFormatter } from '../../utils/numberFormatter';
import { GroupComponents } from '../../views/Group.vue';

export default defineComponent({
  components: { LazyImage },
  emits: ['switchComponent'],
  props: {
    groupId: {
      type: String,
      required: true,
    },
    activeComponent: {
      type: String as PropType<GroupComponents>,
    },
  },
  setup() {
    const switchComponent = (comp: GroupComponents) => {
      console.log(comp);
    };

    return {
      numberFormatter,
      GroupComponents,
      switchComponent,
    };
  },
});
</script>

<style scoped>
a.router-link-exact-active div {
  @apply text-gray-100;
  @apply border-indigo-500;
}
a.router-link-exact-active path {
  @apply fill-indigo;
}
a:hover path {
  @apply fill-indigo;
}

@screen md {
  .dark a.router-link-exact-active div {
    @apply bg-highlight-500;
    @apply relative;
    @apply border-b-0 !important;
    @apply rounded-lg !important;
  }

  a.router-link-exact-active div {
    @apply bg-highlight-500;
    @apply relative;
    @apply border-b-0 !important;
    @apply rounded-lg !important;
  }
}

.dark a.router-link-exact-active div {
  @apply relative;
  @apply border-b-4;
  @apply rounded-none;
}

a.router-link-exact-active div {
  @apply relative;
  @apply border-b-4;
  @apply rounded-none;
}

a.router-link-exact-active span {
  @apply text-white !important;
}
</style>
