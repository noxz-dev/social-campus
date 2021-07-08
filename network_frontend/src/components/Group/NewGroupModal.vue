<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" static class="fixed z-40 inset-0 overflow-y-auto" @close="isOpen = false" :open="isOpen">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 dark:bg-dark-700 !bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-bottom
              bg-white
              dark:bg-dark-700
              rounded-lg
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8
              sm:align-middle
              sm:max-w-lg
              sm:w-full
            "
          >
            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">
                    Neue Gruppe erstellen
                  </DialogTitle>
                  <div class="mt-2 w-full">
                    <div class="flex">
                      <input-field
                        placeholder="Gruppenname"
                        class="w-2/3 mr-6"
                        inputClasses="!pr-0"
                        v-model="groupname"
                      />
                      <custom-select
                        :options="Object.values(GroupType)"
                        class="w-1/3 dark:text-gray-50 text-gray-900"
                        @valueChosen="setType($event)"
                      />
                    </div>

                    <input-field
                      v-if="groupType === GroupType.Private"
                      placeholder="Gruppen Passwort"
                      class="mt-5"
                      inputClasses="!pr-0"
                      v-model="groupPassword"
                    />
                    <textarea
                      class="
                        dark:bg-dark-600
                        border
                        placeholder-gray-400
                        dark:text-gray-50
                        text-gray-900
                        w-full
                        mt-5
                        border-gray-700
                        h-24
                        resize-none
                        rounded-lg
                        p-2
                        outline-none
                        focus:ring-1 focus:ring-brand-500
                        focus:border-indigo-500
                      "
                      placeholder="Gruppenbeschreibung"
                      v-model="description"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div v-for="(error, index) in v.$errors" :key="index" class="text-red-500">
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-dark-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <app-button @click="createGroup"> Gruppe erstellen </app-button>
              <app-button
                type="button"
                class="
                  !border-gray-300
                  !bg-white
                  dark:!border-dark-500
                  dark:!bg-dark-500
                  hover:!bg-gray-200
                  dark:hover:!bg-dark-600
                  !text-gray-900
                  dark:!text-gray-50
                  mx-2
                "
                @click="closeModal"
                ref="cancelButtonRef"
              >
                Abbrechen
              </app-button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script lang="ts">
import { useCreateGroupMutation } from '../../graphql/generated/types';
import { computed, defineComponent, ref } from 'vue';
import CustomSelect from '../Form/CustomSelect.vue';
import InputField from '../Form/InputField.vue';
import useVuelidate from '@vuelidate/core';
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue';
import { minLength, required, maxLength, helpers } from '@vuelidate/validators';
import gql from 'graphql-tag';
export default defineComponent({
  components: { InputField, CustomSelect, TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle },
  props: {
    headerText: {
      type: String,
      default: 'header',
    },
    contentText: {
      type: String,
      default: 'content',
    },
  },
  setup() {
    let isOpen = ref(false);
    const groupname = ref('');
    const description = ref('');
    const groupPassword = ref('');
    const groupType = ref<GroupType>(GroupType.Private);

    const pwRequired = (value) => (groupType.value === GroupType.Private ? helpers.req(value) : !helpers.req(value));

    //input validation rules
    const rules = computed(() => ({
      groupname: {
        minLength: helpers.withMessage('Der Gruppenname muss eine minimale Länge von 3 haben', minLength(3)),
        required: helpers.withMessage('Gruppenname wird benötigt', required),
        maxLength: helpers.withMessage('Der Gruppenname darf maximal 30 Zeichen lang sein', maxLength(30)),
      },
      description: {
        maxLength: helpers.withMessage('Beschreibung darf maximal 200 Zeichen lang sein', maxLength(200)),
      },
      groupPassword: {
        pwRequired: helpers.withMessage('Passwort wird benötigt', pwRequired),
        minLength: helpers.withMessage('Das Passwort muss eine minimale Länge von 3 haben', minLength(3)),
        maxLength: helpers.withMessage('Das Passwort kann maximal 16 Zeichen lang sein', maxLength(16)),
      },
    }));

    const v = useVuelidate(rules, { groupname, description, groupPassword });

    /**
     * open the modal
     */
    const openModal = () => {
      isOpen.value = true;
    };

    /**
     * closes the modal
     */
    const closeModal = () => {
      isOpen.value = false;
    };

    //register the create group mutation
    const { mutate: createGrp } = useCreateGroupMutation(() => ({
      variables: {
        name: groupname.value,
        groupType: groupType.value,
        description: description.value,
        password: groupPassword.value,
      },
      update: (cache, { data: { createGroup } }) => {

        //add the newly created group to the exisiting cache
        cache.modify({
          fields: {
            myGroups(existingGroups) {
              const newGroupRef = cache.writeFragment({
                data: createGroup,
                fragment: gql`
                  fragment NewGroup on PreviewGroup {
                    id
                    name
                    description
                    numberOfMembers
                    type
                    previewAvatars {
                      name
                      blurhash
                    }
                  }
                `,
              });


              return [newGroupRef, ...existingGroups];
            },
          },
        });
      },
    }));

    /**
     * validates the input, and creates a new group if the check passed
     */
    const createGroup = async () => {
      await v.value.$validate();
      if (v.value.$errors.length === 0) {
        try {
          await createGrp();
          v.value.$reset()
          groupname.value = '';
          description.value = '';
          groupPassword.value = '';
          groupType.value = GroupType.Private;
        } finally {
          closeModal();
        }
      }
    };

    /**
     * sets the type of the group from the dropdown
     */
    const setType = (val: GroupType) => {
      if (val == GroupType.Public) groupType.value = GroupType.Public;
      if (val == GroupType.Private) groupType.value = GroupType.Private;
      v.value.$reset();
    };

    return {
      openModal,
      closeModal,
      createGroup,
      groupname,
      description,
      groupPassword,
      setType,
      groupType,
      GroupType,
      isOpen,
      v,
    };
  },
});
</script>

<style></style>
