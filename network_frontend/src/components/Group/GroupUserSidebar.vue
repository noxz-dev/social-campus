<template>
  <div class="p-5 w-full">
    <div class="mb-5">
      <span class="dark:text-red-400 text-red-500 dark:text-opacity-60 text-opacity-75 tracking-wider">ADMIN</span>
      <div class="mt-4">
        <div class="mt-4" v-for="admin in admins" :key="admin.id">
          <group-member-card
            :avatar="admin.profilePicLink"
            :firstname="admin.firstname"
            :lastname="admin.lastname"
            :username="admin.username"
            :status="admin.onlineStatus"
            :userId="admin.id"
          ></group-member-card>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <span class="dark:text-indigo-300 text-indigo-500 dark:text-opacity-60 text-opacity-75 tracking-wider"
        >MITGLIEDER</span
      >
      <div class="mt-4">
        <div class="mt-4" v-for="member in members" :key="member.id">
          <group-member-card
            :avatar="member.profilePicLink"
            :firstname="member.firstname"
            :lastname="member.lastname"
            :username="member.username"
            :status="member.onlineStatus"
            :userId="member.id"
          ></group-member-card>
        </div>
      </div>
    </div>
    <div>
      <span class="dark:text-gray-300 text-gray-700 dark:text-opacity-60 text-opacity-75 tracking-wider">OFFLINE</span>
      <div class="mt-4" v-for="member in offlineMembers" :key="member.id">
        <group-member-card
          :avatar="member.profilePicLink"
          :firstname="member.firstname"
          :lastname="member.lastname"
          :username="member.username"
          :status="member.onlineStatus"
          :userId="member.id"
        ></group-member-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GroupMemberCard from './GroupMemberCard.vue';
import { useResult } from '@vue/apollo-composable';
import { GroupRoles, useGroupMembersQuery } from '../../graphql/generated/types';
import { useRoute } from 'vue-router';
export default defineComponent({
  components: { GroupMemberCard },
  setup() {
    const route = useRoute();

    const { result } = useGroupMembersQuery(
      () => ({
        groupId: route.params.id as string,
      }),
      { pollInterval: 10000 }
    );

    const admins = useResult(result, null, (data) =>
      result.value.groupById.members.filter((m) => m.groupRole === GroupRoles.Admin && m.onlineStatus == true)
    );

    const members = useResult(result, null, (data) =>
      result.value.groupById.members.filter((m) => m.groupRole === GroupRoles.Member && m.onlineStatus == true)
    );

    const offlineMembers = useResult(result, null, (data) =>
      result.value.groupById.members.filter((m) => m.onlineStatus == false)
    );

    return { members, admins, offlineMembers };
  },
});
</script>

<style></style>
