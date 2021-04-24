<template>
  <div class="p-5 w-full">
    <div class="mb-5">
      <span class="dark:text-red-400 text-red-500 dark:text-opacity-60 text-opacity-75 tracking-wider">ADMIN</span>
      <div class="mt-4">
        <group-member-card
          :avatar="owner?.profilePicLink"
          :firstname="owner?.firstname"
          :lastname="owner?.lastname"
          :username="owner?.username"
        ></group-member-card>
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
          ></group-member-card>
        </div>
      </div>
    </div>
    <div>
      <span class="dark:text-gray-300 text-gray-700 dark:text-opacity-60 text-opacity-75 tracking-wider">OFFLINE</span>
      <div class="mt-4">
        <div class="mt-4">
          <div class="dark:bg-dark-500 bg-gray-300 w-full h-10 rounded-xl"></div>
        </div>
        <div class="mt-4">
          <div class="dark:bg-dark-500 bg-gray-300 w-full h-10 rounded-xl"></div>
        </div>
        <div class="mt-4">
          <div class="dark:bg-dark-500 bg-gray-300 w-full h-10 rounded-xl"></div>
        </div>
        <div class="mt-4">
          <div class="dark:bg-dark-500 bg-gray-300 w-full h-10 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GroupMemberCard from './GroupMemberCard.vue';
import { useResult } from '@vue/apollo-composable';
import { useGroupMembersQuery } from '../../graphql/generated/graphqlOperations';
import { useRoute } from 'vue-router';
export default defineComponent({
  components: { GroupMemberCard },
  setup() {
    const route = useRoute();

    const { result } = useGroupMembersQuery(() => ({
      groupId: route.params.id as string,
    }));

    const owner = useResult(result, null, (data) => result.value.groupById.createdBy);

    const members = useResult(result, null, (data) =>
      result.value.groupById.members.filter((m) => m.id !== result.value.groupById.createdBy.id)
    );

    return { members, owner };
  },
});
</script>

<style></style>
