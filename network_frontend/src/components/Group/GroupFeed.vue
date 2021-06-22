<template>
  <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4 mb-10 mt-10">
    <post-list :posts="posts" class="pb-20" cardBgColor="bg-dark-600" />
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import { defineComponent, getCurrentInstance, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGetPostsFromGroupQuery } from '../../graphql/generated/types';
import PostList from '../Post/PostList.vue';
import { useResult } from '@vue/apollo-composable';

export default defineComponent({
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();

    //fetch the inital group feed
    const { result, subscribeToMore, loading, fetchMore } = useGetPostsFromGroupQuery(() => ({
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

    const posts = useResult(result, [], (data) => data.getPostsFromGroup);

    //register eventbus to listen for the scroll event
    const internalInstance = getCurrentInstance();
    if (internalInstance) {
      const eventbus = internalInstance.appContext.config.globalProperties.eventbus;
      eventbus?.on('loadMoreGroupPosts', () => loadMore());
      watch(
        () => loading.value,
        () => {
          eventbus?.emit('GroupPostsLoadingUpdate', loading.value);
        }
      );
    }

    let lastResponseLength = 1;
    const customLoading = ref(false);

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

    return { posts };
  },
});
</script>

<style></style>
