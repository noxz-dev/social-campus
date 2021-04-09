<template>
  <div class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl p-4 overflow-y-auto pb-20">
    <group-header />
    <div class="flex w-full">
      <div class="w-full">
        <infinite-scroll-wrapper :queryLoading="loading" @loadMore="loadMore()" class="overflow-y-auto">
          <component :is="'GroupFeed'" />
        </infinite-scroll-wrapper>
      </div>
      <div class="bg-dark-600 text-white mt-4 w-1/3 rounded-xl flex items-center justify-center h-96">
        <div class="">SIDEPANEL RIGHT</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PostList from '../components/PostList.vue';
import { useGetPostsFromGroupQuery } from '../graphql/generated/graphqlOperations';
import { GetPostsFromGroupQueryVariables } from '../graphql/generated/types';
import { defineComponent, ref, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import GroupHeader from '../components/GroupHeader.vue';

export default defineComponent({
  components: {
    PostList,
    InfiniteScrollWrapper,
    GroupHeader,
    GroupFeed: defineAsyncComponent(() => import('../components/GroupFeed.vue')),
  },
  setup() {
    const posts = ref([]);
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
