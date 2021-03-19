<template>
  <router-link :to="to" class="w-full xl:ml-0 hover:text-highlight-500">
    <div
      class="flex items-center h-14 border-b-6 justify-center border-transparent md:border-b-0 md:border-l-6 border-transparent md:justify-center xl:justify-start xl:pl-4"
    >
      <slot />
      <span class="hidden text-bold font-semibold xl:block md:ml-4">{{ name }}</span>
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
  @apply text-indigo-500;
  @apply border-indigo-500;
}
a.router-link-exact-active path {
  @apply fill-indigo;
}
a:hover path {
  @apply fill-indigo;
}
@screen md {
  a.router-link-exact-active div {
    @apply bg-dark700;
    @apply relative;
    @apply border-b-0;
  }
}
</style>
