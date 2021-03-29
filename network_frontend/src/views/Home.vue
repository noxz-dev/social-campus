<template>
  <div>
    <div id="home" ref="home" class="flex h-full items-center pt-10 bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto">
      <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
        <post-list :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from 'vue';
import { useGetFeedQuery } from '../graphql/generated/graphqlOperations';
import PostList from '@/components/PostList.vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
// import { onBefor } from 'vue-router';
import { scrollState } from '../_helpers/scrollState';
export default defineComponent({
  components: { PostList },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const home = ref<HTMLElement>();

    const loadMore = () => {
      console.log('load triggerd');
    };

    const { result, error, subscribeToMore } = useGetFeedQuery({ pollInterval: 60000 });
    const posts = useResult(result);

    subscribeToMore(() => ({
      document: gql`
        subscription newPost($userId: String!) {
          newPost(userId: $userId) {
            id
            liked
            imageLink
            user {
              id
              firstname
              lastname
              username
              profilePicLink
            }
            text
            likesCount
            createdAt
          }
        }
      `,
      variables: {
        userId: user.value.id,
      },
      // updateQuery: (previousResult, { subscriptionData }) => {
      //   console.log(previousResult);
      //   // previousResult.messages.push(subscriptionData.data.messageAdded);
      //   return previousResult;
      // },
    }));

    return { posts, error, home, loadMore };
  },
});
</script>

<style></style>
