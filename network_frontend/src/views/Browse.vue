<template>
  <div>
    <div id="browse" class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl">
      <infinite-scroll-wrapper :queryLoading="loading" @loadMore="loadMore()" class="overflow-y-auto">
        <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
        <div class="h-10 w-full flex">
        <span class="text-2xl font-semibold dark:text-gray-50 text-gray-900 mr-4">Tags:</span><chips-input class="w-full"></chips-input>
      </div>
          <div class="text-2xl font-semibold dark:text-gray-50 text-gray-900 mb-10 text-center">
            <span class="flex justify-center items-center" v-if="$route.query.tag">
              Posts mit dem Tag
              <span class="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                #{{ $route.query.tag }}
              </span>
            </span>
          </div>
          <post-list :posts="posts" />
        </div>
      </infinite-scroll-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from 'vue';
import { useBrowsePostsQuery, useGetFeedQuery } from '../graphql/generated/graphqlOperations';
import PostList from '@/components/PostList.vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
import { BrowsePostsQueryVariables } from '../graphql/generated/types';
import { useRoute } from 'vue-router';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import ChipsInput from '../components/ChipsInput.vue';

export default defineComponent({
  components: { PostList, InfiniteScrollWrapper, ChipsInput },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const home = ref<HTMLElement>();
    const route = useRoute();

    const { result, error, subscribeToMore, fetchMore, loading } = useBrowsePostsQuery(
      () =>
        <BrowsePostsQueryVariables>{
          take: 10,
          skip: 0,
          tags: route.query.tag,
        }
    );
    const posts = useResult(result);

    watchEffect(() => {
      if (posts.value) console.log(posts.value.length);
    });

    //TODO update query in fetchmore is deprecated .. needs a redo
    const loadMore = () => {
      console.log('load triggerd');
      fetchMore({
        variables: {
          skip: posts.value.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // No new  posts
          if (!fetchMoreResult) return previousResult;

          // Concat previous posts with new posts
          return {
            ...previousResult,
            browsePosts: [...previousResult.browsePosts, ...fetchMoreResult.browsePosts],
          };
        },
      });
    };

    // subscribeToMore(() => ({
    //   document: gql`
    //     subscription newPost($userId: String!) {
    //       newPost(userId: $userId) {
    //         id
    //         liked
    //         imageLink
    //         user {
    //           id
    //           firstname
    //           lastname
    //           username
    //           profilePicLink
    //         }
    //         text
    //         likesCount
    //         createdAt
    //         edited
    //       }
    //     }
    //   `,
    //   variables: {
    //     userId: user.value.id,
    //   },
    // }));

    return { posts, error, home, loadMore, loading };
  },
});
</script>

<style></style>
