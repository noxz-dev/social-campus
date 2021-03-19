<template>
  <div class="w-5/6 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/4 cursor-pointer" @click.stop="eventbus.emit('open-post-modal')">
    <div class="bg-white dark:bg-dark600 dark:text-white shadow-2xl rounded-lg mb-6 tracking-wide">
      <div class="bg-white dark:bg-dark600 px-4 py-5 sm:px-6 rounded-lg">
        <div class="flex space-x-3">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="profileImg" alt="" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
              <a
                @click.stop="
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
                  <svg class="h-5 w-5 z-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              <div
                v-if="false"
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-1"
              >
                <div class="py-1">
                  <a href="#" class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
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
        <div v-if="imageUrl" class="flex justify-center">
          <img class="object-cover h-98 w-full rounded-xl m-2" :src="imageUrl" alt="" />
        </div>
        <div class="flex items-center justify-between p-2 cursor-default" @click.stop>
          <div class="flex">
            <div class="flex cursor-pointer" @click.stop="likePost">
              <svg
                class="h-6 hover:stroke-red duration-200 stroke-current"
                :class="{ 'fill-red': liked, 'stroke-white fill-dark600': !liked }"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g id="Iconly/Light/Heart" stroke-width="1" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                  <g id="Heart" transform="translate(2.500000, 3.000000)" stroke-width="1.5">
                    <path
                      d="M0.371865331,8.59832177 C-0.701134669,5.24832177 0.552865331,1.41932177 4.06986533,0.28632177 C5.91986533,-0.31067823 7.96186533,0.0413217701 9.49986533,1.19832177 C10.9548653,0.0733217701 13.0718653,-0.30667823 14.9198653,0.28632177 C18.4368653,1.41932177 19.6988653,5.24832177 18.6268653,8.59832177 C16.9568653,13.9083218 9.49986533,17.9983218 9.49986533,17.9983218 C9.49986533,17.9983218 2.09786533,13.9703218 0.371865331,8.59832177 Z"
                      id="Stroke-1"
                    ></path>
                    <path d="M13.5,3.7 C14.57,4.046 15.326,5.001 15.417,6.122" id="Stroke-3"></path>
                  </g>
                </g>
              </svg>
              <span class="px-2 font-mono">{{ likeCount }}</span>
            </div>
            <div class="flex cursor-pointer">
              <svg
                class="h-6 stroke-white"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g id="Iconly/Light/Chat" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                  <g id="Chat" transform="translate(2.000000, 2.000000)">
                    <path
                      d="M17.0713569,17.0698633 C14.0152073,20.1263497 9.48977439,20.7866955 5.78641655,19.0740178 C5.23970647,18.8539025 4.7914846,18.6760012 4.36537232,18.6760012 C3.17848885,18.6830368 1.70116564,19.8338678 0.933359565,19.0669822 C0.165553489,18.2990915 1.3172626,16.8206004 1.3172626,15.6265504 C1.3172626,15.2003912 1.1464157,14.7601607 0.926324692,14.2123853 C-0.787169233,10.5096244 -0.125891225,5.98268764 2.93025835,2.92720636 C6.8315976,-0.975567922 13.1700176,-0.975567922 17.0713569,2.92620127 C20.979731,6.83500611 20.9726961,13.1680941 17.0713569,17.0698633 Z"
                      id="Stroke-4"
                      stroke-width="1.5"
                    ></path>
                    <line x1="13.9394" y1="10.413" x2="13.9484" y2="10.413" id="Stroke-11" stroke-width="2"></line>
                    <line x1="9.9304" y1="10.413" x2="9.9394" y2="10.413" id="Stroke-13" stroke-width="2"></line>
                    <line x1="5.9214" y1="10.413" x2="5.9304" y2="10.413" id="Stroke-15" stroke-width="2"></line>
                  </g>
                </g>
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
    imageUrlProfile: String,
    userId: String,
  },
  setup(props) {
    const { id, imageUrlProfile } = toRefs(props);
    const commentCount = ref(0);
    const profileImg: string =
      imageUrlProfile?.value || 'https://image.freepik.com/free-vector/profile-icon-male-avatar-hipster-man-wear-headphones_48369-8728.jpg';

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
