<template>
  <header class="fixed bg-white dark:bg-darkTheme-800 shadow-sm w-full lg:overflow-y-visible">
    <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
        <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
          <div class="flex-shrink-0 flex items-center">
            <a href="#">
              <img
                class="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                alt="Workflow"
              >
            </a>
          </div>
          <div class="pl-28 font-bold text-xl flex-shrink-0 flex items-center text-gray-50">
            Hey {{ user.name }} 👋
          </div>
        </div>
        <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-4 xl:col-start-5">
          <div class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div class="w-full">
              <label
                for="search"
                class="sr-only"
              >Search</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    class="h-5 w-5 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  class="block w-full dark:text-gray-100 dark:bg-darkTheme-600 bg-white border border-gray-300 dark:border-darkTheme-600 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 dark:focus:text-gray-100 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Finde neue Leute"
                  type="search"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-expanded="false"
          >
            <span class="sr-only">Open menu</span>
            <!-- Icon when menu is closed. -->
            <!--
            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open. -->
            <!--
            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
          <a
            href="#"
            class="ml-5 flex-shrink-0 bg-white dark:bg-darkTheme-600 rounded-full p-1 text-gray-200 hover:text-gray-500 focus:outline-none dark:focus:ring-offset-darkTheme-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </a>

          <!-- Profile dropdown -->
          <div class="flex-shrink-0 relative ml-5">
            <div>
              <button
                id="user-menu"
                type="button"
                class="bg-white dark:bg-darkTheme-700 rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-darkTheme-700 focus:ring-indigo-500"
                aria-haspopup="true"
                @click="showProfileMenu = !showProfileMenu"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                >
              </button>
            </div>
            <!--
            Profile dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
            <div
              v-if="showProfileMenu"
              class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg dark:bg-darkTheme-700 bg-white ring-1 ring-black ring-opacity-5 py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <a
                href="#"
                class="block py-2 px-4 text-sm dark:text-gray-100 text-gray-700 dark:hover:bg-darkTheme-600 hover:bg-gray-100"
                role="menuitem"
              >Dein Profil</a>

              <a
                href="#"
                class="block py-2 px-4 text-sm dark:text-gray-100 text-gray-700 dark:hover:bg-darkTheme-600 hover:bg-gray-100"
                role="menuitem"
              >Einstellungen</a>

              <a
                href="#"
                class="block py-2 px-4 text-sm dark:text-gray-100 text-gray-700 dark:hover:bg-darkTheme-600 hover:bg-gray-100"
                role="menuitem"
              >Ausloggen</a>
            </div>
          </div>

          <a
            href="#"
            class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-darkTheme-700 focus:ring-indigo-500"
            @click="$refs.modal.openModal"
          >
            New Post
          </a>
        </div>
      </div>
    </div>

    <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
    <nav
      class="hidden lg:hidden"
      aria-label="Global"
    >
      <div class="border-t border-gray-200 pt-4 pb-3">
        <div class="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
              alt=""
            >
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
              Chelsea Hagon
            </div>
            <div class="text-sm font-medium text-gray-500">
              chelseahagon@example.com
            </div>
          </div>
          <button
            type="button"
            class="ml-auto flex-shrink-0 dark:bg-darkTheme-700 bg-white rounded-full p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-darkTheme-700 focus:ring-indigo-500"
          >
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
        <div class="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >Your Profile</a>

          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >Settings</a>

          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >Sign out</a>
        </div>
      </div>
    </nav>
  </header>
  <modal
    ref="modal"
    content-text=""
    header-text="New Post"
  >
    <new-post />
  </modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from "@/components/Modal.vue";
import NewPost from './NewPost.vue';

export default defineComponent({
  components: {
    Modal,
    NewPost,
  },
  setup(props) {
    const showProfileMenu = ref(false);
    const user = {
      name: "Dede"
    }
    return {
      showProfileMenu,
      user
    };
  },
});
</script>

<style>
.text-indent {
  text-indent: 10px;
}
</style>
