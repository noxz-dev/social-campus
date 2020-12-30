<template>
  <div class="w-full h-screen flex items-center justify-center bg-gray-900">
    <h1 class="text-9xl text-white">{{ message }}</h1>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import loginMutation from "../graphql/login.mutation.gql";
export default {
  setup() {
    const message = ref("hsh_net, coming soon ...");

    const { mutate: login, onDone } = useMutation(loginMutation);

    onDone(result => {
      console.log(result.data);
    });
    return { message, login };
  }
};
</script>

<style></style>
