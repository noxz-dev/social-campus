<template>
  <div>
    <div id="browse" class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl">
      <infinite-scroll-wrapper :queryLoading="loading" @loadMore="loadMore()" class="overflow-y-auto">
        <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
          <div class="h-10 w-full flex items-center mb-10">
            <span class="text-xl font-semibold dark:text-gray-50 text-gray-900 mr-4"> Filter nach Tags:</span>
            <chips-input class="flex-1" ref="chipInput" :startTags="inputTags" inputPlaceholder="z.B. #hsh, #socialnetwork"></chips-input>
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
    const chipInput = ref(null);
    const tags = ref<string[]>([]);
    const inputTags = ref<string[]>([]);

    if (route.query.tag) {
      inputTags.value.push(route.query.tag);
      tags.value.push(route.query.tag);
    }

    const { result, error, subscribeToMore, fetchMore, loading } = useBrowsePostsQuery(
      () =>
        <BrowsePostsQueryVariables>{
          take: 10,
          skip: 0,
          tags: tags.value,
        }
    );
    const posts = useResult(result);

    watchEffect(() => {
      if (posts.value) console.log(posts.value.length);
    });

    watch(
      () => chipInput.value?.chips,
      () => {
        tags.value = chipInput.value?.chips;
        console.log('called');
      },
      {
        deep: true,
      }
    );

    watch(
      () => route.query.tag,
      () => {
        inputTags.value = [route.query.tag];
        console.log(inputTags.value);
      }
    );

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

    return { posts, error, home, loadMore, loading, chipInput, tags, inputTags };
  },
});
</script>

<style></style>
