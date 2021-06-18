<template>
  <div>
    <div
      id="home"
      ref="home"
      class="flex h-full justify-center bg-white dark:bg-dark-700 md:rounded-3xl transform overflow-x-hidden"
    >
      <infinite-scroll-wrapper
        :queryLoading="loading"
        @loadMore="loadMore()"
        class="overflow-y-auto transform inline-block transition-all duration-300"
        :class="showSideView && 'translate-x-[-80%] overflow-y-hidden'"
      >
        <div class="w-full flex flex-col">
          <div
            v-if="showSideView"
            class="absolute w-full h-full bg-black opacity-60 rounded-r-xl"
            @click="showSideView = false"
          ></div>

          <app-button
            @click="showSideView = !showSideView"
            class="h-8 self-end mr-4 mt-2"
            v-if="['sm', 'md'].includes(breakpoints.is)"
          >
            <svg
              class="stroke-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0201 10.9134C17.8411 10.9134 19.3171 9.4374 19.3171 7.6164C19.3171 5.7964 17.8411 4.3194 16.0201 4.3194"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5363 14.4964C18.0803 14.5334 18.6203 14.6114 19.1533 14.7294C19.8923 14.8764 20.7823 15.1794 21.0983 15.8424C21.3003 16.2674 21.3003 16.7624 21.0983 17.1874C20.7833 17.8504 19.8923 18.1534 19.1533 18.3054"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.59143 15.2063C13.2814 15.2063 16.4334 15.7653 16.4334 17.9983C16.4334 20.2323 13.3014 20.8103 9.59143 20.8103C5.90143 20.8103 2.75043 20.2523 2.75043 18.0183C2.75043 15.7843 5.88143 15.2063 9.59143 15.2063Z"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.5914 12.0188C7.1574 12.0188 5.2074 10.0678 5.2074 7.63379C5.2074 5.20079 7.1574 3.24979 9.5914 3.24979C12.0254 3.24979 13.9764 5.20079 13.9764 7.63379C13.9764 10.0678 12.0254 12.0188 9.5914 12.0188Z"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </app-button>
          <div class="w-full flex justify-center">
            <div class="h-full hidden 2xl:block w-[34%]"></div>
            <div class="w-full flex justify-center">
              <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-[80%] mb-10 mt-4">
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

            <div class="h-full hidden lg:block w-[34%] dark:text-gray-50 text-gray-900">
              <div class="relative">
                <div class="p-3 pt-6 pl-0 fixed right-1 min-w-[19%]">
                  <div
                    class="
                      p-3
                      w-full
                      min-h-[15rem]
                      min-w-[20rem]
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
                      <div v-if="recommendUsers.length == 0" class="text-lg">Du folgst bereits allen 🎉</div>
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
                      <div v-if="recommendUsers.length == 0" class="text-lg">Du folgst bereits allen 🎉</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </infinite-scroll-wrapper>

      <transition name="slide">
        <div
          v-if="showSideView"
          class="transform absolute top-0 right-0 h-full w-[80%] text-white p-1 transition-all translate-x-0"
          :class="!showSideView && 'translate-x-[100%]'"
        >
          <div class="bg-dark-600 h-full rounded-xl p-2 shadow-xl">
            <div class="ml-2 cursor-pointer" @click="showSideView = false">
              <svg
                class="stroke-white"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25 12.2743L19.25 12.2743"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.2998 18.2987L4.2498 12.2747L10.2998 6.24969"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              class="
                p-3
                w-full
                dark:bg-dark-600
                bg-gray-100
                rounded-xl
                border border-gray-200
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
                <div v-if="recommendUsers.length == 0" class="text-lg">Du folgst bereits allen 🎉</div>
              </div>
            </div>
            <div
              class="
                p-3
                w-full
                dark:bg-dark-600
                bg-gray-100
                rounded-xl
                border border-gray-200
                dark:border-dark-600
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
                <div v-if="recommendUsers.length == 0" class="text-lg">Du folgst bereits allen 🎉</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
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
import breakpoints from '../utils/breakpoints';
import { state } from '../utils/state';

export default defineComponent({
  components: { PostList, InfiniteScrollWrapper, FollowUserCard },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const home = ref<HTMLElement>();
    const showSideView = ref(false);

    const feedQueryEnabled = ref(false);

    watch(
      () => store.state.userData.user,
      () => {
        if (store.state.userData.user.id) {
          feedQueryEnabled.value = true;
        }
      }
    );

    watch(
      () => showSideView.value,
      () => {
        state.showNewPostFloatingButton = showSideView.value;
      }
    );

    if (user.value.id) {
      feedQueryEnabled.value = true;
    }

    //get the inital feed
    const { result, error, subscribeToMore, fetchMore, loading } = useGetFeedQuery(
      {
        limit: 10,
        offset: 0,
      },
      () => ({ enabled: feedQueryEnabled.value })
    );
    const posts = useResult(result);

    //fill up the recommending components
    const { result: recommendUsersFaculty } = useRecommendedUsersFacultyQuery();

    const recommendUsers = useResult(recommendUsersFaculty, null, (data) => data.recommendedUsersFaculty);

    //subscribe to new posts, to update the ui
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
        all: false,
      },
      updateQuery(prev, {subscriptionData: {data}}) {

        if(prev.getFeed.some(p => p.id == data.newPost.id)) {
          return prev;
        }

        //update the exisiting data with new from the subscription
        return Object.assign({}, prev, {
          getFeed: [data, ...prev.getFeed]
        })
      }
    }));

    let lastResponseLength = 1;

    /**
     * lazy load more posts
     */
    const loadMore = async () => {
      if (lastResponseLength === 0) return;
      const data = await fetchMore({
        variables: {
          offset: posts.value.length,
        },
      });

      lastResponseLength = data.data.getFeed.length;
    };

    return { posts, error, home, loadMore, loading, recommendUsers, showSideView, breakpoints };
  },
});
</script>

<style>
.slide-enter-active {
  animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-leave-active {
  animation: slide-out 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slide-in {
  0% {
    transform: translateX(80%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes slide-out {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
