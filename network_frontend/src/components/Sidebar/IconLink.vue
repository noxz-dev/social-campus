<template>
  <router-link :to="to" class="w-full xl:ml-0 md:ml-1 hover:text-highlight-500">
    <div
      class="flex xl:mx-3 border-b-4 md:rounded-xl px-6 border-transparent items-center h-16 justify-center md:border-b-0 md:border-l-6 md:justify-center xl:justify-start xl:pl-4"
    >
      <slot />
      <span class="hidden text-bold font-semibold xl:block md:ml-4 dark:text-gray-50 text-gray-900">{{ name }}</span>
    </div>
  </router-link>
</template>

<script>
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
});
</script>

<style>
a.router-link-exact-active div {
  @apply text-gray-100;
  @apply border-indigo-500;
}
a.router-link-exact-active path,
a.router-link-exact-active polyline,
a.router-link-exact-active polygon {
  @apply fill-indigo;
  @apply stroke-indigo;
}
a:hover path,
a:hover polyline,
a:hover polygon {
  @apply fill-indigo;
  @apply stroke-indigo;
}
@screen md {
  @media (prefers-color-scheme: dark) {
    a.router-link-exact-active div {
      @apply bg-dark600;
      @apply relative;
      @apply border-b-0;
    }
  }

  @media (prefers-color-scheme: light) {
    a.router-link-exact-active div {
      @apply bg-gray-200;
      @apply relative;
      @apply border-b-0;
    }
  }
}
</style>
