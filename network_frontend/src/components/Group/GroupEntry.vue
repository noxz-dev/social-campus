<template>
  <div v-if="true" class="fixed w-full z-50 overflow-y-auto rounded-xl pt-0.5 backdrop-filter backdrop-blur-[2px]">
    <div class="flex min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed h-full w-full rounded-xl transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 dark:bg-dark-800 bg-white opacity-75 rounded-xl" />
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white dark:bg-dark600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 md:-ml-14 xl:-ml-44 md:align-middle sm:max-w-xl w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white dark:bg-dark700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 sm:mt-0 sm:text-left w-full">
              <h3 id="modal-headline" class="text-2xl leading-6 font-medium text-gray-900 dark:text-gray-200">Privater Gruppe Beitreten</h3>
              <div class="mt-6">
                <div class="dark:text-gray-50 text-gray-900 mb-4">Gruppen Passwort</div>
                <input-field placeholder="password1234" v-model="groupPassword" />
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
import { useJoinGroupMutation } from '../../graphql/generated/graphqlOperations';
import { JoinGroupMutationVariables } from '../../graphql/generated/types';
import { defineComponent, getCurrentInstance, ref } from 'vue';
import InputField from '../Form/InputField.vue';
import { useRouter } from 'vue-router';
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

    const joinGroup = async () => {
      console.log(groupPassword.value.length);
      if (groupPassword.value.length >= 3) {
        joinGrp();

        //TODO THIS SHOULD BE CHANGED TO A WAY BETTER MECHANISM XD
        try {
          await router.push({ name: 'Groups' });
          router.push({ name: 'Group', params: { id: props.groupId } });
        } catch (err) {
          console.log('refresh triggerd');
        }
      }
    };

    return {
      open,
      groupPassword,
      joinGroup,
    };
  },
});
</script>

<style></style>
