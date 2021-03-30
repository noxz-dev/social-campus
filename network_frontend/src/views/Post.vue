<template>
  <div class="flex h-full items-center pt-10 bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto">
    <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
      <div
        class="z-20 py-2 sticky md:static w-full -top-10 cursor-pointer dark:text-gray-50 text-gray-900 self-start flex items-center bg-white dark:bg-dark700 hover:text-highlight-500 dark:stroke-white stroke-black hover:stroke-indigo"
        @click="$router.back()"
      >
        <svg class="h-8" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Iconly/Light/Arrow---Left" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
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
        <span class="font-semibold text-lg ml-2">Zurück zum Feed</span>
      </div>
      <div v-if="postData" class="w-full mt-10 flex items-center flex-col">
        <post-card v-if="postData" :post="postData.postById" />
        <div class="border-b-2 border-dark500 w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-6" />
        <card>
          <div class="p-5 flex flex-col">
            <span class="pb-3">Schreibe einen Kommentar</span>
            <div class="mb-2">
              <textarea
                v-model="commentText"
                class="dark:bg-dark700 border-2 border-gray-700 h-24 resize-none rounded-lg w-full p-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Kommentiere..."
              />
            </div>
            <div class="h-8">
              <div v-if="v.commentText.$error" class="text-red-400">Du musst schon was eingeben...</div>
            </div>
            <div class="self-end">
              <div
                class="cursor-pointer mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-highlight-500 hover:bg-highlight-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                @click="newComment"
              >
                Antworten
              </div>
            </div>
          </div>
        </card>
        <div class="border-b-2 border-dark500 w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-6" />
        <div v-if="postData" class="w-full flex flex-col items-center mb-20">
          <div v-if="postData.postById.comments.length === 0" class="dark:text-gray-50">
            <p>Noch keine Kommentare vorhanden</p>
          </div>
          <card v-for="comment in postData.postById.comments" :key="comment.id">
            <card-header :comment="comment" />
            <div class="p-5 pt-0">
              {{ comment.text }}
            </div>
          </card>
        </div>
      </div>
      <div v-else-if="!loading && !postData" class="text-center font-semibold text-gray-900 dark:text-gray-50 text-3xl mt-40">
        Dieser Post existiert nicht!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PostCard from '../components/PostCard.vue';
import { useAddCommentMutation, usePostByIdQuery } from '../graphql/generated/graphqlOperations';
import { AddCommentMutationVariables, PostByIdQuery, PostByIdQueryVariables } from '../graphql/generated/types';
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import Card from '../components/Card.vue';
import CardHeader from '../components/CardHeader.vue';
import { postById } from '../graphql/queries/postById';
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';

export default defineComponent({
  components: { PostCard, Card, CardHeader },
  setup() {
    const commentText = ref('');
    const postData = ref<PostByIdQuery>();
    const route = useRoute();
    const { onResult, loading } = usePostByIdQuery(
      () =>
        <PostByIdQueryVariables>{
          postId: route.params.id,
        }
    );

    onResult(({ data }) => {
      postData.value = data;
    });

    const rules = computed(() => ({
      commentText: {
        required,
        minLength: minLength(1),
      },
    }));

    const v = useVuelidate(rules, { commentText });

    const { mutate: commentPost } = useAddCommentMutation(() => ({
      variables: <AddCommentMutationVariables>{
        text: commentText.value,
        postID: route.params.id,
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

    const newComment = () => {
      v.value.$touch();
      if (v.value.$errors.length !== 0) return;
      commentPost();
      v.value.$reset();
      commentText.value = '';
    };

    return { postData, commentText, newComment, loading, v };
  },
});
</script>

<style></style>
