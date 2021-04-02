<template>
  <div>
    <div id="home" ref="home" class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto">
      <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4 mb-10 mt-10">
        <div class="text-2xl font-semibold dark:text-gray-50 text-gray-900 mb-10 text-center">
          <span class="flex justify-center items-center" v-if="$route.query.tag">
            Posts mit dem Tag
            <span class="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
              #{{ $route.query.tag }}
            </span>
          </span>
        </div>
        <post-list :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from 'vue';
import { useBrowsePostsQuery, useGetFeedQuery } from '../graphql/generated/graphqlOperations';
import PostList from '@/components/PostList.vue';
import { useStore } from 'vuex';
import gql from 'graphql-tag';
import { BrowsePostsQueryVariables } from '../graphql/generated/types';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: { PostList },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.userData.user);
    const home = ref<HTMLElement>();
    const route = useRoute();

    const loadMore = () => {
      console.log('load triggerd');
    };

    const { result, error, subscribeToMore } = useBrowsePostsQuery(
      () =>
        <BrowsePostsQueryVariables>{
          take: 1000,
          skip: 0,
          tags: route.query.tag,
        }
    );
    const posts = useResult(result);

    // subscribeToMore(() => ({
    //   document: gql`
    //     subscription newPost($userId: String!) {
    //       newPost(userId: $userId) {
    //         id
    //         liked
    //         imageLink
    //         user {
    //           id
    //           firstname
    //           lastname
    //           username
    //           profilePicLink
    //         }
    //         text
    //         likesCount
    //         createdAt
    //         edited
    //       }
    //     }
    //   `,
    //   variables: {
    //     userId: user.value.id,
    //   },
    // }));

    return { posts, error, home, loadMore };
  },
});
</script>

<style></style>
