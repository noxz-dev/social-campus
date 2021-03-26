<template>
  <div class="bg-white dark:bg-dark600 px-4 py-5 sm:px-6 rounded-lg w-full">
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
          <a href="#" class="hover:underline">{{ dayjs(creationDate).fromNow() }}</a>
        </p>
      </div>
      <div class="flex-shrink-0 self-center flex">
        <permission-container :userId="userId">
          <div class="relative inline-block text-left" ref="target">
            <div>
              <button
                id="menu-1"
                type="button"
                class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600"
                aria-expanded="false"
                aria-haspopup="true"
                @click="optionsOpen = !optionsOpen"
              >
                <span class="sr-only">Open options</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            <div
              v-if="optionsOpen"
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-dark600 dark:border-dark400 border ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-1"
            >
              <div class="">
                <a
                  class="transition duration-200 cursor-pointer flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg dark:text-gray-50 hover:text-gray-900"
                  role="menuitem"
                >
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
                  <span>Edit</span>
                </a>
                <a
                  class="transition duration-200 cursor-pointer flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 hover:text-gray-900"
                  role="menuitem"
                  @click="deletePost()"
                >
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
                  <span>Delete</span>
                </a>
              </div>
            </div>
          </div>
        </permission-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { onClickOutside } from '@vueuse/core';
import PermissionContainer from './PermissionContainer.vue';
import { useDeletePostMutation } from '../graphql/generated/graphqlOperations';
import { DeletePostMutationVariables } from '../graphql/generated/types';
import { getFeed } from '../graphql/queries/getFeed';

export default defineComponent({
  components: { PermissionContainer },
  props: {
    profileImg: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const optionsOpen = ref(false);
    const target = ref(null);

    onClickOutside(target, (event) => {
      optionsOpen.value = false;
    });

    const { mutate: delPost } = useDeletePostMutation(() => ({
      variables: <DeletePostMutationVariables>{
        postId: props.postId,
      },
      refetchQueries: [
        {
          query: getFeed,
        },
      ],
    }));

    const deletePost = () => {
      console.log('called');
      console.log(props.postId);
      delPost();
    };

    return { dayjs, optionsOpen, target, deletePost };
  },
});
</script>

<style scoped></style>
