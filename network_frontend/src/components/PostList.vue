<template>
  <post-card
    v-for="(post, index) in posts"
    :key="index"
    :postText="post.text"
    :name="post?.user?.firstname + ' ' + post?.user?.lastname"
    :postDate="new Date(post.createdAt)"
  />
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
