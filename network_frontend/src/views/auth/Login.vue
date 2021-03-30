<template>
  <div class="flex justify-center items-center h-full w-full">
    <div class="md:min-h-screen bg-gray-50 dark:bg-dark700 flex flex-col justify-center py-26 md:py-12 sm:px-6 lg:px-8 w-full">
      <div class="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
        <h2 class="mt-6 text-center dark:text-gray-50 text-3xl font-extrabold text-gray-900">Login SocialCampus</h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-dark700 md:border-1 md:border-gray-700">
          <form class="space-y-6" action="#" method="POST" @submit.prevent="login({ email, password })">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-50"> Email </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  v-model="email"
                  autocomplete="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border dark:text-gray-100 dark:bg-dark600 dark:border-dark600 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium dark:text-gray-50 text-gray-700"> Passwort </label>
              <div class="mt-1">
                <input
                  id="password"
                  placeholder="passwort"
                  v-model="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="appearance-none block w-full px-3 py-2 border dark:text-gray-100 dark:bg-dark600 dark:border-dark600 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center"></div>

              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  <!-- Forgot your password? -->
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { login as loginMutation } from '../../graphql/mutations/login';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const email = ref('');
    const password = ref('');

    const { mutate: login, onDone } = useMutation(loginMutation, {
      variables: {
        email: email.value,
        password: password.value,
      },
    });
    onDone((result) => {
      localStorage.setItem('apollo-token', result.data.login.accessToken);
      router.push(route.query.redirect || '/');
    });

    return { login, email, password };
  },
});
</script>

<style></style>
