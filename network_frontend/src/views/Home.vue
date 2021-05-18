<template>
  <div>
    <div id="home" ref="home" class="flex h-full items-center bg-white dark:bg-dark-700 flex-col rounded-3xl">
      <infinite-scroll-wrapper :queryLoading="loading" @loadMore="loadMore()" class="overflow-y-auto">
        <div class="w-full flex justify-center">
          <div class="h-full hidden lg:block w-[34%]"></div>
          <div class="w-full flex justify-center">
            <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-[80%] mb-10 mt-10">
              <div class="flex flex-col dark:text-gray-50 text-gray-900">
                <post-list
                  :posts="posts"
                  emptyText="Ganz schön leer hier, schreibe doch einen Post oder folge anderen!"
                />
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
            </div>
          </div>

          <div class="h-full hidden lg:block w-[34%] dark:text-gray-50 text-gray-900 sticky">
            <div class="p-5 pl-0 mt-7">
              <div
                class="
                  p-3
                  w-full
                  min-h-[15rem]
                  dark:bg-dark-600
                  bg-gray-100
                  rounded-xl
                  border border-gray-200
                  shadow-lg
                  dark:shadow-xl
                  dark:border-dark-600
                  text-sm
                  font-semibold
                "
              >
                Personen die du vielleicht kennst
                <div
                  class="h-full flex flex-col gap-2 mt-4 items-center"
                  v-if="recommendUsers"
                  :class="recommendUsers.length == 0 ? 'justify-center' : 'justify-evenly'"
                >
                  <follow-user-card
                    v-for="user in recommendUsers"
                    :key="user.id"
                    :user="user"
                    class="dark:!bg-dark-700 bg-gray-200 rounded-lg py-2 w-full"
                    buttonTextSize="xs"
                  ></follow-user-card>
                  <div v-if="recommendUsers.length == 0" class="text-lg">Du folgst bereits allen 🚀</div>
                </div>
              </div>
              <div
                class="
                  p-3
                  min-h-[15rem]
                  w-full
                  mt-5
                  dark:bg-dark-600
                  bg-gray-100
                  border border-gray-200
                  dark:border-dark-600
                  rounded-xl
                  shadow-lg
                  dark:shadow-xl
                  text-sm
                  font-semibold
                "
              >
                Basierend auf deinen Interessen

                <div
                  class="h-full flex flex-col gap-2 mt-4 items-center"
                  v-if="recommendUsers"
                  :class="recommendUsers.length == 0 ? 'justify-center' : 'justify-evenly'"
                >
                  <follow-user-card
                    v-for="user in recommendUsers"
                    :key="user.id"
                    :user="user"
                    buttonTextSize="xs"
                    class="dark:!bg-dark-700 bg-gray-200 rounded-lg py-2 w-full"
                  ></follow-user-card>
                  <div v-if="recommendUsers.length == 0" class="text-lg">Du folgst bereits allen 🚀</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </infinite-scroll-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, ref, watch } from 'vue';
import { useGetFeedQuery, useRecommendedUsersFacultyQuery } from '../graphql/generated/types';
import PostList from '../components/Post/PostList.vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import FollowUserCard from '../components/FollowUserCard.vue';

export default defineComponent({
  components: { PostList, InfiniteScrollWrapper, FollowUserCard },
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

    const { result: recommendUsersFaculty } = useRecommendedUsersFacultyQuery();

    const recommendUsers = useResult(recommendUsersFaculty, null, (data) => data.recommendedUsersFaculty);

    subscribeToMore(() => ({
      document: gql`
        subscription newPost($userId: String!, $all: Boolean!) {
          newPost(userId: $userId, all: $all) {
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

    return { posts, error, home, loadMore, loading, recommendUsers };
  },
});
</script>

<style></style>
