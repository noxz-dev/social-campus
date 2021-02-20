<template>
  <div class="w-5/6 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/4">
    <div class="bg-white dark:bg-dark600 dark:text-white shadow-2xl rounded-lg mb-6 tracking-wide">
      <div class="bg-white dark:bg-dark600 px-4 py-5 sm:px-6 rounded-lg">
        <div class="flex space-x-3">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="profileImg" alt="" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
              <a
                @click="
                  $router.push({
                    name: 'Profile',
                    params: {
                      id: userId,
                    },
                  })
                "
                class="cursor-pointer hover:underline"
                >{{ name }}</a
              >
            </p>
            <p class="text-sm text-gray-500">
              <a href="#" class="hover:underline">{{ creationDate }}</a>
            </p>
          </div>
          <div class="flex-shrink-0 self-center flex">
            <div class="relative z-30 inline-block text-left">
              <div>
                <button
                  id="menu-1"
                  type="button"
                  class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open options</span>
                  <!-- Heroicon name: solid/dots-vertical -->
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              <!--
          Dropdown menu, show/hide based on menu state.

          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
              <div
                v-if="false"
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-1"
              >
                <div class="py-1">
                  <a href="#" class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    <!-- Heroicon name: solid/star -->
                    <svg
                      class="mr-3 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span>Stuff</span>
                  </a>
                  <a href="#" class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    <!-- Heroicon name: solid/code -->
                    <svg
                      class="mr-3 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Stuff</span>
                  </a>
                  <a href="#" class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    <!-- Heroicon name: solid/flag -->
                    <svg
                      class="mr-3 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Stuff</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-2 mt-2">
        <p class="text-sm text-gray-700 px-2 mr-1 dark:text-white mb-6">
          {{ postText }}
        </p>
        <div class="flex items-center justify-between p-2">
          <div class="flex">
            <div class="flex cursor-pointer" @click="likePost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                class="h-6 hover:text-red-500 duration-200"
                :class="{ 'fill-red-500 text-red-500': liked }"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span class="px-2 font-mono">{{ likeCount }}</span>
            </div>
            <div class="flex cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 ml-2" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span class="px-2 font-mono">{{ commentCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useLikePostMutation, useUnlikePostMutation } from '../graphql/generated/graphqlOperations';
import { getFeed } from '../graphql/queries/getFeed';
import { GetFeedQuery } from '../graphql/generated/types';
dayjs.extend(relativeTime);

export default defineComponent({
  props: {
    id: String,
    name: String,
    postDate: Date,
    postText: String,
    liked: Boolean,
    likeCount: Number,
    imageUrl: String,
    userId: String,
  },
  setup(props) {
    const { id, imageUrl } = toRefs(props);
    const commentCount = ref(0);
    const profileImg: string =
      imageUrl?.value || 'https://image.freepik.com/free-vector/profile-icon-male-avatar-hipster-man-wear-headphones_48369-8728.jpg';

    const { mutate: like } = useLikePostMutation({
      variables: { postID: id?.value },
      refetchQueries: [
        {
          query: getFeed,
        },
      ],
    });

    const { mutate: unlike } = useUnlikePostMutation({
      variables: { postID: id?.value },
      refetchQueries: [
        {
          query: getFeed,
        },
      ],
    });

    const creationDate = dayjs(props.postDate).fromNow();
    const likePost = async () => {
      try {
        if (props.liked) {
          await unlike();
        } else {
          await like();
        }
      } catch (err) {
        console.log(err);
        console.log('couldnt like/unlike the post');
      }
    };

    return {
      creationDate,
      likePost,
      commentCount,
      profileImg,
    };
  },
});
</script>

<style></style>
