<template>
  <div id="profile" class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto text-gray-100">
    <div class="bg-dark600 w-11/12 my-3 mb-6 flex flex-col rounded-xl">
      <div>
        <div>
          <img
            class="h-32 w-full object-cover lg:h-54 rounded-xl"
            src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
          />
        </div>
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="-mt-12 sm:-mt-16 sm:flex sm:items-center flex-col">
            <div class="flex">
              <div
                v-if="showEditProfile"
                class="absolute text-gray-200 h-24 w-24 sm:h-32 sm:w-32 text-lg flex flex-col bg-black rounded-full bg-opacity-70 opacity-0 hover:opacity-100 flex text-center cursor-pointer"
              >
                <span class="sm:m-8 sm:mb-0 mt-4 font-medium">Avatar</span>
                <span class="sm:m-8 sm:mt-1 font-medium">Ändern</span>
              </div>

              <img class="h-24 w-24 rounded-full border-3 sm:h-32 sm:w-32 bg-black" :src="profileImage" alt="profile image" />
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
                <div class="border-b-3 roundel-xl pb-2">
                  Posts
                  <span class="ml-2 font-light dark:text-gray-300">{{ postCount }}</span>
                </div>
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
                <a
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
                </a>
                <a
                  @click="followUser"
                  v-else-if="!following"
                  class="ml-6 px-6 inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                >
                  Folgen
                </a>
                <a
                  @click="unfollowUser"
                  v-else
                  class="ml-6 inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                >
                  Folge Ich
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <post-list :posts="posts" />
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import PostList from '@/components/PostList.vue';
import {
  useGetPostsFromUserQuery,
  useUserByIdQuery,
  useAddFollowerMutation,
  useRemoveFollowerMutation,
} from '../graphql/generated/graphqlOperations';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { userById } from '../graphql/queries/userById';

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
    const user = ref({});
    const store = useStore();
    const following = ref(false);
    const posts = ref([]);

    const userFromStore = computed(() => store.state.userData.user);

    watch(
      () => route.params.id,
      () => {
        console.log('here');
        if (userFromStore.value.id === route.params.id) {
          showEditProfile.value = true;
        } else {
          showEditProfile.value = false;
        }
      }
    );

    const { onResult } = useUserByIdQuery(() => ({
      userId: route.params.id,
    }));

    onResult((userResult) => {
      const userData = userResult.data.userById;
      profileImage.value = userData.profilePicLink;
      user.value = userData;
      followerCount.value = userData.followers.length;
      followingCount.value = userData.following.length;
      const userExists = userData.followers.some((user) => user.id === userFromStore.value.id);
      if (userExists) {
        following.value = true;
      } else {
        following.value = false;
      }
    });

    const { onResult: onResultPosts } = useGetPostsFromUserQuery(() => ({
      userID: route.params.id,
      pollInterval: 60000,
    }));

    onResultPosts((postData) => {
      const postsResult = postData?.data?.getPostsFromUser;
      postCount.value = postsResult.length;
      posts.value = [...postsResult];
    });

    const { mutate: follow } = useAddFollowerMutation({
      variables: {
        userID: route.params.id,
      },
      refetchQueries: [
        {
          query: userById,
          variables: { userId: route.params.id },
        },
      ],
    });

    const { mutate: unfollow } = useRemoveFollowerMutation({
      variables: {
        userID: route.params.id,
      },
      refetchQueries: [
        {
          query: userById,
          variables: { userId: route.params.id },
        },
      ],
    });

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
      posts,
      profileImage,
      postCount,
      followerCount,
      followingCount,
      showEditProfile,
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
