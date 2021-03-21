<template>
  <div v-if="open" class="fixed z-50 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white dark:bg-dark600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        ref="target"
      >
        <div class="flex max-h-[40rem]">
          <div class="w-full flex sm:flex-col lg:flex-row">
            <div class="w-3/4 flex">
              <swiper :slides-per-view="1" :space-between="50" :allowSlideNext="false" :allowSlidePrev="false" class="disableSlide">
                <swiper-slide class="disableSlide"
                  ><img
                    src="https://images.unsplash.com/photo-1501884428012-aa321a256730?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80"
                    alt=""
                /></swiper-slide>
              </swiper>
            </div>
            <div class="w-1/4 flex justify-between items-center flex-col">
              <div class="bg-red-500 w-full flex">
                <div class="bg-white dark:bg-dark600 px-2 py-5 w-full">
                  <div class="flex space-x-3">
                    <div class="flex-shrink-0">
                      <img v-if="post?.user" class="h-10 w-10 rounded-full" :src="post.user.profilePicLink" alt="user profile image" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
                        <a
                          v-if="post?.user"
                          @click.stop="
                            () => {
                              $router.push({
                                name: 'Profile',
                                params: {
                                  id: post.user.id,
                                },
                              });
                              closeModal();
                            }
                          "
                          class="cursor-pointer hover:underline"
                          >{{ post.user.firstname + ' ' + post.user.lastname }}</a
                        >
                      </p>
                      <p class="text-sm text-gray-500">
                        <a v-if="post?.user" href="#" class="hover:underline">{{ dayjs(post.createdAt).fromNow() }}</a>
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
              </div>
              <div
                id="post-text"
                v-if="post"
                class="dark:bg-dark600 bg-white dark:text-gray-50 w-full flex h-2/6 border-t-2 mb-2 border-dark400 p-2 overflow-auto"
              >
                {{ post.text }}
              </div>
              <div
                id="comments"
                v-if="post"
                class="dark:bg-dark600 bg-white dark:text-gray-50 w-full p-2 flex h-3/6 border-t-2 border-dark400 flex-col overflow-auto"
              >
                <div v-if="post.comments.length === 0" class="self-center">Keine Kommentare vorhanden</div>
                <div v-for="comment in post.comments" :key="comment.id" class="flex flex-row">
                  <div class="mr-2">{{ comment.user.firstname }}:</div>
                  <div>
                    {{ comment.text }}
                  </div>
                </div>
              </div>
              <div class="w-full h-1/4 border-t-2 border-dark400">
                <div class="flex justify-evenly items-center flex-col w-full">
                  <div class="w-full p-1">
                    <textarea
                      v-model="commentText"
                      class="dark:bg-dark700 dark:text-gray-50 w-full resize-none rounded-lg outline-none border-none focus:ring-highlight-500"
                      placeholder="Kommentiere..."
                    />
                  </div>
                  <div class="flex items-center self-end mb-1">
                    <a
                      href="#"
                      class="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-highlight-500 hover:bg-highlight-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                      @click="
                        () => {
                          commentPost();
                        }
                      "
                    >
                      Send
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, inject } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { postById } from '../graphql/queries/postById';
import { onClickOutside } from '@vueuse/core';
import { useAddCommentMutation, usePostByIdQuery } from '../graphql/generated/graphqlOperations';
import { AddCommentMutationVariables, Post, PostByIdQueryVariables } from '../graphql/generated/types';
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    postId: String,
  },
  setup() {
    const open = ref(false);
    const target = ref(null);
    const postId = ref('');
    const post = ref<Post>();
    const commentText = ref('');

    const openModal = () => {
      open.value = true;
    };

    const closeModal = () => {
      open.value = false;
    };

    const internalInstance = getCurrentInstance();
    if (internalInstance) {
      const eventbus = internalInstance.appContext.config.globalProperties.eventbus;
      eventbus?.on('close-post-modal', () => closeModal());
      eventbus?.on('open-post-modal', (id: string) => {
        console.log(id);
        postId.value = id;

        const { onResult } = usePostByIdQuery(
          () =>
            <PostByIdQueryVariables>{
              postId: postId.value,
            }
        );

        onResult(({ data: { postById } }: { data: { postById: Post } }) => {
          console.log(postById.comments);
          post.value = postById;
        });
        openModal();
      });
    }

    const { mutate: commentPost } = useAddCommentMutation(() => ({
      variables: <AddCommentMutationVariables>{
        text: commentText.value,
        postID: postId.value,
      },
      refetchQueries: [
        {
          query: postById,
          variables: {
            postId: postId.value,
          },
        },
      ],
    }));

    onClickOutside(target, (event) => {
      closeModal();
    });

    return {
      target,
      open,
      openModal,
      closeModal,
      post,
      dayjs,
      commentText,
      commentPost,
    };
  },
});
</script>

<style>
.disableSlide {
  transform: translate3d(0px, 0, 0) !important;
}

#post-text::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #272b2f;
}
#post-text::-webkit-scrollbar {
  width: 8px;
  background-color: #272b2f;
}
#post-text::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #363b41;
}

#comments::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #272b2f;
}
#comments::-webkit-scrollbar {
  width: 8px;
  background-color: #272b2f;
}
#comments::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #363b41;
}
</style>
