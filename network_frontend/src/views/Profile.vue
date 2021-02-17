<template>
  <div
    id="profile"
    class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto text-gray-100"
  >
    <div class="bg-dark600 w-full h-98 mb-3 flex items-center justify-evenly">
      <div class="flex-shrink-0">
        <img class="h-40 w-40 rounded-full" :src="profileImage" alt="" />
      </div>
      <div class="flex-shrink-0 text-4xl">
        <div v-if="user">{{ user.firstname + ' ' + user.lastname }}</div>
        <div class="flex text-2xl gap-2">
          <div v-if="user">Follower 100</div>
          <div v-if="user">Folge Ich 100</div>
        </div>
      </div>
      <div class="flex-shrink-0">
        <div>
          <a
            href="#"
            class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
          >
            Profil bearbeiten</a
          >
        </div>
      </div>
    </div>
    <post-list :posts="posts" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useResult } from '@vue/apollo-composable';
import PostList from '@/components/PostList.vue';
import {
  useGetPostsFromUserQuery,
  useMeQuery,
} from '../graphql/generated/graphqlOperations';
import { useRoute } from 'vue-router';
export default defineComponent({
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();

    const { result: userResult, error: userError, onResult } = useMeQuery();

    const user = useResult(userResult);
    const profileImage = ref('');
    onResult((user) => {
      profileImage.value = user?.data?.me?.profilePicLink;
    });

    const { result, error, refetch } = useGetPostsFromUserQuery({
      userID: route.params.id,
      pollInterval: 60000,
    });

    // watch(
    //   () => route.params,
    //   async (newParams) => {
    //     console.log(newParams.id);
    //     refetch({ useID: newParams.id });
    //   }
    // );

    const posts = useResult(result);
    return { posts, error, profileImage, user };
  },
});
</script>

<style>
#profile::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #272b2f;
}
#profile::-webkit-scrollbar {
  width: 12px;
  background-color: #272b2f;
}
#profile::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #363b41;
}
</style>
