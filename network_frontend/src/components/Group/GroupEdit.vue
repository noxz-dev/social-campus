<template>
  <div v-if="!leaveGroupClicked" class="text-gray-900 dark:text-gray-50 flex flex-col justify-end">
    <group-role-container :groupId="group.id" :role="GroupRoles.Admin">
      <div class="flex-1 mt-2">
        <div class="my-4">
          <label for="groupname">Gruppenname</label>
          <input-field class="mt-2" id="groupname" v-model="groupname"></input-field>
        </div>
        <div class="my-4">
          <label for="groupname">Beschreibung</label>
          <textarea
            class="
              dark:bg-dark-600
              border
              placeholder-gray-400
              dark:text-gray-50
              text-gray-900
              w-full
              mt-3
              -mb-3
              border-gray-700
              h-24
              resize-none
              rounded-lg
              p-2
              outline-none
              focus:ring-1 focus:ring-brand-500 focus:border-indigo-500
            "
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
    <app-button @click="leaveGroupClicked = true" class="w-full items-center justify-center leaveButton my-3">
      <span class="text-md">Gruppe Verlassen</span>
    </app-button>

    <div v-for="(error, index) in v.$errors" :key="index" class="text-red-500">
      {{ error.$message }}
    </div>
    <div class="flex flex-row-reverse my-4">
      <group-role-container :groupId="group.id" :role="GroupRoles.Admin">
        <app-button class="ml-4" @click="updateGroup"> Speichern </app-button>
      </group-role-container>
      <app-button class="!bg-dark-400 hover:!bg-red-700 focus:ring-red-600" @click="$emit('close')">
        Abbrechen
      </app-button>
    </div>
  </div>

  <div v-else class="text-gray-900 dark:text-gray-50 flex flex-col justify-end">
    <div class="text-xs text-red-500 flex items-center">
      <svg class="stroke-red h-4 w-4 fill-red mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <line
          x1="128"
          y1="104"
          x2="128"
          y2="144"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        ></line>
        <path
          d="M114.15243,39.98472,26.17616,191.977a16.00005,16.00005,0,0,0,13.84762,24.01535H215.97625A16,16,0,0,0,229.82386,191.977L141.84757,39.98472A16,16,0,0,0,114.15243,39.98472Z"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        ></path>
        <circle cx="128" cy="180" r="12"></circle>
      </svg>
      <div>Wenn du die letzte Person in dieser Gruppe bist, wird sie gelöscht und alle Posts sind verloren</div>
    </div>
    <group-role-container :groupId="group.id" :role="GroupRoles.Admin" v-if="isLastAdmin">
      <span class="my-4">Du bist der letzte Admin der Gruppe! Wähle einen neuen:</span>
      <custom-select
        @value-chosen="chooseAdmin($event)"
        :inital-value="members.map((u) => u.firstname + ' ' + u.lastname + ' @' + u.username)[0]"
        :options="members.map((u) => u.firstname + ' ' + u.lastname + ' @' + u.username)"
      ></custom-select>
    </group-role-container>

    <div class="flex gap-4">
      <app-button @click="leaveGroupClicked = false" class="w-full items-center justify-center backButton my-3 test">
        <span class="text-md">Zurück</span>
      </app-button>
      <app-button @click="leaveGroup" class="w-full items-center justify-center leaveButton my-3">
        <span class="text-md">Gruppe Verlassen</span>
      </app-button>
    </div>
  </div>
</template>
<script lang="ts">
import {
  GroupRoles,
  useGroupMembersQuery,
  useLeaveGroupMutation,
  useUpdateGroupMutation,
  useUpdateGroupRoleMutation,
} from '../../graphql/generated/types';
import { Group } from '../../graphql/generated/types';
import { computed, defineComponent, PropType, ref } from 'vue';
import GroupRoleContainer from './GroupRoleContainer.vue';
import CustomSelect from '../../components/Form/CustomSelect.vue';
import InputField from '../../components/Form/InputField.vue';
import { GroupType } from '../../graphql/generated/types';
import { useRoute, useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { maxLength, helpers, required, minLength } from '@vuelidate/validators';
import { useResult } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import { groupMembers } from '../../graphql/queries/groupMembers';

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
    const groupPassword = ref();
    const description = ref(props.group.description);
    const groupname = ref(props.group.name);
    const type = ref(props.group.type);
    const router = useRouter();
    const leaveGroupClicked = ref(false);
    const route = useRoute();
    const store = useStore();
    const choosenAdmin = ref();

    const user = computed(() => store.state.userData.user);

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
        //update the existing group data with the updated ones
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

    const { result } = useGroupMembersQuery(
      () => ({
        groupId: route.params.id as string,
      }),
      { pollInterval: 5000 }
    );

    const members = useResult(result, [], (data) =>
      data.groupById.members.filter((m) => m.groupRole === GroupRoles.Member && m.id != user.value.id)
    );

    const admins = useResult(result, [], (data) =>
      result.value.groupById.members.filter((m) => m.groupRole === GroupRoles.Admin)
    );

    const isLastAdmin = computed(() => admins.value?.length == 1);

    const { mutate: leave } = useLeaveGroupMutation(() => ({
      variables: {
        groupId: props.group.id,
      },
    }));

    const pwRequired = (value) =>
      type.value === GroupType.Private && props.group.type === GroupType.Public
        ? helpers.req(value)
        : !helpers.req(value);

    //input validation rules
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

    /**
     * validate the input and update the group if the input is correct
     */
    async function updateGroup() {
      await v.value.$validate();

      if (groupPassword.value === '') groupPassword.value = null;
      if (v.value.$errors.length === 0) {
        try {
          await update();
        } finally {
          emit('close');
        }
      }
    }

    /**
     * choose a new admin on leave group if the user is the last admin
     */
    function chooseAdmin(newAdmin: string) {
      const username = newAdmin.match(/@[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g)![0].replace('@', '');
      const foundUser = members.value?.find((u) => u.username === username);
      if (!foundUser) return;
      choosenAdmin.value = foundUser.id;
    }

    //init the update role mutation
    const { mutate: updateGroupRole } = useUpdateGroupRoleMutation(() => ({
      variables: {
        groupId: route.params.id as string,
        groupRole: GroupRoles.Admin,
        memberId: choosenAdmin.value,
      },
      refetchQueries: [
        {
          query: groupMembers,
          variables: { groupId: route.params.id },
        },
      ],
    }));

    /**
     * leave a group and route back to the group overview page
     */
    async function leaveGroup() {
      if (isLastAdmin.value) {
        if (choosenAdmin.value) {
          const result = await updateGroupRole();
          if (result) {
            await leave();
            router.push('/groups');
          }
        } else {
          // TODO ERROR MESSAGE FOR NOT CHOOSING ADMIN AND CLICKING THE BUTTON
        }
      } else {
        await leave();
        router.push('/groups');
      }
    }

    function setType(newType: GroupType) {
      type.value = newType;
    }

    return {
      GroupRoles,
      groupPassword,
      description,
      groupname,
      type,
      updateGroup,
      GroupType,
      setType,
      leaveGroup,
      v,
      leaveGroupClicked,
      isLastAdmin,
      members,
      chooseAdmin,
    };
  },
});
</script>
<style>
.backButton {
  @apply bg-dark-400;
  @apply focus:ring-dark-400;
}

.backButton:hover {
  @apply bg-dark-500;
}

.leaveButton {
  @apply bg-red-600;
  @apply focus:ring-red-600;
}

.leaveButton:hover {
  @apply bg-red-700;
}
</style>
