<template>
  <div>
    <div id="browse" class="flex h-full items-center bg-white dark:bg-dark-700 flex-col rounded-3xl">
      <infinite-scroll-wrapper :queryLoading="customLoading" @loadMore="loadMore()" class="overflow-y-auto">
        <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
          <div class="h-10 w-full flex items-center mb-2 flex-col md:flex-row">
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
          <div class="flex">
            <div
              class="bg-gray-500 rounded-xl p-1 pl-2 mt-10 md:mt-0 text-xs cursor-pointer flex text-white"
              @click="showExtraSearch = !showExtraSearch"
            >
              Erweiterte Suche
              <svg class="stroke-white h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 8.5L12 15.5L5 8.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
          <input-field
            v-model="searchString"
            v-if="showExtraSearch"
            class="w-full my-4 search__customInputField"
            type="text"
            placeholder="Suche nach einem Begriff"
            inputClasses="!pr-0"
          />
          <post-list :posts="posts" class="pt-10 md:pt-0" emptyText="Ganz schön leer hier, schreibe doch einen Post" />
          <div v-show="loading || customLoading" class="w-full flex justify-center">
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
import { computed, defineComponent, ref, watch, watchEffect } from 'vue';
import { useBrowsePostsQuery } from '../graphql/generated/types';
import PostList from '../components/Post/PostList.vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
import { useRoute } from 'vue-router';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import ChipsInput from '../components/Form/ChipsInput.vue';
import VueTribute from '../components/VueTribute.vue';
import InputField from '../components/Form/InputField.vue';
import { useDebounceRef } from '../components/Search.vue';

export default defineComponent({
  components: { PostList, InfiniteScrollWrapper, ChipsInput, VueTribute, InputField },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const home = ref<HTMLElement>();
    const route = useRoute();
    const chipInput = ref<InstanceType<typeof ChipsInput>>();
    const tags = ref<string[]>([]);
    const inputTags = ref<string[]>([]);
    const showExtraSearch = ref(false);
    const browseQueryEnabled = ref(false);

    const searchString = useDebounceRef('', 300, true);

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
        searchString: searchString.value,
      }),
      () => ({
        enabled: browseQueryEnabled.value,
      })
    );
    const posts = useResult(result);

    watchEffect(() => {
      console.log(searchString.value);
    });

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

    return {
      posts,
      error,
      home,
      loadMore,
      loading,
      chipInput,
      tags,
      inputTags,
      customLoading,
      showExtraSearch,
      searchString,
    };
  },
});
</script>

<style>
.search__customInputField input {
  border-radius: 1.25rem !important;
}
</style>
