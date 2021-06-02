<template>
  <div class="text-gray-900 dark:text-gray-50 flex flex-col justify-end">
    <group-role-container :groupId="group.id" :role="GroupRoles.Admin">
      <div class="flex-1 mt-2">
        <div class="my-4">
          <label for="groupname">Gruppenname</label>
          <input-field class="mt-2" id="groupname" v-model="groupname"></input-field>
        </div>
        <div class="my-4">
          <label for="groupname">Beschreibung</label>
          <textarea
            class="dark:bg-dark-600 border placeholder-gray-400 dark:text-gray-50 text-gray-900 w-full mt-3 -mb-3 border-gray-700 h-24 resize-none rounded-lg p-2 outline-none focus:ring-1 focus:ring-brand-500 focus:border-indigo-500"
            placeholder="Gruppenbeschreibung"
            v-model="description"
          />
        </div>
        <label for="groupType">Gruppenart</label>
        <custom-select
          id="groupType"
          :inital-value="type"
          :options="['PRIVATE', 'PUBLIC']"
          class="w-1/3 dark:text-gray-50 text-gray-900 mt-2 mb-4"
          @valueChosen="setType"
        />
        <div v-if="type == GroupType.Private">
          <label for="newGroupPassword">Neues Gruppen Passwort</label>
          <input-field
            id="newGroupPassword"
            v-if="true"
            placeholder="Gruppen Passwort"
            class="mt-2"
            inputClasses="!pr-0"
            v-model="groupPassword"
          />
        </div>
      </div>
    </group-role-container>
    <span class="font-semibold mt-4">Danger Zone</span>
    <app-button
      @click="leaveGroup"
      class="w-full items-center justify-center bg-red-600 hover:bg-red-700 focus:ring-red-600 my-3"
    >
      <span class="text-md">Gruppe Verlassen</span>
    </app-button>
    <div v-for="(error, index) in v.$errors" :key="index" class="text-red-500">
      {{ error.$message }}
    </div>
    <div class="flex flex-row-reverse my-4">
      <group-role-container :groupId="group.id" :role="GroupRoles.Admin">
        <app-button class="ml-4" @click="updateGroup"> Speichern </app-button>
      </group-role-container>
      <app-button class="!bg-dark-400 hover:!bg-red-700 focus:ring-red-600" @click="$emit('close')"> Abbrechen </app-button>
    </div>
  </div>
</template>
<script lang='ts'>
import { GroupRoles, useLeaveGroupMutation, useUpdateGroupMutation } from '../../graphql/generated/types';
import { Group } from '../../graphql/generated/types';
import { computed, defineComponent, PropType, ref } from 'vue';
import GroupRoleContainer from './GroupRoleContainer.vue';
import CustomSelect from '../../components/Form/CustomSelect.vue';
import InputField from '../../components/Form/InputField.vue';
import { GroupType } from '../../graphql/generated/types';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { maxLength, helpers, required, minLength } from '@vuelidate/validators';

export default defineComponent({
  components: { GroupRoleContainer, CustomSelect, InputField },
  emits: ['close'],
  props: {
    group: {
      type: Object as PropType<Group>,
      required: true,
    },
  },
  setup(props, { emit }) {
    console.log(props.group);
    const groupPassword = ref();
    const description = ref(props.group.description);
    const groupname = ref(props.group.name);
    const type = ref(props.group.type);
    const router = useRouter();

    const { mutate: update } = useUpdateGroupMutation(() => ({
      variables: {
        input: {
          groupId: props.group.id,
          name: groupname.value,
          description: description.value,
          type: type.value,
          password: groupPassword.value,
        },
      },
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify(props.group),
          fields: {
            name() {
              return data?.updateGroup.name;
            },
            description() {
              return data?.updateGroup.description;
            },
            type() {
              return data?.updateGroup.type;
            },
          },
        });
      },
    }));

    const { mutate: leave } = useLeaveGroupMutation(() => ({
      variables: {
        groupId: props.group.id,
      },
    }));

    
    const pwRequired = (value) => (((type.value === GroupType.Private) && (props.group.type === GroupType.Public)) ? helpers.req(value) : !helpers.req(value));

    const rules = computed(() => ({
      groupname: {
        required: helpers.withMessage('Gruppenname wird benötigt', required),
        minLength: helpers.withMessage('Der Gruppenname muss eine minimale Länge von 3 haben', minLength(3)),
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

    async function updateGroup() {
      await v.value.$validate()
      console.log();
      
    console.log(type.value === GroupType.Private && props.group.type === GroupType.Public);

      if (groupPassword.value === '') groupPassword.value = null;
      console.log(v.value.$errors)
      if (v.value.$errors.length === 0) {
        try {
          await update();
        } finally {
          emit('close');
        }
      }
    }

    async function leaveGroup() {
      await leave();
      router.push('/groups');
    }

    function setType(newType: GroupType) {
      type.value = newType;
    }

    return { GroupRoles, groupPassword, description, groupname, type, updateGroup, GroupType, setType, leaveGroup, v };
  },
});
</script>
<style></style>
