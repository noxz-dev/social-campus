<template>
  <div>
    <div id="browse" class="flex h-full items-center bg-white dark:bg-dark-700 flex-col rounded-3xl">
      <infinite-scroll-wrapper :queryLoading="customLoading" @loadMore="loadMore()" class="overflow-y-auto">
        <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
          <div class="h-10 w-full flex items-center mb-10 flex-col md:flex-row">
            <span class="text-xl font-semibold dark:text-gray-50 text-gray-900 mr-4 pb-4 md:pb-0">
              Filter nach Tags:</span
            >
            <chips-input
              class="w-full md:flex-1"
              ref="chipInput"
              :startTags="inputTags"
              inputPlaceholder="z.B. #hsh, #socialnetwork, #webtechnologien"
            ></chips-input>
          </div>
          <post-list :posts="posts" class="pt-10 md:pt-0" emptyText="Ganz schön leer hier, schreibe doch einen Post" />
        </div>
      </infinite-scroll-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, ref, watch, watchEffect } from 'vue';
import { useBrowsePostsQuery } from '../graphql/generated/types';
import PostList from '../components/Post/PostList.vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
import { useRoute } from 'vue-router';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import ChipsInput from '../components/Form/ChipsInput.vue';
import VueTribute from '../components/VueTribute.vue';

export default defineComponent({
  components: { PostList, InfiniteScrollWrapper, ChipsInput, VueTribute },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const home = ref<HTMLElement>();
    const route = useRoute();
    const chipInput = ref<InstanceType<typeof ChipsInput>>();
    const tags = ref<string[]>([]);
    const inputTags = ref<string[]>([]);

    const browseQueryEnabled = ref(false);

    //sets inital tags if some were given trough url query
    if (route.query.tag) {
      inputTags.value.push(route.query.tag as string);
      tags.value.push(route.query.tag as string);
    }

    watch(
      () => store.state.userData.user,
      () => {
        if (store.state.userData.user.id) {
          browseQueryEnabled.value = true;
        }
      }
    );

    if (user.value.id) {
      browseQueryEnabled.value = true;
    }

    //get all posts for the discover page
    const { result, error, subscribeToMore, fetchMore, loading } = useBrowsePostsQuery(
      () => ({
        take: 10,
        skip: 0,
        tags: tags.value,
      }),
      () => ({
        enabled: browseQueryEnabled.value,
      })
    );
    const posts = useResult(result);

    watch(
      () => loading.value,
      () => {
        console.log('loading changed', loading.value);
      }
    );

    watch(
      () => chipInput.value?.chips,
      () => {
        tags.value = chipInput.value?.chips as string[];
      },
      {
        deep: true,
      }
    );

    watch(
      () => route.query.tag,
      () => {
        inputTags.value = [route.query.tag as string];
      }
    );

    //is needed to handle the buch of triggered events, caused by the scroll handler for lazyloading
    let lastResponseLength = 1;
    const customLoading = ref(false);

    /**
     * lazy loads more posts if needed
     */
    const loadMore = async () => {
      if (lastResponseLength === 0) return;
      customLoading.value = true;
      const data = await fetchMore({
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

      lastResponseLength = data.data.browsePosts.length;
      customLoading.value = false;
    };

    subscribeToMore(() => ({
      document: gql`
        subscription newPost($all: Boolean!) {
          newPost(all: $all) {
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
        all: true,
      },
      updateQuery(prev, { subscriptionData: { data } }) {
        //update the exisiting data with new from the subscription
        return Object.assign({}, prev, {
          browsePosts: [data, ...prev.browsePosts!],
        });
      },
    }));

    return { posts, error, home, loadMore, loading, chipInput, tags, inputTags, customLoading };
  },
});
</script>

<style></style>
