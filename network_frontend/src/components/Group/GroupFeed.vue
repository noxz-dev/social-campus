<template>
  <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4 mb-10 mt-10">
    <post-list :posts="posts" class="pb-20" cardBgColor="bg-dark-600" />
    <div v-if="loading || customLoading" class="w-full flex justify-center">
      <svg
        class="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import { defineComponent, getCurrentInstance, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGetPostsFromGroupQuery } from '../../graphql/generated/types';
import PostList from '../Post/PostList.vue';
import { useResult } from '@vue/apollo-composable';
import { useApolloClient } from '@vue/apollo-composable';

export default defineComponent({
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();
    let lastResponseLength = 1;
    const customLoading = ref(false);

    //fix a caching bug
    const { client } = useApolloClient();
    client.resetStore();

    //fetch the inital group feed
    const { loading, result, subscribeToMore, fetchMore } = useGetPostsFromGroupQuery(() => ({
      groupId: route.params.id as string,
      limit: 10,
      offset: 0,
    }));

    //subscripte to new post, to update the ui in realtime
    subscribeToMore(() => ({
      document: gql`
        subscription newPost($all: Boolean!, $groupId: String) {
          newPost(all: $all, groupId: $groupId) {
            id
            liked
            media {
              id
              type
              name
              blurhash
            }
            user {
              id
              firstname
              lastname
              username
              avatar {
                name
              }
            }
            text
            likesCount
            createdAt
            edited
          }
        }
      `,
      variables: {
        groupId: route.params.id,
        all: false,
      },
    }));

    const posts = useResult(result, null, (data) => data.getPostsFromGroup);

    //register eventbus to listen for the scroll event
    const internalInstance = getCurrentInstance();
    if (internalInstance) {
      const eventbus = internalInstance.appContext.config.globalProperties.eventbus;
      eventbus?.on('loadMoreGroupPosts', () => loadMore());
      watch(
        () => customLoading.value,
        () => {
          eventbus?.emit('GroupPostsLoadingUpdate', customLoading.value);
        }
      );
    }

    //fetch more posts with an offset
    const loadMore = async () => {
      if (lastResponseLength === 0) return;
      customLoading.value = true;
      const response = await fetchMore({
        variables: {
          offset: posts.value!.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // No new  posts
          if (!fetchMoreResult) return previousResult;

          // Concat previous posts with new posts
          return {
            ...previousResult,
            getPostsFromGroup: [...previousResult.getPostsFromGroup!, ...fetchMoreResult.getPostsFromGroup!],
          };
        },
      });
      lastResponseLength = response.data.getPostsFromGroup!.length;
      customLoading.value = false;
    };

    return { posts, customLoading, loading };
  },
});
</script>

<style></style>
