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
                <span v-if="group">Der Gruppe {{ group.name }} beitreten </span>
              </h3>
              <div id="modal-headline" class="font-normal leading-6 text-gray-900 dark:text-gray-200 mt-4">
                <span v-if="group">{{ group.description }} </span>
              </div>
              <div class="mt-20">
                <div class="dark:text-gray-50 text-gray-900 mb-4">Gruppen Passwort</div>
                <input-field placeholder="passwort1234" v-model="groupPassword" />
                <div class="flex justify-end">
                  <app-button @click="joinGroup" class="mt-4">Beitreten</app-button>
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
import { useGroupByIdQuery, useJoinGroupMutation } from '../../graphql/generated/types';
import { JoinGroupMutationVariables } from '../../graphql/generated/types';
import { defineComponent, ref } from 'vue';
import InputField from '../Form/InputField.vue';
import { useRouter } from 'vue-router';
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
    const router = useRouter();

    const { mutate: joinGrp } = useJoinGroupMutation(() => ({
      variables: <JoinGroupMutationVariables>{
        groupId: props.groupId,
        password: groupPassword.value,
      },
    }));

    const { result } = useGroupByIdQuery(() => ({
      groupId: props.groupId,
    }));

    const group = useResult(result, null, (data) => data.groupById);

    //TODO INPUT VALIDATION
    const joinGroup = async () => {
      console.log(groupPassword.value.length);
      if (groupPassword.value.length >= 3) {
        await joinGrp();

        // //TODO THIS SHOULD BE CHANGED TO A WAY BETTER MECHANISM XD
        // try {
        //   await router.push({ name: 'Groups' });
        //   router.push({ name: 'Group', params: { id: props.groupId } });
        // } catch (err) {
        //   console.log('refresh triggerd');
        // }
        state.refreshGroup = true;
      }
    };

    return {
      open,
      groupPassword,
      joinGroup,
      group,
    };
  },
});
</script>

<style></style>
