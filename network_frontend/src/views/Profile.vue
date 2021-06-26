<template>
  <div
    id="profile"
    class="flex h-full items-center bg-white dark:bg-dark-700 flex-col rounded-3xl overflow-y-auto text-gray-100"
  >
    <infinite-scroll-wrapper
      :queryLoading="qloading"
      @loadMore="emitLoad"
      class="w-full overflow-y-auto flex flex-col items-center"
      v-if="!error"
    >
      <div class="dark:bg-dark-600 bg-gray-100 w-11/12 my-3 mb-2 flex flex-col rounded-xl">
        <div>
          <div class="h-32 w-full lg:h-64">
            <lazy-image
              class="object-cover h-32 w-full lg:h-64 rounded-xl"
              src="abc"
              alt=""
              blurhash="LvICmx{hjJJ8B,EzX7wdJTNHoysS"
              :onLoad="false"
            />
          </div>
          <div class="max-w-5xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-14 2xl:px-0">
            <div class="-mt-12 md:-mt-20 flex items-center flex-col z-20">
              <div class="flex w-full z-10">
                <div class="rounded-full w-24 h-24 md:w-44 md:h-44" v-if="!user">
                  <div
                    class="
                      z-10
                      w-24
                      h-24
                      rounded-full
                      md:w-44 md:h-44
                      dark:bg-dark-600
                      bg-white
                      self-center
                      border-2
                      p-1
                      object-cover
                      border-white
                      dark:border-dark-600
                    "
                  ></div>
                </div>
                <div
                  class="rounded-full w-24 h-24 md:w-44 md:h-44 flex-shrink-0 p-2 bg-gray-100 dark:bg-dark-600"
                  v-if="user"
                >
                  <lazy-image
                    :blurhash="user.avatar.blurhash"
                    class="z-10 rounded-full self-center object-cover bg-dark-600"
                    :src="profileImage"
                    alt="profile image"
                    rounded="full"
                  />
                </div>

                <div class="flex w-full justify-end items-center mt-20">
                  <div class="flex flex-col">
                    <app-button @click="$refs.editProfileModal.openModal()" v-if="showEditProfile" class="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        class="h-4 mr-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profil bearbeiten
                    </app-button>
                    <follow-button
                      class="w-full"
                      v-else-if="!showEditProfile"
                      :user="user"
                      :following="following"
                    ></follow-button>
                    <app-button
                      v-if="!showEditProfile"
                      @click="handleChatNav"
                      class="mt-2 justify-center !border-2 !border-brand-500 bg-opacity-60 dark:bg-opacity-20"
                    >
                      Nachricht senden
                    </app-button>
                  </div>
                </div>
              </div>
              <div class="w-full mt-2 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:pb-10 md:ml-10 min-h-[5rem]">
                <div class="block md:hidden mt-6 min-w-full flex-1">
                  <h1 v-if="user" class="md:text-2xl font-bold text-gray-900 dark:text-gray-50 text-lg">
                    {{ user?.firstname + ' ' + user?.lastname }}
                  </h1>
                  <div v-if="user?.roles" class="flex mt-2">
                    <div v-for="role in user?.roles" :key="role.id" class="mr-1 cursor-default">
                      <role-wrapper :name="role.name" />
                    </div>
                  </div>
                  <h2 v-if="user?.bio" class="text-gray-900 dark:text-gray-50 my-5">
                    {{ user.bio }}
                  </h2>
                </div>
                <div class="w-full mt-1 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div class="hidden md:flex min-w-0 flex-1 pb-4 w-full flex-col">
                    <h1 v-if="user?.firstname" class="text-2xl font-bold text-gray-900 truncate dark:text-gray-50">
                      {{ user?.firstname + ' ' + user?.lastname }}
                    </h1>
                    <div v-if="user?.roles" class="flex mt-2">
                      <div v-for="role in user?.roles" :key="role.id" class="mr-1 cursor-default">
                        <role-wrapper :name="role.name" />
                      </div>
                    </div>
                    <h2 v-if="user?.bio" class="text-gray-900 dark:text-gray-50 mt-5">
                      {{ user.bio }}
                    </h2>
                  </div>
                </div>
              </div>
              <div
                class="
                  flex flex-col
                  sm:space-y-0
                  space-y-5
                  sm:flex-row
                  dark:text-gray-50
                  pb-2
                  md:pb-4
                  justify-center
                  w-full
                  items-center
                "
              >
                <div
                  class="
                    flex
                    items-center
                    md:justify-center
                    justify-evenly
                    sm:space-x-10
                    space-x-0
                    sm:space-y-0 sm:flex-row
                    transition-all
                    duration-1000
                    w-full
                  "
                >
                  <router-link :to="{ name: 'ProfilePosts', params: { id: $route.params.id } }">
                    <div class="py-1 px-1 rounded-lg !text-sm sm:!text-base">
                      <span class="dark:text-gray-50 text-gray-900">Posts</span>
                      <span class="ml-2 font-mono dark:text-gray-50 text-gray-900">{{
                        numberFormatter(postCount)
                      }}</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'ProfileFollowers', params: { id: $route.params.id } }">
                    <div class="py-1 px-1 rounded-lg !text-sm sm:!text-base">
                      <span class="dark:text-gray-50 text-gray-900">Followers</span>
                      <span class="ml-2 font-mono dark:text-gray-50 text-gray-900">{{
                        numberFormatter(followerCount)
                      }}</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'ProfileFollowing', params: { id: $route.params.id } }">
                    <div class="py-1 px-1 rounded-lg !text-sm sm:!text-base">
                      <span class="dark:text-gray-50 text-gray-900">Folge Ich</span>
                      <span class="ml-2 font-mono dark:text-gray-50 text-gray-900">{{
                        numberFormatter(followingCount)
                      }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="['sm', 'md'].includes(breakpoints.is)"
        class="bg-dark-600 px-4 py-1 rounded-xl flex items-center cursor-pointer"
        @click="openAboutMe = !openAboutMe"
      >
        <div>Über mich</div>
        <div class="ml-2">
          <svg
            class="h-5 w-5 dark:stroke-white stroke-black"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 8.5L12 15.5L5 8.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
      <div class="flex w-11/12 flex-col lg:flex-row items-center lg:items-start">
        <div
          v-if="!['sm', 'md'].includes(breakpoints.is) || openAboutMe"
          class="
            dark:bg-dark-600
            bg-gray-100
            border
            dark:border-dark-600
            shadow-sm
            h-96
            w-11/12
            lg:w-96
            rounded-lg
            lg:mr-10 lg:flex
            flex-col
            mt-2
          "
        >
          <div class="p-5 dark:text-gray-50 text-gray-900">
            <span class="font-semibold">Fakultät</span>
            <div class="flex my-2 items-center">
              <div class="dark:bg-dark-500 bg-gray-400 h-8 w-8 rounded-full mr-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 p-1" fill="#000000" viewBox="0 0 256 256">
                  <rect width="256" height="256" fill="none"></rect>
                  <polygon
                    points="8 96 128 32 248 96 128 160 8 96"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></polygon>
                  <polyline
                    points="188 240 188 128 128 96"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></polyline>
                  <path
                    d="M220,110.93333v54.5208a7.95694,7.95694,0,0,1-1.58951,4.78692C211.67382,179.20536,183.2529,212,128,212s-83.67382-32.79464-90.41049-41.75895A7.95694,7.95694,0,0,1,36,165.45413v-54.5208"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></path>
                </svg>
              </div>
              <div class="text-sm">{{ user?.faculty || '-' }}</div>
            </div>
            <span class="font-semibold">Studiengang</span>
            <div class="flex my-2 items-center">
              <div class="dark:bg-dark-500 bg-gray-400 h-8 w-8 rounded-full mr-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 p-1" fill="#000000" viewBox="0 0 256 256">
                  <rect width="256" height="256" fill="none"></rect>
                  <polygon
                    points="8 96 128 32 248 96 128 160 8 96"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></polygon>
                  <polyline
                    points="188 240 188 128 128 96"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></polyline>
                  <path
                    d="M220,110.93333v54.5208a7.95694,7.95694,0,0,1-1.58951,4.78692C211.67382,179.20536,183.2529,212,128,212s-83.67382-32.79464-90.41049-41.75895A7.95694,7.95694,0,0,1,36,165.45413v-54.5208"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></path>
                </svg>
              </div>
              <div class="text-sm">{{ user?.studyCourse || '-' }}</div>
            </div>
            <span class="font-semibold">Interessen</span>
            <div class="flex my-2 items-center">
              <div class="dark:bg-dark-500 bg-gray-400 h-8 w-8 rounded-full mr-4 flex items-center justify-center">
                <svg class="h-8 w-8 p-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.761 20.8538C9.5904 19.5179 7.57111 17.9456 5.73929 16.1652C4.45144 14.8829 3.47101 13.3198 2.8731 11.5954C1.79714 8.25031 3.05393 4.42083 6.57112 3.28752C8.41961 2.69243 10.4384 3.03255 11.9961 4.20148C13.5543 3.03398 15.5725 2.69398 17.4211 3.28752C20.9383 4.42083 22.2041 8.25031 21.1281 11.5954C20.5302 13.3198 19.5498 14.8829 18.2619 16.1652C16.4301 17.9456 14.4108 19.5179 12.2402 20.8538L12.0051 21L11.761 20.8538Z"
                    stroke="#fff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.7393 7.05301C16.8046 7.39331 17.5615 8.34971 17.6561 9.47499"
                    stroke="#fff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div class="break-all text-sm">{{ user?.interests || '-' }}</div>
              </div>
            </div>
          </div>
        </div>
        <router-view v-if="user" :userId="user.id" />
      </div>
    </infinite-scroll-wrapper>
    <div v-else class="mt-36 text-3xl">Dieser Nutzer existiert nicht</div>
    <modal ref="editProfileModal" headerText="Profil bearbeiten">
      <edit-profile @close="$refs.editProfileModal.closeModal()" :user="user" />
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, watchEffect, getCurrentInstance } from 'vue';
import PostList from '../components/Post/PostList.vue';
import { useCreateChatMutation, useUserByUsernameQuery, useUserStatsQuery } from '../graphql/generated/types';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { numberFormatter } from '../utils/numberFormatter';
import LazyImage from '../components/Blurhash/LazyImage.vue';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import Modal from '../components/Modal.vue';
import EditProfile from '../components/EditProfile.vue';
import { useResult } from '@vue/apollo-composable';
import FollowButton from '../components/Form/FollowButton.vue';
import breakpoints from '../utils/breakpoints';
import RoleWrapper from '../components/RoleWrapper.vue';
export default defineComponent({
  components: {
    PostList,
    LazyImage,
    InfiniteScrollWrapper,
    Modal,
    EditProfile,
    FollowButton,
    RoleWrapper,
  },
  setup() {
    const route = useRoute();
    const showEditProfile = ref(false);
    const store = useStore();
    const followButtonText = ref('Folge ich');
    const qloading = ref(false);
    const router = useRouter();
    const editProfileModal = ref();
    const userStatsEnabled = ref(false);
    const userFromStore = computed(() => store.state.userData.user);
    const openAboutMe = ref(false);

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

    const { result, error } = useUserByUsernameQuery(() => ({
      username: route.params.id as string,
    }));

    const user = useResult(result, null, (data) => data.userByUsername);
    const profileImage = useResult(result, null, (data) => data.userByUsername.avatar.name);
    const following = useResult(result, null, (data) => data.userByUsername.meFollowing);

    //stats query is disabled by default, activate the query if the user is set
    watch(
      () => user.value,
      () => {
        if (user.value) {
          userStatsEnabled.value = true;
        }
      }
    );

    //fetch the user stats
    const { result: statsResult } = useUserStatsQuery(
      () => ({
        userId: user.value?.id as string,
      }),
      () => ({ enabled: userStatsEnabled.value })
    );

    const postCount = useResult(statsResult, 0, (data) => data.userStats.postCount);
    const followerCount = useResult(statsResult, 0, (data) => data.userStats.followerCount);
    const followingCount = useResult(statsResult, 0, (data) => data.userStats.followingCount);

    //register eventbus event for the infintyscroll wrapper
    const internalInstance = getCurrentInstance();
    const eventbus = internalInstance?.appContext.config.globalProperties.eventbus;
    const emitLoad = () => {
      eventbus?.emit('loadMoreProfilePosts');
      qloading.value = false;
    };

    eventbus?.on('ProfilePostsLoadingUpdate', (loadingState: boolean) => {
      qloading.value = loadingState;
    });

    //create a new chat if not exist
    const { mutate: createChat } = useCreateChatMutation(() => ({
      variables: {
        memberId: user.value?.id as string,
      },
    }));

    /**
     * creates a chat with the user and navigates to the new chat
     */
    const handleChatNav = async () => {
      const response = await createChat();
      router.push({ name: 'ChatBox', params: { id: response.data?.createChat.id! } });
    };

    return {
      following,
      user,
      profileImage,
      showEditProfile,
      followButtonText,
      postCount,
      followerCount,
      followingCount,
      emitLoad,
      qloading,
      editProfileModal,
      error,
      handleChatNav,
      openAboutMe,
      breakpoints,
      numberFormatter,
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
  @apply fill-brand;
}
a:hover path {
  @apply fill-brand;
}

@screen md {
  .dark a.router-link-exact-active div {
    @apply bg-brand-500;
    @apply relative;
    @apply border-b-0 !important;
    @apply rounded-lg !important;
  }

  a.router-link-exact-active div {
    @apply bg-brand-500;
    @apply relative;
    @apply border-b-0 !important;
    @apply rounded-lg !important;
  }
}

.dark a.router-link-exact-active div {
  @apply relative;
  @apply border-b-4;
  @apply rounded-none;
}

a.router-link-exact-active div {
  @apply relative;
  @apply border-b-4;
  @apply rounded-none;
}

a.router-link-exact-active span {
  @apply text-white !important;
}

.smartWordFormat {
}
</style>
