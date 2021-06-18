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
        <h2 class="mt-6 text-center dark:text-gray-50 text-3xl font-extrabold text-gray-900">Erstelle ein Konto</h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
        <div
          class="
            bg-white
            py-8
            pb-4
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
              <label for="firstname" class="block text-sm font-medium text-gray-700 dark:text-gray-50"> Vorname </label>
              <div class="mt-1">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="Max"
                  v-model="firstname"
                  autocomplete="given-name"
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
              <div v-if="v.firstname.$error" class="text-red-500 mt-0.5 text-sm">
                Der Vorname muss aus mindestens zwei Zeichen bestehen und darf keine Zahlen enthalten
              </div>
            </div>

            <div>
              <label for="lastname" class="block text-sm font-medium text-gray-700 dark:text-gray-50">
                Nachnamen
              </label>
              <div class="mt-1">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Muster"
                  v-model="lastname"
                  autocomplete="family-name"
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
              <div v-if="v.lastname.$error" class="text-red-500 mt-0.5 text-sm">
                Der Nachname wird benötigt und darf keine Zahlen enthalten
              </div>
            </div>

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
              <div v-if="v.emailForm.$error" class="text-red-500 mt-0.5 text-sm">Das ist keine gültige Email, nur Hochschul-Emails erlaubt</div>
            </div>
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-50">
                Benutzername
              </label>
              <div class="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="legend27"
                  v-model.trim="username"
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
              <div v-if="v.username.$error" class="text-red-500 mt-0.5 text-sm">
                <p>Der Benutzername muss aus 3 Zeichen oder mehr bestehen</p>
                <p>und darf keine Sonderzeichen oder Leerzeichen enthalten</p>
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
              <div v-if="v.password.$error" class="text-red-500 mt-0.5 text-sm">
                Das Passwort muss aus 5 Zeichen oder mehr bestehen
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium dark:text-gray-50 text-gray-700">
                Passwort bestätigen
              </label>
              <div class="mt-1">
                <input
                  id="confirmPassword"
                  placeholder="Passwort bestätigen"
                  v-model="confirmPassword"
                  name="confirmPassword"
                  type="password"
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
              <div v-if="v.confirmPassword.$error" class="text-red-500 mt-0.5 text-sm">
                Die Passwörter stimmen nicht überein
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
                Konto erstellen
              </button>
            </div>
          </form>
          <div class="flex justify-center dark:text-gray-50 text-gray-900 mt-3 text-sm">
            <div class="flex">
              <div>Du besitzt schon ein Konto?</div>
              <div
                role="button"
                tabindex="0"
                class="text-highlight-500 underline cursor-pointer ml-2"
                @click="$router.push('/login')"
                @keydown="$router.push('/login')"
              >
                Anmelden
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { required, minLength, email, sameAs, alpha, alphaNum, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useRoute, useRouter } from 'vue-router';
import { useSignupMutation } from '../../graphql/generated/types';
export default defineComponent({
  setup() {
    const router = useRouter();
    const emailForm = ref('');
    const password = ref('');
    const firstname = ref('');
    const lastname = ref('');
    const username = ref('');
    const confirmPassword = ref('');

    const validEmail = (value) => value.endsWidth("@hs-hannover.de");

    //input validation rules
    const rules = computed(() => ({
      emailForm: {
        required,
        email,
        // validEmail: helpers.withMessage('Nur Hochschul-Emails sind erlaubt', validEmail)
      },
      password: {
        required,
        minLength: minLength(5),
      },
      firstname: {
        alpha,
        required,
        minLength: minLength(2),
      },
      lastname: {
        alpha,
        required,
      },
      username: {
        minLength: minLength(3),
        alphaNum,
        required,
      },
      confirmPassword: {
        required,
        minLength: minLength(5),
        sameAsRef: sameAs(password),
      },
    }));

    const v = useVuelidate(rules, { emailForm, password, firstname, lastname, username, confirmPassword });

    const {
      mutate: signup,
      onDone,
      error,
    } = useSignupMutation(() => ({
      variables: {
        input: {
          firstName: firstname.value,
          lastname: lastname.value,
          username: username.value,
          email: emailForm.value,
          password: password.value,
        },
      },
    }));

    //create a new user if input validation is fine
    const onSubmit = async () => {
      v.value.$touch();
      if (!v.value.$invalid) {
        await signup();
      }
    };

    onDone((result) => {
      router.push('/login');
    });

    return { onSubmit, emailForm, password, error, firstname, lastname, username, confirmPassword, v };
  },
});
</script>

<style></style>
