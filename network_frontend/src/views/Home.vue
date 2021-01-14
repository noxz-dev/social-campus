<template>
  <div class="w-full h-full flex items-center justify-center bg-gray-750 flex-col">
    <new-post class="pt-2" />
    <post-list :posts="posts" />
  </div>
</template>

<script lang="ts">
import NewPost from '@/components/NewPost.vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent } from 'vue';
import feedQuery from '@/graphql/feed.query.gql';
import PostList from '@/components/PostList.vue';

export default defineComponent({
  components: { NewPost, PostList },
  setup() {
    const { result, error } = useQuery(feedQuery, null, { pollInterval: 10000 });

    const posts = useResult(result);
    console.log(posts);
    return { posts, error };
  },
});
</script>

<style></style>
