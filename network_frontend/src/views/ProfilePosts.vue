<template>
  <div id="profilePosts" class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4">
    <post-list :posts="posts" emptyText="Ganz schön leer hier, schreibe doch einen Post" />
  </div>
</template>

<script lang="ts">
import { useGetPostsFromUserQuery } from '../graphql/generated/types';
import { defineComponent, ref } from 'vue';
import { useResult } from '@vue/apollo-composable';
import PostList from '../components/Post/PostList.vue';

export default defineComponent({
  components: { PostList },
  props: {
    userId: String,
  },
  setup(props) {
    const { result } = useGetPostsFromUserQuery(() => ({
      userID: props.userId as string,
      take: 100,
      skip: 0,
    }));

    const posts = useResult(result, null, (data) => data.getPostsFromUser);

    return { posts };
  },
});
</script>

<style></style>
