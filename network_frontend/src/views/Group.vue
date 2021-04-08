<template>
  <div><post-list :posts="posts"/>
  </div>
</template>

<script lang="ts">
import PostList from '../components/PostList.vue';
import { useGetPostsFromGroupQuery } from '../graphql/generated/graphqlOperations';
import { GetPostsFromGroupQueryVariables } from '../graphql/generated/types';
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    PostList
  },
  setup() {
    const posts = ref([])
    const take = ref(3);
    const route = useRoute()
    const skip = ref(0);

    const {onResult} = useGetPostsFromGroupQuery(() => <GetPostsFromGroupQueryVariables>{
      groupId: route.params.id
    })

    onResult(({data}) => {
      posts.value = data.getPostsFromGroup
    })

    return {posts}
  },
});
</script>

<style>
</style>