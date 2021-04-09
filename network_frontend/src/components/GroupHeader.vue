<template>
  <div class="flex flex-col dark:bg-dark-600 bg-gray-100 p-6 items-center w-full rounded-xl">
    <div class="bg-pink-300 w-full rounded-xl h-72">
      <lazy-image src="" blurhash="AIDSCO0y_OL0" />
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
        <div class="h-full">
          <div class="flex -space-x-2 relative z-0 overflow-hidden h-full items-center py-1 px-2">
            <img
              class="relative z-30 inline-block h-14 w-14 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixqx=Q6mry6py7k&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              class="relative z-20 inline-block h-14 w-14 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              class="relative z-10 inline-block h-14 w-14 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixqx=Q6mry6py7k&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <img
              class="relative z-0 inline-block h-14 w-14 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=Q6mry6py7k&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
        </div>
        <div class="ml-10">
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-highlight-600 hover:bg-highlight-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
          >
            Einladen
          </button>
        </div>
      </div>
    </div>
    <div class="w-full mt-6 py-4 text-lg font-semibold dark:text-gray-50 text-gray-900">
      <div class="flex sm:space-x-10 space-x-0 sm:space-y-0 sm:flex-row transition-all duration-1000 w-full">
        <router-link :to="{ name: 'ProfilePosts', params: { id: $route.params.id } }">
          <div class="py-1 px-2 rounded-lg">
            <span class="dark:text-gray-50 text-gray-900">Feed</span>
            <span class="ml-2 font-light dark:text-gray-50 text-gray-900">{{ numberFormatter(9800) }}</span>
          </div>
        </router-link>
        <router-link :to="{ name: 'ProfileFollowing', params: { id: $route.params.id } }">
          <div class="py-1 px-2 rounded-lg">
            <span class="dark:text-gray-50 text-gray-900">Wiki</span>
            <span class="ml-2 font-light dark:text-gray-50 text-gray-900"></span>
          </div>
        </router-link>
        <router-link :to="{ name: 'ProfileFollowing', params: { id: $route.params.id } }">
          <div class="py-1 px-2 rounded-lg">
            <span class="dark:text-gray-50 text-gray-900">Mitglieder</span>
            <span class="ml-2 font-light dark:text-gray-50 text-gray-900">{{ numberFormatter(1000) }}</span>
          </div>
        </router-link>
        <router-link :to="{ name: 'ProfileFollowing', params: { id: $route.params.id } }">
          <div class="py-1 px-2 rounded-lg">
            <span class="dark:text-gray-50 text-gray-900">Files</span>
            <span class="ml-2 font-light dark:text-gray-50 text-gray-900"></span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Group } from 'src/graphql/generated/types';
import { defineComponent, PropType, ref, watch } from 'vue';
import LazyImage from './blurhash/LazyImage.vue';
import { numberFormatter } from '../utils/numberFormatter';

export default defineComponent({
  components: { LazyImage },
  props: {
    groupId: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      numberFormatter,
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
