<template>
  <div class="w-full flex justify-center lg:justify-start">
    <div id="profilePosts" class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4 pb-10">
      <post-list :posts="posts" :emptyText="emptyText" />
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
  </div>
</template>

<script lang="ts">
import { useGetPostsFromUserQuery } from '../graphql/generated/types';
import { computed, defineComponent, getCurrentInstance, ref, watch, watchEffect } from 'vue';
import { useResult } from '@vue/apollo-composable';
import PostList from '../components/Post/PostList.vue';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: { PostList, InfiniteScrollWrapper },
  props: {
    userId: String,
  },
  setup(props) {
    const customLoading = ref(false);
    let lastResponseLength = 1;
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const emptyText = computed(() =>
      props.userId === user.value.id ? 'Ganz schön leer hier, poste doch etwas' : 'Keine Posts vorhanden'
    );

    //fetch the inital profile feed
    const { result, loading, fetchMore } = useGetPostsFromUserQuery(() => ({
      userID: props.userId as string,
      limit: 10,
      offset: 0,
    }));

    const posts = useResult(result, null, (data) => data.getPostsFromUser);

    //register the eventbus to communicate with the scroll wrapper for lazy loading
    const internalInstance = getCurrentInstance();
    if (internalInstance) {
      const eventbus = internalInstance.appContext.config.globalProperties.eventbus;
      eventbus?.on('loadMoreProfilePosts', () => loadMore());
      watch(
        () => customLoading.value,
        () => {
          eventbus?.emit('ProfilePostsLoadingUpdate', customLoading.value);
        }
      );
    }

    watch(
      () => props.userId,
      () => {
        lastResponseLength = 1;
      }
    );

    /**
     * lazy load more posts
     */
    const loadMore = async () => {
      if (lastResponseLength === 0) return;
      customLoading.value = true;
      const data = await fetchMore({
        variables: {
          offset: posts.value.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // No new  posts
          if (!fetchMoreResult) return previousResult;
          // Concat previous posts with new posts
          return {
            ...previousResult,
            getPostsFromUser: [...previousResult.getPostsFromUser, ...fetchMoreResult.getPostsFromUser],
          };
        },
      });
      lastResponseLength = data.data.getPostsFromUser.length;
      customLoading.value = false;
    };

    return { posts, loading, loadMore, customLoading, emptyText };
  },
});
</script>

<style></style>
