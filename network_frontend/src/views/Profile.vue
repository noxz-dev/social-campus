<template>
  <div id="profile" class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto text-gray-100">
    <div class="dark:bg-dark600 bg-gray-100 w-11/12 my-3 mb-6 flex flex-col rounded-xl">
      <div>
        <div>
          <img
            class="h-32 w-full object-cover lg:h-64 rounded-xl"
            src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
          />
        </div>
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="-mt-12 sm:-mt-16 sm:flex sm:items-center flex-col">
            <div class="flex">
              <img class="h-24 w-24 rounded-full border-3 sm:h-48 sm:w-48 bg-black" :src="profileImage" alt="profile image" />
            </div>
            <div class="mt-6 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:pb-10">
              <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                <h1 class="text-2xl font-bold text-gray-900 truncate dark:text-gray-50">
                  {{ user?.firstname + ' ' + user?.lastname }}
                </h1>
              </div>
              <div class="mt-1 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div class="hidden sm:block 2xl:hidden min-w-0 flex-1 pb-4">
                  <h1 class="text-2xl font-bold text-gray-900 truncate dark:text-gray-50 text-center">
                    {{ user?.firstname + ' ' + user?.lastname }}
                    <br />
                    <span class="text-lg">Fakt4 Angewandte Informatik</span>
                  </h1>
                </div>
              </div>
            </div>
            <div class="flex self-start flex-col sm:space-y-0 space-y-5 sm:flex-row dark:text-gray-50 pb-4 justify-between w-full items-center">
              <div class="flex sm:space-x-10 space-x-0 space-y-5 sm:space-y-0 flex-col sm:flex-row">
                <router-link :to="{ name: 'ProfilePosts' }">
                  <div class="p-2 rounded-lg">
                    <span class="dark:text-gray-50 text-gray-900">Posts</span>
                    <span class="ml-2 font-light dark:text-gray-50 text-gray-900">{{ stats?.userStats?.postCount }}</span>
                  </div>
                </router-link>
                <router-link :to="{ name: 'ProfileFollowers' }">
                  <div class="p-2 rounded-lg">
                    <span class="dark:text-gray-50 text-gray-900">Followers</span>
                    <span class="ml-2 font-light dark:text-gray-50 text-gray-900">{{ stats?.userStats?.followerCount }}</span>
                  </div>
                </router-link>
                <router-link :to="{ name: 'ProfileFollowing' }">
                  <div class="p-2 rounded-lg">
                    <span class="dark:text-gray-50 text-gray-900">Following</span>
                    <span class="ml-2 font-light dark:text-gray-50 text-gray-900">{{ stats?.userStats?.followingCount }}</span>
                  </div>
                </router-link>
              </div>
              <div>
                <button
                  v-if="showEditProfile"
                  class="ml-6 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-4 mr-2" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Edit Profile
                </button>
                <a
                  @click="followUser"
                  v-else-if="!following"
                  class="ml-6 px-6 inline-flex cursor-pointer items-center py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                >
                  Folgen
                </a>
                <button
                  @mouseover="followButtonText = 'Entfolgen'"
                  @mouseout="followButtonText = 'Folge ich'"
                  @click="unfollowUser"
                  v-else
                  class="ml-6 w-[6.5rem] text-center inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500 duration-200"
                >
                  {{ followButtonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-view v-if="user" :userId="user.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, watchEffect } from 'vue';
import PostList from '@/components/PostList.vue';
import {
  useAddFollowerMutation,
  useRemoveFollowerMutation,
  UserStatsQueryCompositionFunctionResult,
  useUserByUsernameQuery,
  useUserStatsQuery,
} from '../graphql/generated/graphqlOperations';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { userById } from '../graphql/queries/userById';
import { User, UserStats, UserStatsQueryVariables } from '../graphql/generated/types';

export default defineComponent({
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();
    const postCount = ref(0);
    const followerCount = ref(0);
    const followingCount = ref(0);
    const showEditProfile = ref(false);
    const profileImage = ref('');
    const user = ref<User>();
    const store = useStore();
    const following = ref(false);
    const stats = ref<UserStats>();

    const followButtonText = ref('Folge ich');

    const userFromStore = computed(() => store.state.userData.user);

    watchEffect(() => {
      if (userFromStore.value.username === route.params.id) {
        showEditProfile.value = true;
      } else {
        showEditProfile.value = false;
      }
    });

    watch(
      () => route.params.id,
      () => {
        if (userFromStore.value.username === route.params.id) {
          showEditProfile.value = true;
        } else {
          showEditProfile.value = false;
        }
      }
    );

    const { onResult } = useUserByUsernameQuery(() => ({
      username: route.params.id,
    }));

    onResult((userResult) => {
      const userData = userResult.data.userByUsername;
      profileImage.value = userData.profilePicLink;
      user.value = userData;

      const { onResult: onStats } = useUserStatsQuery(
        () =>
          <UserStatsQueryVariables>{
            userId: user.value?.id,
          }
      );

      onStats(({ data }) => {
        console.log(data);
        stats.value = data;
      });
    });

    const { mutate: follow } = useAddFollowerMutation(() => ({
      variables: {
        userID: user.value?.id,
      },
      refetchQueries: [
        {
          query: userById,
          variables: { userId: user.value?.id },
        },
      ],
    }));

    const { mutate: unfollow } = useRemoveFollowerMutation(() => ({
      variables: {
        userID: user.value?.id,
      },
      refetchQueries: [
        {
          query: userById,
          variables: { userId: user.value?.id },
        },
      ],
    }));

    const followUser = () => {
      follow();
    };

    const unfollowUser = () => {
      unfollow();
    };

    return {
      following,
      followUser,
      unfollowUser,
      user,
      profileImage,
      postCount,
      followerCount,
      followingCount,
      showEditProfile,
      followButtonText,
      stats,
    };
  },
});
</script>

<style scoped>
a.router-link-exact-active div {
  @apply text-gray-100;
  @apply border-indigo-500;
}
a.router-link-exact-active path {
  @apply fill-indigo;
}
a:hover path {
  @apply fill-indigo;
}
@screen md {
  @media (prefers-color-scheme: dark) {
    a.router-link-exact-active div {
      @apply bg-highlight-500;
      @apply relative;
      @apply border-b-0;
    }
  }

  @media (prefers-color-scheme: light) {
    a.router-link-exact-active div {
      @apply bg-gray-200;
      @apply relative;
      @apply border-b-0;
    }
  }
}
</style>
