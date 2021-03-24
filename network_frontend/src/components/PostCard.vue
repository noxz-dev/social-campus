<template>
  <card id="postcard">
    <card-header :name="name" :creationDate="postDate" :profileImg="profileImg" :userId="userId" />
    <div class="px-4 py-2 mt-2 cursor-pointer" @click="handleNavigation">
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
    const router = useRouter();
    const profileImg: string =
      imageUrlProfile?.value || 'https://image.freepik.com/free-vector/profile-icon-male-avatar-hipster-man-wear-headphones_48369-8728.jpg';

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
      commentCount,
      profileImg,
      handleNavigation,
    };
  },
});
</script>

<style></style>
