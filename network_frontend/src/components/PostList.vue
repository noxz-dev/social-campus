<template>
  <div class="w-full h-full flex items-center flex-col">
    <post-card
      v-for="(post, index) in posts"
      :key="index"
      :post-text="post.text"
      :name="post?.user?.firstname + ' ' + post?.user?.lastname"
      :post-date="new Date(post.createdAt)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostCard from './PostCard.vue';

export default defineComponent({
  components: { PostCard },
  props: {
    posts: Array,
    default: [],
  },
});
</script>

<style></style>
