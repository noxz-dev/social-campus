<template>
  <div v-if="open" class="fixed z-50 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white dark:bg-dark600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-2xl sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        ref="target"
      >
        <div class="flex">
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
              <div class="w-full flex">
                <card-header
                  :creationDate="post.createdAt"
                  :name="post.user.firstname + ' ' + post.user.lastname"
                  :profileImg="post.user.profilePicLink"
                  :userId="post.user.id"
                />
              </div>
              <div
                id="post-text"
                v-if="post"
                class="dark:bg-dark600 bg-white dark:text-gray-50 w-full flex border-t-2 mb-2 border-dark400 p-2 overflow-auto"
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
import { postById } from '../graphql/queries/postById';
import { onClickOutside } from '@vueuse/core';
import { useAddCommentMutation, usePostByIdQuery } from '../graphql/generated/graphqlOperations';
import { AddCommentMutationVariables, Post, PostByIdQueryVariables } from '../graphql/generated/types';
import CardHeader from './CardHeader.vue';
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    CardHeader,
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
