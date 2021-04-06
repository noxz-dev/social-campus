<template>
  <div id="profilePosts" class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4">
    <post-list :posts="posts" />
  </div>
</template>

<script lang="ts">
import { useGetPostsFromUserQuery } from '../graphql/generated/graphqlOperations';
import { GetPostsFromUserQueryVariables, Post } from '../graphql/generated/types';
import { defineComponent, ref } from 'vue';
import PostList from '../components/PostList.vue';

export default defineComponent({
  components: { PostList },
  props: {
    userId: String,
  },
  setup(props) {
    const posts = ref<Post>();

    const { onResult: onResultPosts } = useGetPostsFromUserQuery(
      () =>
        <GetPostsFromUserQueryVariables>{
          userID: props.userId,
          take: 100,
          skip: 0,
        }
    );

    onResultPosts(({ data: { getPostsFromUser } }: { data: { getPostsFromUser: Post } }) => {
      posts.value = getPostsFromUser;
    });

    return { posts };
  },
});
</script>

<style></style>
