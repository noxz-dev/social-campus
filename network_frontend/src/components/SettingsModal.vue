<template>
  <div class="pt-4">
    <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-50 !my-2 text-left">
      Neues Passwort
    </label>
    <input-field id="newPassword" inputClasses="!pr-2" v-model="newPassword" type="password" autocomplete="off"></input-field>
    <label
      for="newPasswordRepeat"
      class="block text-sm font-medium text-gray-700 dark:text-gray-50 !my-2 !mt-4 text-left"
    >
      Neues Passwort wiederholen
    </label> 
    <input-field id="newPasswordRepeat" inputClasses="!pr-2" v-model="newPasswordRepeat" type="password" autocomplete="off"></input-field>

    <div>
      <div v-for="(error, index) in v.$errors" :key="index" class="text-red-500">
        {{ error.$message }}
      </div>
    </div>
    <div class="pt-5 py-3 text-right flex items-center justify-between">
      <div  class="dark:text-green-500 text-green-700"><span v-if="passwordUpdated">✔ Passwort wurde geändert</span></div>
      <app-button class="self-end" :disabled="loading" @click="changePassword">
        Ändern
        <svg
          class="animate-spin ml-2 mr-1 h-5 w-5 text-white"
          v-if="loading"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </app-button>
    </div>

    <label for="themeChange" class="block text-sm font-medium text-gray-700 dark:text-gray-50 !my-2 first:text-left">
      Theme wechseln
    </label>
    <div id="themeChange" class="flex flex-col xl:flex-row items-center">
      <span class="">
        <svg
          class="h-6 w-6"
          fill="none"
          :class="isDarkMode ? 'text-gray-700' : 'text-gray-600'"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
      <toggle-button @toggleStateUpdate="toggle" class="mx-3 my-3" :initalState="isDarkMode" />
      <span class="">
        <svg
          class="h-6 w-6"
          :class="isDarkMode ? 'text-gray-200' : 'text-gray-400'"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </span>
    </div>
    <div class="pt-10 py-3 text-right">
      <app-button type="submit" class="bg-dark-400 hover:!bg-red-600" @click="$emit('close')"> Schließen</app-button>
    </div>
  </div>
</template>
<script lang="ts">
import { useUpdatePasswordMutation } from '../graphql/generated/types';
import { computed, defineComponent, ref } from 'vue';
import InputField from './Form/InputField.vue';
import ToggleButton from './Form/ToggleButton.vue';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required, sameAs } from '@vuelidate/validators';
export default defineComponent({
  components: { InputField, ToggleButton },
  emits: ["close"],
  props: {},
  setup() {
    const newPassword = ref();
    const newPasswordRepeat = ref();
    const isDarkMode = ref(false);
    const passwordUpdated = ref(false);

    //dark light theme handler
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      if (localStorage.theme !== 'light') isDarkMode.value = true;
    } else {
      if (localStorage.theme !== 'dark') isDarkMode.value = false;
    }

    /**
     * toggles the theme of the application
     */
    const toggle = () => {
      isDarkMode.value = !isDarkMode.value;
      if (isDarkMode.value) localStorage.theme = 'dark';
      else localStorage.theme = 'light';
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const { mutate: updatePassword, loading } = useUpdatePasswordMutation(() => ({
      variables: {
        input: {
          password: newPassword.value
        }
      }
    }))

    const rules = computed(() => ({
      newPassword: {
        required,
        minLength: helpers.withMessage("Das Passwort benötigt eine mindestlänge von 5", minLength(5)),
      },
      newPasswordRepeat: {
        required,
        sameAsRef: helpers.withMessage("Die Passwörter sind nicht identisch", sameAs(newPassword)),
      },
    }));

    const v = useVuelidate(rules, { newPassword, newPasswordRepeat });

    const changePassword = async () => {
      await v.value.$validate()
      if(v.value.$errors.length > 0) return

      const resp = await updatePassword()
      if(resp.data) passwordUpdated.value = true

    }

    return {
      v,
      isDarkMode,
      newPasswordRepeat,
      newPassword,
      toggle,
      loading,
      changePassword,
      passwordUpdated
    };
  },
});
</script>
<style></style>
