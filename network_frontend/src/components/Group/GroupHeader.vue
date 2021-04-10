<template>
  <div class="flex flex-col dark:bg-dark-600 bg-gray-100 p-6 items-center w-full rounded-xl">
    <div class="bg-pink-300 w-full rounded-xl h-72">
      <lazy-image src="" blurhash="AePC3PmlGv{c" />
    </div>
    <div class="w-full mt-6 py-10 flex justify-between">
      <div class="flex flex-col">
        <div v-if="group" class="text-xl font-semibold dark:text-gray-50 text-gray-900">{{ group.name }}</div>
        <div class="flex">
          <div></div>
          <div class="text-lg font-semibold dark:text-gray-400 text-gray-900">Private Gruppe</div>
          <div class="w-1"></div>
          <div class="text-lg font-semibold dark:text-gray-400 text-gray-900">· {{ numberFormatter(1000) }} Mitglieder</div>
        </div>
      </div>
      <div class="flex h-full items-center">
        <div class="ml-10">
          <group-permission-container>
            <app-button>Einladen</app-button>
          </group-permission-container>
        </div>
      </div>
    </div>
    <div class="w-full mt-6 py-4 text-lg font-semibold dark:text-gray-50 text-gray-900">
      <div class="flex sm:space-x-10 space-x-0 sm:space-y-0 sm:flex-row w-full">
        <div
          class="py-1 px-8 rounded-lg cursor-pointer"
          @click="$emit('switchComponent', GroupComponents.GROUP_FEED)"
          :class="{ 'bg-indigo-500 !text-gray-50 px-8': activeComponent == GroupComponents.GROUP_FEED }"
        >
          <span class="dark:text-gray-50">Feed</span>
          <span class="ml-2 font-medium">{{ numberFormatter(numberOfPosts) }}</span>
        </div>
        <div
          class="py-1 px-8 rounded-lg cursor-pointer"
          @click="$emit('switchComponent', GroupComponents.GROUP_WIKI)"
          :class="{ 'bg-indigo-500 !text-gray-50 ': activeComponent == GroupComponents.GROUP_WIKI }"
        >
          <span class="">Wiki</span>
        </div>
        <div class="py-1 px-8 rounded-lg cursor-pointer" @click="$emit('switchComponent', GroupComponents.GROUP_FEED)">
          <span class="dark:text-gray-50 text-gray-900">Files</span>
          <span class="ml-2 font-light dark:text-gray-50 text-gray-900"></span>
        </div>
        <div class="py-1 px-8 rounded-lg cursor-pointer" @click="$emit('switchComponent', GroupComponents.GROUP_FEED)">
          <span class="dark:text-gray-50 text-gray-900">Everything is possible...</span>
          <span class="ml-2 font-light dark:text-gray-50 text-gray-900"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import LazyImage from '../Blurhash/LazyImage.vue';
import { numberFormatter } from '../../utils/numberFormatter';
import { GroupComponents } from '../../views/Group.vue';
import { useGroupByIdQuery } from '../../graphql/generated/graphqlOperations';
import { Group, GroupByIdQueryVariables } from '../../graphql/generated/types';
import GroupPermissionContainer from './GroupPermissionContainer.vue';

export default defineComponent({
  components: { LazyImage, GroupPermissionContainer },
  emits: ['switchComponent'],
  props: {
    groupId: {
      type: String,
      required: true,
    },
    activeComponent: {
      type: String as PropType<GroupComponents>,
    },
  },
  setup(props) {
    const group = ref<Group>();
    const numberOfPosts = ref(0);
    const switchComponent = (comp: GroupComponents) => {
      console.log(comp);
    };

    const { onResult } = useGroupByIdQuery(
      () =>
        <GroupByIdQueryVariables>{
          groupId: props.groupId,
        }
    );

    onResult(({ data }) => {
      group.value = data.groupById;
      console.log(data);
      numberOfPosts.value = data.groupById.numberOfPosts || 0;
      console.log(data);
    });

    return {
      numberFormatter,
      GroupComponents,
      numberOfPosts,
      switchComponent,
      group,
    };
  },
});
</script>
