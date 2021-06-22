<template>
  <div class="flex h-full items-center pt-10 bg-white dark:bg-dark-700 flex-col rounded-3xl overflow-y-auto">
    <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10">
      <div
        class="
          group
          z-20
          py-2
          sticky
          md:static
          w-full
          -top-10
          cursor-pointer
          dark:text-gray-50
          text-gray-900
          self-start
          flex
          items-center
          bg-white
          dark:bg-dark-700
          dark:stroke-white
          stroke-black
          hover:stroke-brand
        "
        @click="$router.back()"
      >
        <svg
          class="h-8 group-hover:stroke-brand"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="Iconly/Light/Arrow---Left"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <g
              id="Arrow---Left"
              transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) translate(5.500000, 4.000000)"
              stroke-width="2"
            >
              <line x1="6.7743" y1="15.75" x2="6.7743" y2="0.75" id="Stroke-1"></line>
              <polyline id="Stroke-3" points="12.7987 9.7002 6.7747 15.7502 0.7497 9.7002"></polyline>
            </g>
          </g>
        </svg>
        <span class="font-semibold text-lg ml-2 group-hover:text-highlight-500">Zurück</span>
      </div>
      <div class="w-full mt-10 flex items-center flex-col" v-if="postData">
        <post-card v-if="postData" :post="postData" cardBgColor="bg-dark-600" class="mb-3 md:mb-6" />
        <div class="border-b-2 border-dark-500 w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-3 md:mb-6" />
        <card>
          <div class="p-5 flex flex-col">
            <span class="pb-3">Schreibe einen Kommentar</span>
            <div class="mb-2">
              <tribute-textarea
                :autocomplete-options="autoCompleteOptions"
                placeholder-text="Kommentiere..."
                v-model="commentText"
                :show-preview="false"
                bg-color="dark-700"
                ref="commentInput"
              />
            </div>
            <div class="h-8">
              <div v-if="v.commentText.$error" class="text-red-400">Du musst schon was eingeben...</div>
            </div>
            <div class="self-end">
              <app-button @click="newComment"> Antworten </app-button>
            </div>
          </div>
        </card>
        <div class="border-b-2 border-dark-500 w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-3 md:mb-6 mt-3 md:mt-6" />
        <div v-if="postData" class="w-full flex flex-col items-center mb-20">
          <div v-if="postData.comments.length === 0" class="dark:text-gray-50">
            <p>Noch keine Kommentare vorhanden</p>
          </div>
          <card v-for="comment in postData.comments" :key="comment.id" class="m-1 md:my-3">
            <card-header :comment="comment" bg-color-dark="bg-dark-600" />
            <div class="p-5 pt-0" v-html="parseCommentText(comment.text)"></div>
          </card>
        </div>
      </div>
      <div
        v-if="!loading && !postData"
        class="text-center font-semibold text-gray-900 dark:text-gray-50 text-3xl mt-40"
      >
        Dieser Post existiert nicht!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PostCard from '../components/Post/PostCard.vue';
import { useAddCommentMutation, usePostByIdQuery, useSearchQuery } from '../graphql/generated/types';
import { PostByIdQuery } from '../graphql/generated/types';
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Card from '../components/Card/Card.vue';
import CardHeader from '../components/Card/CardHeader.vue';
import { postById } from '../graphql/queries/postById';
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { useMagicKeys } from '@vueuse/core';
import TributeTextarea from '../components/TributeTextarea.vue';
import { parseTags } from '../utils/postUtils';
import { useResult } from '@vue/apollo-composable';

export default defineComponent({
  components: { PostCard, Card, CardHeader, TributeTextarea },
  setup() {
    const commentText = ref('');
    // const postData = ref<PostByIdQuery>();
    const route = useRoute();
    const { control_enter } = useMagicKeys();
    const commentInput = ref();
    const router = useRouter();
    const mentions = ref<string[]>([]);

    watch(control_enter, (v) => {
      if (v) newComment();
    });

    //fetch a post with comments
    const {
      onResult,
      loading,
      result: PostResult,
    } = usePostByIdQuery(() => ({
      postId: route.params.id as string,
    }));

    let firstload = true;

    const postData = useResult(PostResult, null, (data) => data.postById);

    //set the post data and focus the input field
    onResult(({ data }) => {
      nextTick(() => {
        if (firstload && commentInput.value) commentInput.value.focus();
        firstload = false;
      });
    });

    //input validation rules
    const rules = computed(() => ({
      commentText: {
        required,
        minLength: minLength(1),
      },
    }));

    const v = useVuelidate(rules, { commentText });

    //create create comment mutation
    const { mutate: commentPost } = useAddCommentMutation(() => ({
      variables: {
        text: commentText.value,
        postID: route.params.id as string,
      },
      refetchQueries: [
        {
          query: postById,
          variables: {
            postId: route.params.id,
          },
        },
      ],
    }));

    /**
     * Extract mentions from the text
     */
    const parseCommentText = (text: string) => {
      const parsed = parseTags(text);

      mentions.value.push(...parsed.mentions);

      return parsed.parsedContent;
    };

    //update eventlisteners for mentions
    watch(mentions.value, () => {
      for (const mention of mentions.value) {
        document.querySelectorAll(`#${mention}`).forEach((item) => {
          item.addEventListener('click', (e) => {
            const { id } = e.target;
            router.push({ name: 'Profile', params: { id } });
          });
        });
      }
    });

    /**
     * validates the input and creates new comment if the check passed
     */
    const newComment = () => {
      v.value.$touch();
      if (v.value.$errors.length !== 0) return;
      commentPost();
      v.value.$reset();
      commentText.value = '';
    };

    const { result } = useSearchQuery(() => ({
      searchString: '',
    }));

    const foundUsers = useResult(result, [], (data) => data.search.users);

    //autocomplete options for mentions
    const autoCompleteOptions = {
      noMatchTemplate() {
        return '<li>Kein Benutzer gefunden</li>';
      },
      collection: [
        {
          trigger: '@',
          values: async (text: any, cb: any) => {
            const users = foundUsers.value.map((user) => {
              return { key: user.firstname + ' ' + user.lastname + ' @' + user.username, value: user.username };
            });

            return cb(users);
          },
          positionMenu: true,
        },
      ],
    };

    return { postData, commentText, newComment, loading, v, commentInput, autoCompleteOptions, parseCommentText };
  },
});
</script>

<style></style>
