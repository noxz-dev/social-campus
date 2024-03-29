<template>
  <div class="bg-gray-100 px-4 py-5 sm:px-6 rounded-xl w-full" :class="'dark:' + bgColorDark">
    <div class="flex space-x-3">
      <div
        class="flex-shrink-0 cursor-pointer h-10 w-10"
        @click.stop="
          $router.push({
            name: 'Profile',
            params: {
              id: username,
            },
          })
        "
      >
        <lazy-image
          class="h-10 w-10 rounded-full bg-dark-700 object-cover"
          :src="avatar"
          alt=""
          :blurhash="avatarBlurhash"
          rounded="full"
        />
      </div>
      <div class="min-w-0 flex-1">
        <div class="text-sm font-medium text-gray-900 dark:text-gray-50 flex flex-col md:flex-row cursor-pointer">
          <div
            @click.stop="
              $router.push({
                name: 'Profile',
                params: {
                  id: username,
                },
              })
            "
          >
            {{ firstname + ' ' + lastname }}
          </div>
          <div v-if="group" class="flex items-center">
            <svg
              class="transform rotate-90 md:mx-2 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <path
                class="dark:fill-white fill-dark-800"
                d="M236.74219,187.96875,148.77344,35.97656a24.00413,24.00413,0,0,0-41.54688,0h.00781L19.25781,187.96875a23.9925,23.9925,0,0,0,20.76563,36.02344H215.97656a23.9925,23.9925,0,0,0,20.76563-36.02344Z"
              ></path>
            </svg>

            <span
              class="
                hover:underline
                cursor-pointer
                dark:hover:text-gray-400
                hover:text-gray-700
                break-words
                md:w-full
                truncate
              "
              @click="$router.push({ name: 'Group', params: { id: group.id } })"
            >
              {{ group.name }}</span
            >
          </div>
        </div>

        <p class="text-sm text-gray-500">
          <a
            class="mr-2 text-gray-400 cursor-pointer hover:underline"
            @click.stop="
              $router.push({
                name: 'Profile',
                params: {
                  id: username,
                },
              })
            "
            >@{{ username }}</a
          >
          <span>{{ dayjs(creationDate).fromNow() }}</span>
        </p>
      </div>
      <div class="flex-shrink-0 self-center flex">
        <permission-container :userId="userId">
          <div class="relative inline-block text-left z-10" ref="target">
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
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  />
                </svg>
              </button>
            </div>

            <div
              v-if="optionsOpen"
              class="
                origin-top-right
                absolute
                right-0
                mt-2
                w-56
                rounded-md
                shadow-lg
                bg-white
                dark:bg-dark-600 dark:border-dark-400
                border
                ring-1 ring-black ring-opacity-5
                focus:outline-none
              "
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-1"
            >
              <div class="">
                <button
                  v-if="post"
                  @click="eventbus.emit('open-edit-modal', post)"
                  class="
                    w-full
                    stroke-grayLight
                    transition
                    duration-200
                    cursor-pointer
                    flex
                    px-2
                    py-2
                    text-sm text-gray-700
                    hover:bg-gray-100
                    dark:hover:bg-dark-500
                    rounded-t-lg
                    dark:text-gray-50
                    hover:text-gray-900
                  "
                  role="menuitem"
                >
                  <svg
                    class="mr-3 h-5 w-5"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="Iconly/Light/Edit-Square"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <g id="Edit-Square" transform="translate(2.000000, 2.000000)" stroke-width="2">
                        <path
                          d="M9.4923,0.789 L5.7533,0.789 C2.6783,0.789 0.7503,2.966 0.7503,6.048 L0.7503,14.362 C0.7503,17.444 2.6693,19.621 5.7533,19.621 L14.5773,19.621 C17.6623,19.621 19.5813,17.444 19.5813,14.362 L19.5813,10.334"
                          id="Stroke-1"
                        ></path>
                        <path
                          d="M6.8278,8.9209 L14.3008,1.4479 C15.2318,0.5179 16.7408,0.5179 17.6718,1.4479 L18.8888,2.6649 C19.8198,3.5959 19.8198,5.1059 18.8888,6.0359 L11.3798,13.5449 C10.9728,13.9519 10.4208,14.1809 9.8448,14.1809 L6.0988,14.1809 L6.1928,10.4009 C6.2068,9.8449 6.4338,9.3149 6.8278,8.9209 Z"
                          id="Stroke-3"
                        ></path>
                        <line x1="13.1652" y1="2.6025" x2="17.7312" y2="7.1685" id="Stroke-5"></line>
                      </g>
                    </g>
                  </svg>
                  <span>Bearbeiten</span>
                </button>
                <button
                  class="
                    w-full
                    transition
                    duration-200
                    cursor-pointer
                    flex
                    px-2
                    py-2
                    text-sm text-gray-700
                    hover:bg-gray-100
                    dark:text-gray-50 dark:hover:bg-dark-500
                    stroke-grayLight
                    rounded-b-lg
                  "
                  role="menuitem"
                  @click="deleteContent()"
                >
                  <svg
                    class="mr-3 h-5 w-5"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="Iconly/Light/Delete"
                      stroke-width="1"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      fill="none"
                      stroke-linejoin="round"
                    >
                      <g id="Delete" transform="translate(3.000000, 2.000000)" stroke-width="2">
                        <path
                          d="M16.3249,7.4682 C16.3249,7.4682 15.7819,14.2032 15.4669,17.0402 C15.3169,18.3952 14.4799,19.1892 13.1089,19.2142 C10.4999,19.2612 7.8879,19.2642 5.2799,19.2092 C3.9609,19.1822 3.1379,18.3782 2.9909,17.0472 C2.6739,14.1852 2.1339,7.4682 2.1339,7.4682"
                          id="Stroke-1"
                        ></path>
                        <line x1="17.7082" y1="4.2397" x2="0.7502" y2="4.2397" id="Stroke-3"></line>
                        <path
                          d="M14.4406,4.2397 C13.6556,4.2397 12.9796,3.6847 12.8256,2.9157 L12.5826,1.6997 C12.4326,1.1387 11.9246,0.7507 11.3456,0.7507 L7.1126,0.7507 C6.5336,0.7507 6.0256,1.1387 5.8756,1.6997 L5.6326,2.9157 C5.4786,3.6847 4.8026,4.2397 4.0176,4.2397"
                          id="Stroke-5"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <span>Löschen</span>
                </button>
              </div>
            </div>
          </div>
        </permission-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import dayjs from 'dayjs';
