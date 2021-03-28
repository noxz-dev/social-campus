<template>
  <div id="profile" class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto text-gray-100">
    <div class="bg-dark600 w-11/12 my-3 mb-6 flex flex-col rounded-xl">
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
                  <div class="border-b-3 roundel-xl pb-2">
                    Posts
                    <span class="ml-2 font-light dark:text-gray-300">{{ postCount }}</span>
                  </div>
                </router-link>
                <div>
                  Followers
                  <span class="ml-2 font-light dark:text-gray-300">{{ followerCount }}</span>
                </div>
                <div>
                  Following
                  <span class="ml-2 font-light dark:text-gray-300">{{ followingCount }}</span>
                </div>
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
import { useAddFollowerMutation, useRemoveFollowerMutation, useUserByUsernameQuery } from '../graphql/generated/graphqlOperations';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { userById } from '../graphql/queries/userById';
import { User } from '../graphql/generated/types';

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

      //TODO MOVE TO BACKEND
      const userExists = userData.followers.some((user) => user.id === userFromStore.value.id);
      if (userExists) {
        following.value = true;
      } else {
        following.value = false;
      }
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
    };
  },
});
</script>

<style>
#profile::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #272b2f;
}
#profile::-webkit-scrollbar {
  width: 12px;
  background-color: #272b2f;
}
#profile::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #363b41;
}
</style>
