<template>
  <div>
    <div
      id="home"
      class="flex h-full items-center pt-10 bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto"
    >
      <post-list :posts="posts" />
    </div>
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable'
import { defineComponent } from 'vue'
import { useGetFeedQuery } from '../graphql/generated/graphqlOperations'
import PostList from '@/components/PostList.vue'

export default defineComponent({
  components: { PostList },
  setup() {
    const { result, error } = useGetFeedQuery({ pollInterval: 60000 })
    const posts = useResult(result)
    return { posts, error }
  },
})
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