import { onClickOutside } from '@vueuse/core';
import PermissionContainer from '../PermissionContainer.vue';
import { useDeleteCommentMutation, useDeletePostMutation } from '../../graphql/generated/types';
import { Post } from '../../graphql/generated/types';
import LazyImage from '../../components/Blurhash/LazyImage.vue';

export default defineComponent({
  components: { PermissionContainer, LazyImage },
  props: {
    post: {
      type: Object as PropType<Post>,
    },
    comment: {
      type: Object,
    },
    bgColorDark: {
      type: String,
    },
  },
  setup(props) {
    const optionsOpen = ref(false);
    const target = ref(null);

    const firstname = computed(() => props.post?.user.firstname || props.comment?.user.firstname);
    const lastname = computed(() => props.post?.user.lastname || props.comment?.user.lastname);
    const creationDate = computed(() => props.post?.createdAt || props.comment?.createdAt);
    const userId = computed(() => props.post?.user.id || props.comment?.user.id);
    const username = computed(() => props.post?.user.username || props.comment?.user.username);
    const avatar = computed(() => props.post?.user.avatar.name || props.comment?.user.avatar.name);
    const avatarBlurhash = computed(() => props.post?.user.avatar.blurhash || props.comment?.user.avatar.blurhash);
    const group = computed(() => props.post?.group);

    onClickOutside(target, (event) => {
      optionsOpen.value = false;
    });

    //create the delete post mutation
    const { mutate: delPost } = useDeletePostMutation(() => ({
      variables: {
        postId: props.post?.id as string,
      },
      update: (cache, { data: { deletePost } }) => {
        const normalizedId = cache.identify(props.post);
        cache.evict({ id: normalizedId });
      },
    }));

    //create the delete comment mutation
    const { mutate: delComment } = useDeleteCommentMutation(() => ({
      variables: {
        commentId: props.comment?.id,
      },
      update: (cache, { data: { deleteComment } }) => {
        cache.modify({
          id: cache.identify(deleteComment.post as Post),
          fields: {
            comments(existingCommentRefs, { readField }) {
              return existingCommentRefs.filter((comment) => readField('id', comment) !== props.comment?.id);
            },
          },
        });
      },
    }));

    /**
     * executes the delete mutations to delete either a comment or post
     */
    const deleteContent = async () => {
      if (props.post?.id) {
        await delPost();
        return;
      }
      if (props.comment) {
        if (props.comment.id) {
          await delComment();
          return;
        }
      }
    };

    return {
      dayjs,
      optionsOpen,
      target,
      deleteContent,
      firstname,
      lastname,
      creationDate,
      userId,
      username,
      avatar,
      group,
      avatarBlurhash,
    };
  },
});
</script>

<style scoped></style>
