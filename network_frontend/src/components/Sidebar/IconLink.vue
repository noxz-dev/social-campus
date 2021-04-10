<template>
  <router-link :to="to" class="w-full xl:ml-0 md:ml-1 hover:text-highlight-500" :class="navState.lastView === to ? 'highlight' : ''">
    <div
      class="flex xl:mx-3 border-b-4 md:rounded-xl px-6 border-transparent items-center h-16 justify-center md:border-b-0 md:border-l-6 md:justify-center xl:justify-start xl:pl-4"
    >
      <slot />
      <span class="hidden text-bold font-semibold xl:block md:ml-4 dark:text-gray-50 text-gray-900">{{ name }}</span>
    </div>
  </router-link>
</template>

<script>
import { navState } from '../../utils/NavState';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'IconLink',
  props: {
    to: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      navState,
    };
  },
});
</script>

<style>
.highlight div,
a.router-link-exact-active div {
  @apply text-gray-100;
  @apply border-indigo-500;
}
.highlight path,
.highlight polyline,
.highlight polygon,
a.router-link-exact-active path,
a.router-link-exact-active polyline,
a.router-link-exact-active polygon {
  @apply fill-indigo !important;
  @apply stroke-indigo;
}

.highlight:hover path,
.highlight:hover polyline,
.highlight:hover polygon,
a:hover path,
a:hover polyline,
a:hover polygon {
  @apply fill-indigo !important;
  @apply stroke-indigo;
}
@screen md {
  .dark .highlight div,
  .dark a.router-link-exact-active div {
    @apply bg-dark600;
    @apply relative;
    @apply border-b-0;
  }
  .highlight div,
  a.router-link-exact-active div {
    @apply bg-gray-200;
    @apply relative;
    @apply border-b-0;
  }
}
</style>
