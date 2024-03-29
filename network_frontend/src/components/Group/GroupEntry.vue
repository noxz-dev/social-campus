<template>
  <div v-if="true" class="fixed w-full z-30 overflow-y-auto rounded-xl pt-0.5 backdrop-filter backdrop-blur-[2px]">
    <div class="flex min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed h-full w-full rounded-xl transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 dark:bg-dark-800 bg-white opacity-75 rounded-xl" />
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="
          inline-block
          align-bottom
          bg-white
          dark:bg-dark-600
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          my-8
          md:-ml-14
          xl:-ml-44
          md:align-middle
          sm:max-w-xl
          w-full
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white dark:bg-dark-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="sm:mt-0 sm:text-left w-full">
              <h3 id="modal-headline" class="text-2xl leading-6 font-medium text-gray-900 dark:text-gray-200">
                <span v-if="group"
                  >Der Gruppe <b>{{ group.name }}</b> beitreten
                </span>
              </h3>
              <div id="modal-headline" class="font-normal leading-6 text-gray-900 dark:text-gray-200 mt-4">
                <span v-if="group">{{ group.description }} </span>
              </div>
              <div class="">
                <div class="py-10">
                  <div class="dark:text-gray-50 text-gray-900 mb-4">Gruppen Passwort</div>
                  <input-field
                    placeholder="passwort1234"
                    inputClasses="!pr-0"
                    v-model="groupPassword"
                    @keypress.enter="joinGroup"
                  />
                  <div v-if="error" class="text-red-500">Falsches Passwort, versuche es erneut</div>
                </div>
                <div class="flex justify-end">
                  <app-button @click="joinGroup" class="mt-4">
                    <svg
                      class="animate-spin mr-3 h-5 w-5 text-white"
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
                    Beitreten
                  </app-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGroupByIdPreviewQuery, useJoinGroupMutation } from '../../graphql/generated/types';
import { defineComponent, ref } from 'vue';
import InputField from '../Form/InputField.vue';
import { useResult } from '@vue/apollo-composable';
import { state } from '../../utils/state';

export default defineComponent({
  components: { InputField },
  props: {
    groupId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const groupPassword = ref('');

    const {
      mutate: joinGrp,
      error,
      loading,
    } = useJoinGroupMutation(() => ({
      variables: {
        groupId: props.groupId,
        password: groupPassword.value,
      },
    }));

    //fetch the preview view of the group
    const { result } = useGroupByIdPreviewQuery(() => ({
      groupId: props.groupId,
    }));

    const group = useResult(result, null, (data) => data.groupByIdPreview);

    /**
     * try to join a group with the password
     */
    const joinGroup = async () => {
      if (groupPassword.value.length >= 1) {
        await joinGrp();
        state.refreshGroup = true;
      }
    };

    return {
      open,
      groupPassword,
      joinGroup,
      group,
      error,
      loading,
    };
  },
});
</script>

<style></style>
