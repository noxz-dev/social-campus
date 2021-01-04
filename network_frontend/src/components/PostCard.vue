<template>
  <div class="mx-auto py-2 w-5/6 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/4">
    <div class="bg-white dark:bg-gray-800 dark:text-white shadow-2xl rounded-lg mb-6 tracking-wide">
      <div class="md:flex-shrink-0">
        <img
          src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
          alt="image from a post"
          class="w-full h-64 rounded-lg rounded-b-none object-cover"
        />
      </div>
      <div class="px-4 py-2 mt-2">
        <p class="text-sm text-gray-700 px-2 mr-1 dark:text-white">
          {{ postText }}
        </p>
        <div class="flex items-center justify-between">
          <div class="author flex items-center -ml-3 my-3">
            <div class="user-logo">
              <img
                class="w-12 h-12 object-cover rounded-full mx-4 shadow"
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
                alt="avatar"
              />
            </div>
            <h2 class="text-sm text-gray-900 dark:text-white">
              <span>{{ name }}</span>
              <span class="text-gray-600 dark:text-white ml-5">{{ postDate.toLocaleString() }} </span>
            </h2>
          </div>
          <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-7" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-7 ml-2" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: String,
    postDate: Date,
    postText: String,
  },
});
</script>

<style></style>
