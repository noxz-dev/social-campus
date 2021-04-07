<template>
  <div>
    <div id="home" ref="home" class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl">
      <infinite-scroll-wrapper :queryLoading="loading" @loadMore="loadMore()" class="overflow-y-auto">
        <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
          <post-list :posts="posts" />
        </div>
      </infinite-scroll-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from 'vue';
import { useGetFeedQuery } from '../graphql/generated/graphqlOperations';
import PostList from '@/components/PostList.vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
import { GetFeedQueryVariables } from 'src/graphql/generated/types';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import { getFeedState } from "../_helpers/QueryState"

export default defineComponent({
  components: { PostList, InfiniteScrollWrapper },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const home = ref<HTMLElement>();

    const { result, error, subscribeToMore, fetchMore, loading } = useGetFeedQuery(<GetFeedQueryVariables>{
      take: 10,
      skip: 0,
    });
    const posts = useResult(result);

    subscribeToMore(() => ({
      document: gql`
        subscription newPost($userId: String!, $all: Boolean!) {
          newPost(userId: $userId, all: $all) {
            id
            liked
            imageLink
            user {
              id
              firstname
              lastname
              username
              profilePicLink
            }
            text
            likesCount
            createdAt
            edited
          }
        }
      `,
      variables: {
        userId: user.value.id,
        all: false
      },
    }));

    const loadMore = () => {
      console.log('load triggerd');
      getFeedState.skip = posts.value.length
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
            getFeed: [...previousResult.getFeed, ...fetchMoreResult.getFeed],
          };
        },
      });
    };

    return { posts, error, home, loadMore, loading };
  },
});
</script>

<style></style>
