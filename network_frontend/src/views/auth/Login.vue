<template>
  <div class="flex justify-center items-center h-full w-full">
    <div
      class="
        md:min-h-screen
        bg-gray-50
        dark:bg-dark-700
        flex flex-col
        justify-center
        py-26
        md:py-12
        sm:px-6
        lg:px-8
        w-full
      "
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center dark:text-gray-50 text-3xl font-extrabold text-gray-900">Login SocialCampus</h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
        <div
          class="
            bg-white
            py-8
            px-4
            shadow
            sm:rounded-lg
            sm:px-10
            md:dark:bg-dark-600
            dark:bg-dark-700
            border
            dark:md:border-dark-600
            dark:border-dark-700
          "
        >
          <form class="space-y-6" action="#" method="POST" @submit.prevent="onSubmit({ email, password })">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-50"> Email </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  v-model="emailForm"
                  autocomplete="email"
                  required
                  class="
                    appearance-none
                    block
                    w-full
                    px-3
                    py-2
                    border
                    dark:text-gray-100
                    dark:bg-dark-700
                    dark:border-dark-600
                    border-gray-300
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    focus:outline-none
                    focus:ring-brand-500
                    focus:border-indigo-500
                    sm:text-sm
                  "
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium dark:text-gray-50 text-gray-700"> Passwort </label>
              <div class="mt-1">
                <input
                  id="password"
                  placeholder="Passwort"
                  v-model="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="
                    appearance-none
                    block
                    w-full
                    px-3
                    py-2
                    border
                    dark:text-gray-100
                    dark:bg-dark-700
                    dark:border-dark-600
                    border-gray-300
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    focus:outline-none
                    focus:ring-brand-500
                    focus:border-indigo-500
                    sm:text-sm
                  "
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div v-for="(error, index) in v.$errors" :key="index" class="text-red-500">
                {{ error.$message }}
              </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="
                  w-full
                  flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  rounded-md
                  shadow-sm
                  text-sm
                  font-medium
                  text-white
                  bg-brand-600
                  hover:bg-brand-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-brand-500
                "
              >
                Login
              </button>
            </div>
          </form>
          <div class="flex justify-center dark:text-gray-50 text-gray-900 mt-3 text-sm">
            <div class="flex">
              <div>Neu hier ?</div>
              <div
                tabindex="0"
                role="button"
                class="text-highlight-500 underline cursor-pointer ml-2"
                @click="$router.push('/signup')"
                @keydown="$router.push('/signup')"
              >
                Konto erstellen
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="error"
          class="bg-red-500 h-10 text-white rounded-xl p-2 px-10 absolute my-0 mt-5 left-1/2 transform -translate-x-1/2"
        >
          Falsche E-Mail oder Passwort!
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { required, minLength, email, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useMutation } from '@vue/apollo-composable';
import { login as loginMutation } from '../../graphql/mutations/login';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const emailForm = ref('');
    const password = ref('');

    const rules = computed(() => ({
      emailForm: {
        required,
        email,
      },
      password: {
        required,
        minLength: helpers.withMessage('Das Passwort muss mindestens 5 Zeichen lang sein', minLength(5)),
      },
    }));

    const v = useVuelidate(rules, { emailForm, password });

    const {
      mutate: login,
      onDone,
      error,
    } = useMutation(loginMutation, () => ({
      variables: {
        email: emailForm.value,
        password: password.value,
      },
    }));

    const onSubmit = async () => {
      await v.value.$validate()
      if (!v.value.$invalid) {
        login();
      }
    };

    onDone((result) => {
      localStorage.setItem('apollo-token', result.data.login.accessToken);
      router.push(route.query.redirect || '/');
    });

    return { onSubmit, emailForm, password, error, v };
  },
});
</script>

<style></style>
