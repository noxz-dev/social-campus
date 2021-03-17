<template>
  <div>
    <div id="home" class="flex h-full items-center pt-10 bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto">
      <post-list :posts="posts" />
    </div>
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, watchEffect } from 'vue';
import { useGetFeedQuery } from '../graphql/generated/graphqlOperations';
import PostList from '@/components/PostList.vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';

export default defineComponent({
  components: { PostList },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);

    watchEffect(() => {
      console.log(user.value.id);
    });

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

    return { posts, error };
  },
});
</script>

<style>
#home::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #272b2f;
}
#home::-webkit-scrollbar {
  width: 12px;
  background-color: #272b2f;
}
#home::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #363b41;
}
</style>
