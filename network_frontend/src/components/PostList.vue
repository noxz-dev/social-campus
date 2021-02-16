<template>
  <div class="w-full h-full flex items-center flex-col">
    <post-card
      v-for="post in posts"
      :key="post.id"
      :post-text="post.text"
      :name="post?.user?.firstname + ' ' + post?.user?.lastname"
      :liked="post.liked"
      :likeCount="post.likesCount"
      :post-date="new Date(post.createdAt)"
      :id="post.id"
      :imageUrl="post.user.profilePicLink"
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
