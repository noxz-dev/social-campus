<template>
  <div
    class="flex w-full rounded-lg dark:text-white flex-col mb-8"
  >
    <textarea
      v-model="message"
      class="bg-darkTheme-700 h-24 resize-none rounded-lg p-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      placeholder="Hey, was gibt's Neues ?"
    />
  </div>
  <div class="sm:flex sm:flex-row-reverse">
    <a
      href="#"
      class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-darkTheme-700 focus:ring-indigo-500"
      @click="post"
    >
      Posten
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import addPost from "@/graphql/addPost.mutation.gql"
import { useMutation } from '@vue/apollo-composable';
import feedQuery from "@/graphql/feed.query.gql"
export default defineComponent({
  setup() {
    const message = ref("")
    
    
    const { mutate: newPost } = useMutation(addPost, () => ({
      variables: {
        text: message.value
      },
      update: (cache, {data: { addPost } }) => {
          const dataInStore:any = cache.readQuery({ query: feedQuery })
          cache.writeQuery({ query: feedQuery, data: {
            ...dataInStore,
            getFeed: [...dataInStore.getFeed, addPost]
          } })
      }
      })
      )
    
    const post = () => {
      if(message.value == "") return
      console.log(message.value)
      newPost()
    }

    return {
      message,
      post
    }
  }
});
</script>

<style></style>
