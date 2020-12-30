<template>
  <div class="min-h-screen dark:bg-gray-900 dark:text-gray-100 text-gray-900">
    <Contentview />
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import loginMutation from "./graphql/login.mutation.gql";
import Contentview from "./views/Contentview";

export default {
  name: "App",
  components: {
    Contentview
  },

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

<style>
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
