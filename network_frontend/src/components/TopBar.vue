<template>
  <header
    v-if="show && $route?.name !== 'Login' && $route?.name !== 'Register'"
    class="fixed bg-white dark:bg-dark700 shadow-sm w-full lg:overflow-y-visible z-40"
  >
    <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
        <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
          <div class="flex-shrink-0 flex items-center flex-row">
            <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="Workflow" />
            <div v-if="breakpoints.is != 'md' && breakpoints.is != 'sm'" class="text-gray-50 ml-5 text-xl font-semibold">SocialCampus</div>
          </div>
          <div
            v-if="breakpoints.is != 'sm' && breakpoints.is != 'md' && breakpoints.is != 'lg'"
            class="pl-28 font-bold text-xl flex-shrink-0 flex items-center text-gray-50"
          >
            Hey {{ user?.firstname }} 👋
          </div>
        </div>
        <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-4 xl:col-start-5">
          <div class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div class="w-full">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <!-- <svg class="h-5 w-5 text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg> -->
                </div>
                <search class="h-8" />
                <!-- <input
                  id="search"
                  name="search"
                  class="block w-full dark:text-gray-100 dark:bg-dark600 bg-white border border-gray-300 dark:border-dark600 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 dark:focus:text-gray-100 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Finde neue Leute"
                  type="search"
                /> -->
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden bg-dark700">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="-mx-2 rounded-md p-2 inline-flex items-center justify-center dark:bg-dark600 text-gray-400 hover:bg-gray-100 dark:hover:bg-dark700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-expanded="false"
            @click="openMobileMenu"
          >
            <span class="sr-only">Open menu</span>
            <svg
              class="block h-6 w-6 text-gray-50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
          <a
            @click="notifyOpen = !notifyOpen"
            href="#"
            class="ml-5 flex-shrink-0 bg-white dark:bg-dark600 rounded-full p-1 text-gray-200 hover:text-gray-500 focus:outline-none dark:focus:ring-offset-dark700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </a>

          <div class="relative">
            <transition name="fade">
              <notifications v-if="notifyOpen" @click.prevent />
            </transition>
          </div>

          <!-- Profile dropdown -->
          <div class="flex-shrink-0 relative ml-5">
            <div>
              <button
                id="user-menu"
                type="button"
                class="bg-white dark:bg-dark700 rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                aria-haspopup="true"
                @click="showProfileMenu = !showProfileMenu"
              >
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="profileImage" alt="" />
              </button>
            </div>

            <transition name="fade">
              <div
                v-if="showProfileMenu"
                ref="target"
                class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-dark800 ring-1 ring-black ring-opacity-5 border-dark500 border"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <div class="flex items-center dark:hover:bg-dark600 hover:bg-gray-100 transition duration-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 ml-2 text-white" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <a
                    @click="
                      $router.push({
                        name: 'Profile',
                        params: {
                          id: user.id,
                        },
                      })
                    "
                    class="block py-2 pl-5 w-full px-4 text-sm dark:text-gray-100 text-gray-700 cursor-pointer"
                    role="menuitem"
                    >Dein Profil</a
                  >
                </div>
                <div class="flex items-center dark:hover:bg-dark600 hover:bg-gray-100 transition duration-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 ml-2 text-white" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <a href="#" class="block py-2 px-4 text-sm dark:text-gray-100 text-gray-700" role="menuitem">Einstellungen</a>
                </div>
                <div class="flex items-center dark:hover:bg-dark600 hover:bg-gray-100 transition duration-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 ml-2 text-white" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <a href="#" class="block py-2 px-4 text-sm dark:text-gray-100 text-gray-700" role="menuitem" @click="logout">Ausloggen</a>
                </div>
              </div>
            </transition>
          </div>

          <a
            href="#"
            class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
            @click="eventbus.emit('open-modal')"
          >
            New Post
            <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="ml-2 h-6 w-6">
              <g id="Iconly/Bulk/Send" stroke="none" stroke-width="1" fill-rule="evenodd">
                <g id="Send" transform="translate(2.000000, 2.000000)" fill-rule="nonzero">
                  <path
                    d="M19.4274202,0.578298605 C18.9274202,0.0672986048 18.1874202,-0.121701395 17.4974202,0.0782986048 L1.40742017,4.7272986 C0.679420165,4.9292986 0.163420165,5.5062986 0.024420165,6.2382986 C-0.117579835,6.9842986 0.378420165,7.9322986 1.02642017,8.3282986 L6.05742017,11.4002986 C6.57342017,11.7162986 7.23942017,11.6372986 7.66642017,11.2092986 L13.4274202,5.4482986 C13.7174202,5.1472986 14.1974202,5.1472986 14.4874202,5.4482986 C14.7774202,5.7372986 14.7774202,6.2082986 14.4874202,6.5082986 L8.71642017,12.2692986 C8.28842017,12.6972986 8.20842017,13.3612986 8.52342017,13.8782986 L11.5974202,18.9282986 C11.9574202,19.5272986 12.5774202,19.8682986 13.2574202,19.8682986 C13.3374202,19.8682986 13.4274202,19.8682986 13.5074202,19.8572986 C14.2874202,19.7582986 14.9074202,19.2272986 15.1374202,18.4772986 L19.9074202,2.5082986 C20.1174202,1.8282986 19.9274202,1.0882986 19.4274202,0.578298605"
                    id="Fill-1"
                    class="fill-white"
                  ></path>
                  <path
                    d="M7.45142017,17.1421986 C7.74342017,17.4351986 7.74342017,17.9101986 7.45142017,18.2031986 L6.08542017,19.5681986 C5.93942017,19.7151986 5.74742017,19.7881986 5.55542017,19.7881986 C5.36342017,19.7881986 5.17142017,19.7151986 5.02542017,19.5681986 C4.73242017,19.2751986 4.73242017,18.8011986 5.02542017,18.5081986 L6.39042017,17.1421986 C6.68342017,16.8501986 7.15842017,16.8501986 7.45142017,17.1421986 Z M6.66772017,13.3541986 C6.95972017,13.6471986 6.95972017,14.1221986 6.66772017,14.4151986 L5.30172017,15.7801986 C5.15572017,15.9271986 4.96372017,16.0001986 4.77172017,16.0001986 C4.57972017,16.0001986 4.38772017,15.9271986 4.24172017,15.7801986 C3.94872017,15.4871986 3.94872017,15.0131986 4.24172017,14.7201986 L5.60672017,13.3541986 C5.89972017,13.0621986 6.37472017,13.0621986 6.66772017,13.3541986 Z M2.90652017,12.1617986 C3.19852017,12.4547986 3.19852017,12.9297986 2.90652017,13.2227986 L1.54052017,14.5877986 C1.39452017,14.7347986 1.20252017,14.8077986 1.01052017,14.8077986 C0.818520165,14.8077986 0.626520165,14.7347986 0.480520165,14.5877986 C0.187520165,14.2947986 0.187520165,13.8207986 0.480520165,13.5277986 L1.84552017,12.1617986 C2.13852017,11.8697986 2.61352017,11.8697986 2.90652017,12.1617986 Z"
                    id="Combined-Shape"
                    opacity="0.400000006"
                    class="fill-white"
                  ></path>
                </g>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <nav class="lg:hidden" :class="showMobileMenu ? 'block' : 'hidden'" aria-label="Global">
      <div class="border-t border-dark600 pt-4 pb-3">
        <div class="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="profileImage" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium dark:text-gray-50 text-gray-800">
              {{ user?.firstname }}
            </div>
            <div class="text-sm font-medium dark:text-gray-400 text-gray-500">
              {{ user?.firstname }}
            </div>
          </div>
          <button
            type="button"
            class="ml-auto flex-shrink-0 dark:bg-dark700 bg-white rounded-full p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
          >
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
        <div class="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4 block">
          <a
            href="#"
            @click="$router.push('/profile')"
            class="block rounded-md py-2 px-3 text-base font-medium dark:text-gray-50 text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-dark600"
            >Dein Profil</a
          >

          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium dark:text-gray-50 text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-dark600"
            >Einstellungen</a
          >

          <a
            href="#"
            @click="logout"
            class="block rounded-md py-2 px-3 text-base font-medium dark:text-gray-50 text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-dark600"
            >Ausloggen</a
          >
        </div>
      </div>
    </nav>
  </header>
  <floating-button class="lg:hidden sm:block" text="Neuer Post" @click="eventbus.emit('open-modal')" />
  <modal ref="modal" content-text="" header-text="New Post">
    <new-post />
  </modal>
  <transition name="fade">
    <post-detail-card></post-detail-card>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import NewPost from './NewPost.vue';
