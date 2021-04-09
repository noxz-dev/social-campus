<template>
  <div class="flex h-full items-center bg-white dark:bg-dark600 flex-col rounded-3xl p-4 overflow-y-auto pb-20">
    <group-header />
    <div class="flex w-full">
      <div class="w-full">
        <infinite-scroll-wrapper :queryLoading="loading" @loadMore="loadMore()" class="overflow-y-auto">
          <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
            <post-list :posts="posts" class="pt-10 md:pt-0" />
          </div>
        </infinite-scroll-wrapper>
      </div>
      <div class="bg-dark-700 text-white mt-4 w-1/3 rounded-xl flex items-center justify-center">
        <div class="">SIDEPANEL RIGHT</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PostList from '../components/PostList.vue';
import { useGetPostsFromGroupQuery } from '../graphql/generated/graphqlOperations';
import { GetPostsFromGroupQueryVariables } from '../graphql/generated/types';
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import GroupHeader from '../components/GroupHeader.vue';

export default defineComponent({
  components: {
    PostList,
    InfiniteScrollWrapper,
    GroupHeader,
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
