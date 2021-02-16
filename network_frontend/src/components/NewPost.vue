<template>
  <div
    class="flex w-full rounded-lg dark:text-white flex-col mb-8"
  >
    <textarea
      v-model="message"
      class="dark:bg-dark700 border-2 border-gray-700 h-24 resize-none rounded-lg p-2 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      placeholder="Hey, was gibt's Neues ?"
      @blur="v.message.$touch"
    />
    <div class="h-8">
      <div
        v-if="v.message.$error"
        class="text-red-400"
      >
        Post text wird benötigt
      </div>
    </div>
  </div>
  <div class="sm:flex sm:flex-row-reverse">
    <a
      href="#"
      class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
      @click="post"
    >
      Posten
    </a>
    <a
      href="#"
      class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
      @click="eventbus.emit('close-modal')"
    >
      Abbrechen
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref } from 'vue';
import { addPost } from "../graphql/mutations/addPost"
import { useMutation } from '@vue/apollo-composable';
import { getFeed } from "../graphql/queries/getFeed"
import { Emitter } from 'mitt';
import useVuelidate from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
export default defineComponent({
  setup() {
    const message = ref("")


    const rules = computed(() => ({
      message: {
        required,
        minLength: minLength(10)
      },
    }))

    const v = useVuelidate(rules, { message })
    
    
    const { mutate: newPost } = useMutation(addPost, () => ({
      variables: {
        text: message.value
      },
      update: (cache, {data: { addPost } }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dataInStore:any = cache.readQuery({ query: getFeed })
          cache.writeQuery({ query: getFeed, data: {
            ...dataInStore,
            getFeed: [...dataInStore.getFeed, addPost]
          } })
      }
      })
    )
    let eventbus: Emitter
    const internalInstance = getCurrentInstance();
    if (internalInstance) {
      eventbus = internalInstance.appContext.config.globalProperties.eventbus;
      
    }
    
    const post = () => {
      if(v.value.$errors.length !== 0) return
      newPost()
      eventbus.emit("close-modal")
    }

    return {
      message,
      post,
      v
    }
  }
});
</script>

<style></style>
