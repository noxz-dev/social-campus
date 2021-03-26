<template>
  <div class="flex h-full items-center pt-10 bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto">
    <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
      <div
        class="cursor-pointer text-gray-50 self-start flex items-center rounded-lg hover:text-highlight-500 fill-white hover:fill-indigo"
        @click="$router.back()"
      >
        <svg class="h-8" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Iconly/Bulk/Arrow---Left-Square" stroke="none" stroke-width="1" fill-rule="evenodd">
            <g
              id="Arrow---Left-Square"
              transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) translate(2.000000, 2.000000)"
              fill-rule="nonzero"
            >
              <path
                d="M-0.0001,5.9159 L-0.0001,14.0839 C-0.0001,17.6229 2.2759,19.9999 5.6649,19.9999 L14.3349,19.9999 C17.7239,19.9999 19.9999,17.6229 19.9999,14.0839 L19.9999,5.9159 C19.9999,2.3779 17.7229,-0.0001 14.3339,-0.0001 L5.6649,-0.0001 C2.2759,-0.0001 -0.0001,2.3779 -0.0001,5.9159"
                id="Fill-1"
                opacity="0.400000006"
              ></path>
              <path
                d="M5.7206,10.8554 L9.4686,14.6204 C9.7506,14.9034 10.2496,14.9034 10.5326,14.6204 L14.2806,10.8554 C14.5726,10.5614 14.5716,10.0864 14.2776,9.7944 C13.9836,9.5024 13.5096,9.5024 13.2166,9.7964 L10.7496,12.2734 L10.7496,5.9184 C10.7496,5.5034 10.4136,5.1684 9.9996,5.1684 C9.5856,5.1684 9.2496,5.5034 9.2496,5.9184 L9.2496,12.2734 L6.7836,9.7964 C6.6366,9.6494 6.4446,9.5764 6.2516,9.5764 C6.0606,9.5764 5.8686,9.6494 5.7226,9.7944 C5.4296,10.0864 5.4286,10.5614 5.7206,10.8554"
                id="Fill-4"
              ></path>
            </g>
          </g>
        </svg>
        <span class="font-semibold text-lg ml-2">Zurück zum Feed</span>
      </div>
      <div v-if="postData" class="w-full mt-10 flex items-center flex-col">
        <post-card
          v-if="postData"
          :id="postData.postById.id"
          :imageUrl="postData.postById.imageLink"
          :imageUrlProfile="postData.postById.user.profilePicLink"
          :likeCount="postData.postById.likesCount"
          :liked="postData.postById.liked"
          :name="postData.postById.user.firstname + '' + postData.postById.user.lastname"
          :postDate="new Date(postData.postById.createdAt)"
          :postText="postData.postById.text"
          :userId="postData.postById.user.id"
        />
        <div class="border-b-2 border-dark500 w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-6" />
        <card>
          <div class="p-5 flex flex-col">
            <span class="pb-3">Schreibe einen Kommentar</span>
            <div class="mb-2">
              <textarea
                v-model="commentText"
                class="dark:bg-dark700 dark:text-gray-50 py-5 w-full resize-none rounded-lg outline-none border-none focus:ring-highlight-500"
                placeholder="Kommentiere..."
              />
            </div>
            <div class="h-8">
              <div v-if="v.commentText.$error" class="text-red-400">Du musst schon was eingeben...</div>
            </div>
            <div class="self-end">
              <div
                href="#"
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
            <card-header
              :creationDate="new Date(comment.createdAt)"
              :name="comment.user.firstname + ' ' + comment.user.lastname"
              :profileImg="comment.user.profilePicLink"
              :userId="comment.user.id"
            />
            <div class="p-5">
              {{ comment.text }}
            </div>
          </card>
        </div>
      </div>
      <div v-else-if="!loading && !postData" class="text-center font-semibold text-gray-50 text-3xl mt-40">Dieser Post existiert nicht!</div>
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