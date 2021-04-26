<template>
  <card id="postcard" :bgColorDark="cardBgColor">
    <card-header :post="post" :bgColorDark="cardBgColor" />
    <div class="px-4" @click.self="handleNavigation">
      <div class="text-sm text-gray-700 px-2 mr-1 dark:text-white mb-3">
        <div class="markdown" v-html="parseMarkdown(post.text)"></div>
      </div>
      <div v-if="post.imageLink" class="flex justify-center cursor-pointer" v-viewer="viewerOptions">
        <img class="object-cover h-96 w-full rounded-xl m-2" :src="post.imageLink" alt="" />
      </div>
      <div class="flex items-center justify-between p-2 pb-3 cursor-default" @click.stop>
        <div class="flex">
          <div class="flex cursor-pointer" @click.stop="likePost">
            <svg
              class="h-6 hover:stroke-red duration-200 stroke-current"
              :class="{
                'fill-red': post.liked,
                'dark:stroke-white dark:hover:stroke-red stroke-black  dark:fill-dark600 fill-white': !post.liked,
              }"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g
                id="Iconly/Light/Heart"
                stroke-width="1"
                fill-rule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <g id="Heart" transform="translate(2.500000, 3.000000)" stroke-width="1.5">
                  <path
                    d="M0.371865331,8.59832177 C-0.701134669,5.24832177 0.552865331,1.41932177 4.06986533,0.28632177 C5.91986533,-0.31067823 7.96186533,0.0413217701 9.49986533,1.19832177 C10.9548653,0.0733217701 13.0718653,-0.30667823 14.9198653,0.28632177 C18.4368653,1.41932177 19.6988653,5.24832177 18.6268653,8.59832177 C16.9568653,13.9083218 9.49986533,17.9983218 9.49986533,17.9983218 C9.49986533,17.9983218 2.09786533,13.9703218 0.371865331,8.59832177 Z"
                    id="Stroke-1"
                  ></path>
                  <path d="M13.5,3.7 C14.57,4.046 15.326,5.001 15.417,6.122" id="Stroke-3"></path>
                </g>
              </g>
            </svg>
            <span class="px-2 font-mono dark:text-gray-50 text-gray-900">{{ post.likesCount }}</span>
          </div>
          <div class="flex cursor-pointer" @click="handleNavigation">
            <svg
              class="duration-200 h-6 dark:stroke-grayLight stroke-black hover:!stroke-grayDark"
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
            <span class="px-2 font-mono dark:text-gray-50 text-gray-900">{{ post.commentCount }}</span>
          </div>
        </div>
        <div v-if="post.edited" class="text-xs dark:text-gray-400 text-gray-900 italic">bearbeitet</div>
      </div>
    </div>
  </card>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useLikePostMutation, useUnlikePostMutation } from '../../graphql/generated/types';
import { getFeed } from '../../graphql/queries/getFeed';
import CardHeader from '../Card/CardHeader.vue';
import { LikePostMutationVariables, UnlikePostMutationVariables } from '../../graphql/generated/types';
import Card from '../Card/Card.vue';
import { useRouter } from 'vue-router';
import marked from 'marked';
import DOMPurify from 'dompurify';

dayjs.extend(relativeTime);

export default defineComponent({
  components: { CardHeader, Card },
  props: {
    post: {
      type: Object,
      required: true,
    },
    cardBgColor: {
      type: String,
      default: 'bg-dark500',
    },
  },
  setup(props) {
    const router = useRouter();
    let tagIds: string[] = [];
    let mentions: string[] = [];

    //little bit hacky there has to be a better way
    onMounted(() => {
      addTagAndMentionHandle();
    });

    onUpdated(() => {
      addTagAndMentionHandle();
    });

    const addTagAndMentionHandle = () => {
      for (const tagId of tagIds) {
        document.querySelectorAll(`#${tagId}`).forEach((item) => {
          item.addEventListener('click', (e) => {
            const { id } = e.target;
            handleTagClick(id);
          });
        });
      }
      for (const mention of mentions) {
        document.querySelectorAll(`#${mention}`).forEach((item) => {
          item.addEventListener('click', (e) => {
            const { id } = e.target;
            handleMentionClick(id);
          });
        });
      }
    };

    const parseMarkdown = (value: string) => {
      tagIds = [];
      const content = parseTags(value);
      return DOMPurify.sanitize(marked(content));
    };

    const parseTags = (content: string): string => {
      return content
        .replaceAll(/#[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g, (val) => {
          val = val.replaceAll('#', '');
          if (val.length === 0) return val;
          const tag = `<span id="${val}" class="cursor-pointer inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">#${val}</span>`;
          tagIds.push(val);
          return tag;
        })
        .replaceAll(/@[a-zA-ZäöüÄÖÜß]*/g, (val: string) => {
          val = val.replaceAll('@', '');
          if (val.length === 0) return val;
          const mention = `<span id="${val}" class="cursor-pointer inline-flex items-center py-0.5 rounded-full text-md hover:underline font-medium text-highlight-500">@${val}</span>`;
          mentions.push(val);
          return mention;
        });
    };

    const handleTagClick = (tag: string) => {
      router.push({ name: 'Browse', query: { tag } });
    };

    const handleMentionClick = (mention: string) => {
      router.push({ name: 'Profile', params: { id: mention } });
    };

    const { mutate: like } = useLikePostMutation({
      variables: <LikePostMutationVariables>{ postID: props.post.id },
      update: (cache, { data: { likePost } }) => {
        try {
          const dataInStore: any = cache.readQuery({
            query: getFeed,
            variables: {
              skip: 0,
              take: 10,
            },
          });
          const getFeedData = [...dataInStore.getFeed];
          getFeedData.forEach((post) => {
            if (post.id === likePost.id) {
              post = likePost;
            }
          });
          cache.writeQuery({
            query: getFeed,
            variables: {
              skip: 0,
              take: 10,
            },
            data: {
              ...dataInStore,
              getFeed: [...getFeedData],
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
    });

    const { mutate: unlike } = useUnlikePostMutation({
      variables: <UnlikePostMutationVariables>{ postID: props.post.id },
      update: (cache, { data: { unlikePost } }) => {
        try {
          const dataInStore: any = cache.readQuery({
            query: getFeed,
            variables: {
              skip: 0,
              take: 10,
            },
          });
          const getFeedData = [...dataInStore.getFeed];
          getFeedData.forEach((post) => {
            if (post.id === unlikePost.id) {
              post = unlikePost;
            }
          });
          cache.writeQuery({
            query: getFeed,
            variables: {
              skip: 0,
              take: 10,
            },
            data: {
              ...dataInStore,
              getFeed: [...getFeedData],
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
    });

    const likePost = async () => {
      try {
        if (props.post.liked) {
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
      if (!props.post.id) return;
      router.push({ name: 'DetailPost', params: { id: props.post.id } });
    };

    const viewerOptions = {
      inline: false,
      button: false,
      navbar: false,
      title: false,
      toolbar: false,
      tooltip: false,
      movable: false,
      zoomable: false,
      rotatable: false,
      scalable: false,
      transition: true,
      fullscreen: true,
    };

    return {
      likePost,
      handleNavigation,
      parseMarkdown,
      viewerOptions,
    };
  },
});
</script>

<style></style>
