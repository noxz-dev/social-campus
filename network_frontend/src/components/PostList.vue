<template>
  <div class="w-full h-full flex items-center flex-col pb-14">
    <div class="dark:text-gray-50 text-gray-900 mt-20 font-semibold text-xl" v-if="posts?.length === 0">
      {{ emptyText }}
    </div>
    <post-card v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostCard from './PostCard.vue';

export default defineComponent({
  components: { PostCard },
  props: {
    posts: {
      type: Array,
      default: [],
    },
    emptyText: {
      type: String,
      default: 'ganz schön leer hier, schreibe doch einen Post oder folge anderen!  ',
    },
  },
});
</script>

<style></style>
