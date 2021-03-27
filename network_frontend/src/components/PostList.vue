<template>
  <div class="w-full h-full flex items-center flex-col pb-14">
    <div class="dark:text-gray-50" v-if="posts?.length === 0">ganz schön leer hier, schreibe doch einen Post oder folge anderen!</div>
    <post-card
      v-for="post in posts"
      :key="post.id"
      :post-text="post.text"
      :name="post?.user?.firstname + ' ' + post?.user?.lastname"
      :liked="post.liked"
      :likeCount="post.likesCount"
      :commentCount="post.commentCount"
      :post-date="new Date(post.createdAt)"
      :id="post.id"
      :imageUrlProfile="post.user.profilePicLink"
      :userId="post.user.id"
      :imageUrl="post.imageLink"
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
