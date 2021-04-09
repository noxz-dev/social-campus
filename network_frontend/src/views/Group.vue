<template>
  <div class="flex h-full">
    <div class="flex h-full items-center flex-1 bg-white dark:bg-dark700 flex-col rounded-t-2xl border-t-2 border-r-2 py-1 border-dark-600">
      <infinite-scroll-wrapper :queryLoading="loading" @loadMore="loadMore()" class="overflow-y-auto p-4 py-3">
        <group-header :groupId="$route.params.id" />
        <div class="flex w-full">
          <div class="w-full flex justify-center">
            <component :is="'GroupFeed'" />
          </div>
          <div class="dark:bg-dark-600 bg-gray-100 dark:text-gray-50 mt-4 w-1/3 rounded-xl items-center justify-center h-96 hidden lg:flex">
            <div class="">SIDEPANEL RIGHT</div>
          </div>
        </div>
      </infinite-scroll-wrapper>
    </div>

    <div class="h-full hidden lg:flex w-80">
      <div class="p-5 w-full">
        <div class="mb-5">
          <span class="dark:text-red-400 text-red-500 dark:text-opacity-60 text-opacity-75 tracking-wider">ADMIN</span>
          <div class="mt-4">
            <div class="bg-dark-500 w-full h-10 rounded-xl"></div>
          </div>
        </div>
        <div class="mb-5">
          <span class="dark:text-indigo-300 text-indigo-500 dark:text-opacity-60 text-opacity-75 tracking-wider">MITGLIEDER</span>
          <div class="mt-4">
            <div class="mt-4">
              <div class="bg-dark-500 w-full h-10 rounded-xl"></div>
            </div>
            <div class="mt-4">
              <div class="bg-dark-500 w-full h-10 rounded-xl"></div>
            </div>
            <div class="mt-4">
              <div class="bg-dark-500 w-full h-10 rounded-xl"></div>
            </div>
            <div class="mt-4">
              <div class="bg-dark-500 w-full h-10 rounded-xl"></div>
            </div>
            <div class="mt-4">
              <div class="bg-dark-500 w-full h-10 rounded-xl"></div>
            </div>
          </div>
        </div>
        <div>
          <span class="dark:text-gray-300 text-gray-700 dark:text-opacity-60 text-opacity-75 tracking-wider">OFFLINE</span>
          <div class="mt-4">
            <div class="mt-4">
              <div class="bg-dark-500 w-full h-10 rounded-xl"></div>
            </div>
            <div class="mt-4">
              <div class="bg-dark-500 w-full h-10 rounded-xl"></div>
            </div>
            <div class="mt-4">
              <div class="bg-dark-500 w-full h-10 rounded-xl"></div>
            </div>
            <div class="mt-4">
              <div class="bg-dark-500 w-full h-10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PostList from '../components/Post/PostList.vue';
import { useGetPostsFromGroupQuery } from '../graphql/generated/graphqlOperations';
import { GetPostsFromGroupQueryVariables } from '../graphql/generated/types';
import { defineComponent, ref, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import GroupHeader from '../components/Group/GroupHeader.vue';

export default defineComponent({
  components: {
    PostList,
    InfiniteScrollWrapper,
    GroupHeader,
    GroupFeed: defineAsyncComponent(() => import('../components/Group/GroupFeed.vue')),
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
