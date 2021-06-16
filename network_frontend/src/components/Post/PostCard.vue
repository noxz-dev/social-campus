<template>
  <card id="postcard" :bgColorDark="cardBgColor">
    <card-header :post="post" :bgColorDark="cardBgColor" />
    <div class="px-4" @click.self="handleNavigation">
      <div class="text-sm text-gray-700 px-2 mr-1 dark:text-white mb-3">
        <div class="markdown whitespace-pre-wrap prettyprint" v-html="content"></div>
      </div>
      <div
        v-if="post.media && post.media.type === MediaType.Image"
        class="flex justify-center cursor-pointer"
        v-viewer="viewerOptions"
      >
        <lazy-image
          class="h-[28rem] 4xl:h-[38rem] w-full rounded-xl m-2"
          :src="post.media.name"
          alt=""
          :blurhash="post.media.blurhash || 'abcdefghijklmn'"
        />
      </div>
      <div v-else-if="post.media && post.media.type === MediaType.File" class="flex justify-center">
        <div class="dark:bg-dark-700 bg-gray-200  p-5 rounded-lg w-[70%]">
          <div class="flex justify-between w-full items-center">
            <div>
              <svg class="w-10 h-10 dark:stroke-white stroke-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.7367 2.7619H8.08369C6.02469 2.7619 4.24969 4.4309 4.24969 6.4909V17.2039C4.24969 19.3799 5.90869 21.1149 8.08369 21.1149H16.0727C18.1327 21.1149 19.8017 19.2649 19.8017 17.2039V8.0379L14.7367 2.7619Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.474 2.75021V5.65921C14.474 7.07921 15.623 8.23121 17.042 8.23421C18.359 8.23721 19.706 8.23821 19.797 8.23221"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M14.284 15.5578H8.88699" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.2425 10.6056H8.88651" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="truncate p-2">{{ post.media.name }}</div>
            <div role="button" tabindex="0" @keydown.enter="downloadFile" class="p-2 border dark:border-white border-black rounded-full hover:opacity-50" @click="downloadFile">
              <svg class="dark:stroke-white stroke-black w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.7364 2.7619H8.08443C6.02543 2.7619 4.25043 4.4309 4.25043 6.4909V17.2279C4.25043 19.4039 5.90843 21.1149 8.08443 21.1149H16.0724C18.1324 21.1149 19.8024 19.2879 19.8024 17.2279V8.0379L14.7364 2.7619Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.4738 2.75021V5.65921C14.4738 7.07921 15.6228 8.23121 17.0428 8.23421C18.3588 8.23721 19.7058 8.23821 19.7968 8.23221"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M11.6407 16.0138V9.44083" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M8.80231 13.1632L11.6403 16.0142L14.4793 13.1632"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between p-2 pb-3 cursor-default" @click.stop>
        <div class="flex">
          <div class="flex cursor-pointer" @click.stop="likePost" role="button" tabindex="0" @keydown.enter="likePost">
            <svg
              class="h-6 hover:stroke-red duration-200 stroke-current"
              :class="{
                'fill-red': post.liked,
                'dark:stroke-white dark:hover:stroke-red stroke-black  dark:fill-dark-600 fill-white': !post.liked,
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
          <div class="flex cursor-pointer" @click="handleNavigation" role="button" tabindex="0" @keydown.enter="handleNavigation">
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
import { defineComponent, nextTick, onMounted, onUpdated, PropType, ref, watch } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useLikePostMutation, useUnlikePostMutation, MediaType, Post } from '../../graphql/generated/types';
import { getFeed } from '../../graphql/queries/getFeed';
import CardHeader from '../Card/CardHeader.vue';
import { LikePostMutationVariables, UnlikePostMutationVariables } from '../../graphql/generated/types';
import Card from '../Card/Card.vue';
import { useRouter } from 'vue-router';
import { parseMarkdown } from '../../utils/postUtils';
import LazyImage from '../Blurhash/LazyImage.vue';
import axios from 'axios';
import { Buffer } from 'buffer';
import { loadProxyFile } from '../../utils/loadProxyImage';

dayjs.extend(relativeTime);

export default defineComponent({
  components: { CardHeader, Card, LazyImage },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
    cardBgColor: {
      type: String,
      default: 'bg-dark-500',
    },
  },
  setup(props) {
    const router = useRouter();
    let tagIds: string[] = [];
    let mentions: string[] = [];
    const content = ref('');

    watch(
      () => props.post,
      () => {
        const parsed = parseMarkdown(props.post.text);
        tagIds = parsed.tagIds;
        mentions = parsed.mentions;
        content.value = parsed.sanitizedContent;

        nextTick(() => {
          addTagAndMentionHandle();
        });
      }
    );

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

    onMounted(() => {
      const parsed = parseMarkdown(props.post.text);
      tagIds = parsed.tagIds;
      mentions = parsed.mentions;
      content.value = parsed.sanitizedContent;

      nextTick(() => {
        addTagAndMentionHandle();
      });
    });

    onUpdated(() => {
      addTagAndMentionHandle();
    });

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

    //download the file attached to the post
    const downloadFile = async () => {

      //get the image from the file proxy
      // const response = await axios({
      //   url: `/api/files/${props.post.media?.name}`,
      //   method: 'GET',
      //   responseType: 'arraybuffer',
      // });
      // const b64encoded = Buffer.from(response.data, 'base64');
      const link = document.createElement('a');
      link.href = await loadProxyFile(props.post.media?.name!);
      link.download = props.post.media?.name!;
      link.click();
      URL.revokeObjectURL(link.href);

    }

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
      content,
      handleNavigation,
      parseMarkdown,
      viewerOptions,
      MediaType,
      downloadFile
    };
  },
});
</script>

<style></style>