import breakpoints from '../_helpers/breakpoints';
import { useMeQuery } from '../graphql/generated/graphqlOperations';
import { useResult } from '@vue/apollo-composable';
import { onLogout } from '../apollo';
import { onClickOutside } from '@vueuse/core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import FloatingButton from './FloatingButton.vue';
import PostDetailCard from './PostDetailCard.vue';
import Search from './Search.vue';
import Notifications from './Notifications.vue';
export default defineComponent({
  components: {
    Modal,
    NewPost,
    FloatingButton,
    PostDetailCard,
    Search,
    Notifications,
  },
  setup(props) {
    const showProfileMenu = ref(false);
    const showMobileMenu = ref(false);
    const show = ref(true);
    const target = ref(null);
    const router = useRouter();
    const notifyOpen = ref(false);

    const store = useStore();

    onClickOutside(target, (event) => {
      if (event.path[1].id !== 'user-menu') {
        showProfileMenu.value = false;
      }
    });

    const { result, error, onResult } = useMeQuery();

    const user = useResult(result);
    const profileImage = ref('');
    onResult((userResult) => {
      const userData = userResult.data.me;
      store.dispatch('userData/setUser', userData);
      profileImage.value = userData.profilePicLink;
    });

    profileImage.value = user?.value?.profilePicLink || '';

    const openMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value;
    };

    const logout = () => {
      onLogout();
      router.push('/login');
    };

    return {
      target,
      logout,
      show,
      showProfileMenu,
      user,
      breakpoints,
      openMobileMenu,
      showMobileMenu,
      profileImage,
      notifyOpen,
    };
  },
});
</script>

<style>
.text-indent {
  text-indent: 10px;
}

.fade-enter-active {
  transition: all 100ms ease-out;
}

.fade-leave-active {
  transition: all 75ms ease-in;
}

.fade-enter-from {
  transition: opacity 75ms ease-in;
  opacity: 100;
}

.fade-leave-to {
  opacity: 0;
}
</style>
