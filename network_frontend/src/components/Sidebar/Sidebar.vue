<template>
  <div
    v-if="['4xl', '3xl', '2xl', 'xl', 'lg', 'md'].includes(breakpoints.is)"
    class="flex fixed top-14 h-screen shadow-right transition-width w-14 xl:w-44 bg-white dark:bg-dark-700"
  >
    <div id="navContent" class="w-full flex flex-col items-start pl-0 mt-12 h-full">
      <nav-link v-for="route in routes" :key="route.to" :to="route.to" :name="route.name" class="md:my-2">
        <span v-html="route.icon"></span>
      </nav-link>
      <div class="h-full w-full flex xl:justify-center items-end">
        <div class="flex mb-32 flex-col xl:flex-row items-center">
          <span class="">
            <svg
              class="h-6 w-6"
              fill="none"
              :class="isDarkMode ? 'text-gray-500' : 'text-gray-800'"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
          <toggle-button @toggleStateUpdate="toggle" class="mx-3 my-3" :initalState="isDarkMode" />
          <span class="">
            <svg
              class="h-6 w-6"
              :class="isDarkMode ? 'text-gray-200' : 'text-gray-400'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="fixed h-16 w-full z-20 bottom-0 bg-gray-300 dark:bg-dark-600">
    <div id="navContent" class="h-16 w-full flex flex-row items-center">
      <nav-link v-for="route in routes" :key="route.to" :to="route.to" :name="route.name" class="md:my-2">
        <span v-html="route.icon"></span>
      </nav-link>
    </div>
  </div>
</template>

<script lang="ts">
import breakpoints from '../../utils/breakpoints';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import NavLink from './NavLink.vue';
import ToggleButton from '../Form/ToggleButton.vue';

export default defineComponent({
  components: { NavLink, ToggleButton },
  setup() {
    const router = useRouter();
    const show = ref(true);
    const homeActive = ref(true);
    const groupsActive = ref(false);
    const isDarkMode = ref(false);

    const routes = [
      {
        to: '/home',
        name: 'Home',
        icon: `<svg width="24" height="24"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path class="dark:fill-gray100 fill-gray-500" opacity="0.4" d="M16.0755 2H19.4615C20.8637 2 22 3.14585 22 4.55996V7.97452C22 9.38864 20.8637 10.5345 19.4615 10.5345H16.0755C14.6732 10.5345 13.537 9.38864 13.537 7.97452V4.55996C13.537 3.14585 14.6732 2 16.0755 2Z" fill="#200E32"/>
                <path class="dark:fill-gray100 fill-gray-500" fill-rule="evenodd" clip-rule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="#200E32"/>
              </svg>
              `,
      },
      {
        to: '/groups',
        name: 'Gruppen',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="dark:fill-gray100 fill-gray-500" d="M11.949 14.5399C8.49903 14.5399 5.58807 15.1037 5.58807 17.2794C5.58807 19.4561 8.51783 20 11.949 20C15.399 20 18.31 19.4363 18.31 17.2605C18.31 15.0839 15.3802 14.5399 11.949 14.5399Z" fill="#200E32"/>
                <path class="dark:fill-gray100 fill-gray-500" opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="#200E32"/>
                <path class="dark:fill-gray100 fill-gray-500" opacity="0.4" d="M21.0879 9.21926C21.6923 6.84179 19.9203 4.70657 17.6639 4.70657C17.4186 4.70657 17.184 4.73359 16.9548 4.77952C16.9243 4.78672 16.8903 4.80203 16.8724 4.82905C16.8518 4.86327 16.867 4.9092 16.8894 4.93892C17.5672 5.89531 17.9567 7.05973 17.9567 8.3097C17.9567 9.50744 17.5995 10.6241 16.9727 11.5508C16.9082 11.6463 16.9655 11.775 17.0792 11.7949C17.2368 11.8228 17.398 11.8372 17.5627 11.8417C19.2058 11.8849 20.6805 10.8213 21.0879 9.21926Z" fill="#200E32"/>
                <path class="dark:fill-gray100 fill-gray-500" class="fill-gray-100" d="M22.8093 14.8169C22.5084 14.1721 21.7823 13.73 20.6782 13.5129C20.1571 13.3851 18.7468 13.2049 17.4351 13.2293C17.4154 13.232 17.4046 13.2455 17.4028 13.2545C17.4002 13.2671 17.4055 13.2887 17.4315 13.3022C18.0377 13.6039 20.381 14.916 20.0864 17.6834C20.0738 17.8032 20.1696 17.9068 20.2887 17.8887C20.8654 17.8059 22.349 17.4853 22.8093 16.4866C23.0636 15.9588 23.0636 15.3456 22.8093 14.8169Z" fill="#200E32"/>
                <path class="dark:fill-gray100 fill-gray-500" opacity="0.4" d="M7.04483 4.77979C6.8165 4.73296 6.58101 4.70685 6.33567 4.70685C4.07926 4.70685 2.30726 6.84207 2.91255 9.21953C3.31906 10.8216 4.79379 11.8852 6.43685 11.842C6.60161 11.8375 6.76368 11.8221 6.92037 11.7951C7.03409 11.7753 7.09139 11.6465 7.02692 11.5511C6.40014 10.6235 6.04288 9.50771 6.04288 8.30997C6.04288 7.0591 6.43327 5.89468 7.11109 4.93919C7.13258 4.90947 7.1487 4.86354 7.12721 4.82932C7.1093 4.80141 7.07617 4.787 7.04483 4.77979Z" fill="#200E32"/>
                <path class="dark:fill-gray100 fill-gray-500" d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.485 3.13531 17.8065 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6831C3.61883 14.9166 5.9621 13.6045 6.56918 13.3028C6.59425 13.2884 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="#200E32"/>
              </svg>
            `,
      },
      {
        to: '/chats',
        name: 'Chats',
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="stroke-black dark:stroke-white" width="24" height="24" viewBox="0 0 256 256"><rect stroke="none" width="256" height="256" fill="none"></rect><path d="M71.5834,144.00049l-39.58291,32v-128a8,8,0,0,1,8-8h128a8,8,0,0,1,8,8v88a8,8,0,0,1-8,8Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M80.00049,144.00048v40a8,8,0,0,0,8,8h96.41709l39.58291,32v-128a8,8,0,0,0-8-8h-40" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
            `,
      },
      {
        to: '/browse',
        name: 'Entdecken',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-black dark:stroke-white" width="24" height="24" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" stroke="none"></rect><polyline points="32 176 128 232 224 176" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><polyline points="32 128 128 184 224 128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><polygon points="32 80 128 136 224 80 128 24 32 80" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polygon></svg>
            `,
      },
    ];

    onMounted(() => {
      console.log(breakpoints.is);
    });

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      if (localStorage.theme !== 'light') isDarkMode.value = true;
    } else {
      if (localStorage.theme !== 'dark') isDarkMode.value = false;
    }

    const toggle = () => {
      isDarkMode.value = !isDarkMode.value;
      if (isDarkMode.value) localStorage.theme = 'dark';
      else localStorage.theme = 'light';
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const handleRouting = (state: string) => {
      switch (state) {
        case 'home':
          router.push('/home');
          homeActive.value = true;
          groupsActive.value = false;
          break;
        case 'groups':
          router.push('/groups');
          homeActive.value = false;
          groupsActive.value = true;
          break;
      }
    };
    return { show, homeActive, groupsActive, handleRouting, breakpoints, routes, toggle, isDarkMode };
  },
});
</script>

<style></style>
