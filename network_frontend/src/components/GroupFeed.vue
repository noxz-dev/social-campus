<template>
  <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
    <post-list :posts="posts" class="pt-10 md:pt-0" cardBgColor="bg-dark600" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useGetPostsFromGroupQuery } from '../graphql/generated/graphqlOperations';
import { GetPostsFromGroupQueryVariables } from '../graphql/generated/types';
import PostList from './PostList.vue';

export default defineComponent({
  components: {
    PostList,
  },
  setup() {
    const posts = ref();
    const take = ref(3);
    const route = useRoute();
    const skip = ref(0);

    const { onResult } = useGetPostsFromGroupQuery(
      () =>
        <GetPostsFromGroupQueryVariables>{
          groupId: route.params.id,
        }
    );

    onResult(({ data }) => {
      posts.value = data.getPostsFromGroup;
    });

    return { posts };
  },
});
</script>

<style></style>
