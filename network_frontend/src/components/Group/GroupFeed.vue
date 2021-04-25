<template>
  <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4 mb-10 mt-10">
    <post-list :posts="posts" class="pt-10 md:pt-0" cardBgColor="bg-dark600" />
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useGetPostsFromGroupQuery } from '../../graphql/generated/types';
import { GetPostsFromGroupQueryVariables } from '../../graphql/generated/types';
import PostList from '../Post/PostList.vue';

export default defineComponent({
  components: {
    PostList,
  },
  setup() {
    const posts = ref();
    const take = ref(3);
    const route = useRoute();
    const skip = ref(0);
    const store = useStore();

    const user = computed(() => store.state.userData.user);

    const { onResult, subscribeToMore } = useGetPostsFromGroupQuery(
      () =>
        <GetPostsFromGroupQueryVariables>{
          groupId: route.params.id,
        }
    );

    subscribeToMore(() => ({
      document: gql`
        subscription newPost($userId: String!, $all: Boolean!, $groupId: String) {
          newPost(userId: $userId, all: $all, groupId: $groupId) {
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
            edited
          }
        }
      `,
      variables: {
        userId: user.value.id,
        groupId: route.params.id,
        all: false,
      },
    }));

    onResult(({ data }) => {
      posts.value = data.getPostsFromGroup;
    });

    return { posts };
  },
});
</script>

<style></style>
