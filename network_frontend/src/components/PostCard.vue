<template>
  <div class="p-10 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
      <div class="flex justify-between">
        <div class="flex items-center">
          <img class="h-11 w-11 rounded-full" src="https://api.multiavatar.com/b28a9f54c81664e6aed6.png" />
          <div class="ml-1.5 text-sm leading-tight">
            <span class="text-black dark:text-white font-bold block">Finn Beer</span>
          </div>
        </div>
      </div>
      <p class="text-black dark:text-white block text-xl leading-snug mt-3">
        Das hier ist der Post Text
      </p>
      <img
        class="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
        src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
      />
      <p class="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">10:05 AM · Dec 19, 2020</p>
      <div class="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
      <div class="text-gray-500 dark:text-gray-400 flex mt-3">
        <div class="flex items-center mr-6">
          <svg
            viewBox="0 0 24 24"
            class="fill-current h-5 w-auto r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
            style=""
          >
            <g>
              <path
                d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
              ></path>
            </g>
          </svg>
          <span class="ml-3">ganz viele likes</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style>
</style>