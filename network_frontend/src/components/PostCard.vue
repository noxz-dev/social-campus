<template>
  <card id="postcard">
    <card-header :name="name" :creationDate="postDate" :profileImg="profileImg" :userId="userId" :postId="id" :username="username" />
    <div class="px-4 cursor-pointer" @click="handleNavigation">
      <p class="text-sm text-gray-700 px-2 mr-1 dark:text-white mb-3">
        {{ postText }}
      </p>
      <div v-if="imageUrl" class="flex justify-center">
        <img class="object-cover h-96 w-full rounded-xl m-2" :src="imageUrl" alt="" />
      </div>
      <div class="flex items-center justify-between p-2 pb-3 cursor-default" @click.stop>
        <div class="flex">
          <div class="flex cursor-pointer" @click.stop="likePost">
            <svg
              class="h-6 hover:stroke-red duration-200 stroke-current"
              :class="{ 'fill-red': liked, 'dark:stroke-white stroke-black dark:fill-dark600 fill-white': !liked }"
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
          <div class="flex cursor-pointer" @click="handleNavigation">
            <svg
              class="duration-200 h-6 dark:stroke-grayLight hover:stroke-grayDark"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
  </card>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useLikePostMutation, useUnlikePostMutation } from '../graphql/generated/graphqlOperations';
import { getFeed } from '../graphql/queries/getFeed';
import CardHeader from './CardHeader.vue';
import { UnlikePostMutationVariables } from '../graphql/generated/types';
import Card from './Card.vue';
import { useRouter } from 'vue-router';
import { scrollState } from '../_helpers/scrollState';

dayjs.extend(relativeTime);

export default defineComponent({
  components: { CardHeader, Card },
  props: {
    id: String,
    name: String,
    username: String,
    postDate: Date,
    postText: String,
    liked: Boolean,
    likeCount: Number,
    imageUrl: {
      type: String,
    },
    imageUrlProfile: String,
    userId: String,
    commentCount: Number,
  },
  setup(props) {
    const { id, imageUrlProfile } = toRefs(props);
    const router = useRouter();
    const profileImg: string = imageUrlProfile?.value || '';

    const { mutate: like } = useLikePostMutation({
      variables: <UnlikePostMutationVariables>{ postID: id?.value },
      refetchQueries: [
        {
          query: getFeed,
        },
      ],
    });

    const { mutate: unlike } = useUnlikePostMutation({
      variables: <UnlikePostMutationVariables>{ postID: id?.value },
      refetchQueries: [
        {
          query: getFeed,
        },
      ],
    });

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

    const handleNavigation = () => {
      if (!props.id) return;
      const container = document.querySelector('#home');
      scrollState.top = container?.scrollTop || 0;
      console.log(scrollState);
      router.push({ name: 'DetailPost', params: { id: props.id } });
    };

    return {
      likePost,
      profileImg,
      handleNavigation,
    };
  },
});
</script>

<style></style>
