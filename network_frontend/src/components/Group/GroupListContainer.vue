<template>
  <div class="mt-10 p-4 pb-2 w-full dark:bg-dark-600 bg-gray-200 rounded-xl dark:text-gray-50">
    <div>
      <div class="pb-2 flex justify-between px-4">
        <span class="text-lg md:text-xl font-semibold">{{ headerText}}</span>
      </div>
    </div>
    <div
      class="w-full p-1 flex flex-col items-center"
      ref="groupListContainer"
      :class="groups && groups?.length === 0 && 'py-5 p-4'"
    >
      <group-list
        v-if="groups && groups.length > 0"
        :groups="groups"
        :isMemberOfGroup="isMember"
        :loading="isLoading"
      ></group-list>
      <div v-else class="font-semibold">{{ emptyText}}</div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Group } from 'graphql/generated/types';
import { defineComponent, PropType } from 'vue';
import GroupList from './GroupList.vue';
export default defineComponent({
  components: {
    GroupList,
  },
  props: {
    groups: {
      type: Object as PropType<Group[]>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    headerText: {
      type: String,
      required: true
    },
    emptyText: {
      type: String,
      required: true
    },
    isMember: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {};
  },
});
</script>
<style></style>
