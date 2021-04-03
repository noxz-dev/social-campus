<template>
  <div id="profilePosts" class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4">
    <post-list :posts="posts" />
  </div>
</template>

<script lang="ts">
import { useGetPostsFromUserQuery } from '../graphql/generated/graphqlOperations';
import { GetPostsFromUserQueryVariables, Post } from '../graphql/generated/types';
import { defineComponent, onMounted, ref } from 'vue';
import PostList from '../components/PostList.vue';

export default defineComponent({
  components: { PostList },
  props: {
    userId: String,
  },
  setup(props) {
    const posts = ref<Post>();
    console.log(props.userId);

    const { onResult: onResultPosts } = useGetPostsFromUserQuery(
      () =>
        <GetPostsFromUserQueryVariables>{
          userID: props.userId,
          take: 100,
          skip: 0,
          pollInterval: 60000,
        }
    );

    onResultPosts((postData) => {
      const postsResult = postData?.data?.getPostsFromUser;
      posts.value = [...postsResult];

      console.log(posts.value);
    });

    return { posts };
  },
});
</script>

<style></style>
