<template>
  <div>
    <div class="flex h-full items-center pt-10 bg-darkTheme-700 flex-col rounded-3xl">
      <post-list :posts="posts" />
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent } from 'vue';
import feedQuery from '@/graphql/feed.query.gql';
import PostList from '@/components/PostList.vue';

export default defineComponent({
  components: { PostList,  },
  setup() {
    const { result, error } = useQuery(feedQuery, null, { pollInterval: 60000 });

    const posts = useResult(result);
    return { posts, error };
  },
});
</script>

<style></style>
