<template>
  <div>
    <div id="home" ref="home" class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl">
      <infinite-scroll-wrapper :queryLoading="loading" @loadMore="loadMore()" class="overflow-y-auto">
        <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
          <post-list :posts="posts" emptyText="Ganz schön leer hier, schreibe doch einen Post oder folge anderen!" />
          <div v-if="loading" class="w-full flex justify-center">
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
      </infinite-scroll-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from 'vue';
import { useGetFeedQuery } from '../graphql/generated/types';
import PostList from '../components/Post/PostList.vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';

export default defineComponent({
  components: { PostList, InfiniteScrollWrapper },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const home = ref<HTMLElement>();

    const feedQueryEnabled = ref(false);

    watch(
      () => store.state.userData.user,
      () => {
        if (store.state.userData.user.id) {
          feedQueryEnabled.value = true;
        }
      }
    );

    if (user.value.id) {
      feedQueryEnabled.value = true;
    }

    const { result, error, subscribeToMore, fetchMore, loading } = useGetFeedQuery(
      {
        limit: 10,
        offset: 0,
      },
      () => ({ enabled: feedQueryEnabled.value })
    );
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
              avatar {
                name
                blurhash
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
        userId: user.value.id,
        all: false,
      },
    }));

    let lastResponseLength = 1;

    const loadMore = async () => {
      if (lastResponseLength === 0) return;
      console.log('load triggerd');
      const data = await fetchMore({
        variables: {
          offset: posts.value.length,
        },
      });

      lastResponseLength = data.data.getFeed.length;
    };

    return { posts, error, home, loadMore, loading };
  },
});
</script>

<style></style>
