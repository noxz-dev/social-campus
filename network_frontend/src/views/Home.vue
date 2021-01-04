<template>
  <div class="w-full h-screen flex items-center justify-center bg-gray-900 flex-col">
    <h1 class="text-9xl text-white">{{ message }}</h1>
     <post-card />
  </div>
 
</template>

<script lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, ref } from "vue";
import loginMutation from "../graphql/login.mutation.gql";
import PostCard from "@/components/PostCard.vue";
export default defineComponent({
  components: {PostCard},
  setup() {
    const message = ref("hsh_net, coming soon ...");

    const { mutate: login, onDone } = useMutation(loginMutation);

    onDone(result => {
      console.log(result.data);
    });
    return { message, login };
  }
});
</script>

<style></style>
