<template>
  <div class="flex flex-col dark:bg-dark-600 bg-gray-100 p-6 items-center w-full rounded-xl">
    <div class="bg-pink-300 w-full rounded-xl h-72">
      <lazy-image src="" blurhash="AePC3PmlGv{c" />
    </div>
    <div class="w-full mt-6 py-10 flex justify-between">
      <div class="flex flex-col">
        <div v-if="group" class="w-40 md:w-full text-xl font-semibold dark:text-gray-50 text-gray-900 break-words">
          {{ group.name }}
        </div>
        <div class="flex">
          <div class="text-lg font-semibold dark:text-gray-400 text-gray-900" v-if="group">
            <span v-if="group.type === 'PRIVATE'">Private </span>
            <span v-else>Öffentliche </span>
            Gruppe
          </div>
          <div class="w-1"></div>
          <div class="text-lg font-semibold dark:text-gray-400 text-gray-900">
            · {{ numberFormatter(numberOfMembers) }} Mitglieder
          </div>
        </div>
        <div class="dark:text-gray-50 text-gray-900 my-2 break-words">{{ group?.description }}</div>
      </div>
      <div class="flex h-full items-center">
        <div class="ml-10">
          <group-permission-container :groupId="groupId">
            <template v-slot:onlyMember>
              <app-button
                ><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 256 256" class="mr-2 h-6">
                  <rect width="256" height="256" fill="none"></rect>
                  <line
                    x1="40"
                    y1="128"
                    x2="216"
                    y2="128"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="128"
                    y1="40"
                    x2="128"
                    y2="216"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                </svg>
                <span class="text-md">Einladen</span>
              </app-button>
            </template>
            <template v-slot:public>
              <app-button @click="joinGroup">
                <span class="text-md">Beitreten</span>
              </app-button>
            </template>
          </group-permission-container>
        </div>
      </div>
    </div>
    <div class="w-full mt-6 py-4 text-lg font-semibold dark:text-gray-50 text-gray-900">
      <div class="flex sm:space-x-10 space-x-0 sm:space-y-0 sm:flex-row w-full justify-between md:justify-start">
        <div
          class="py-1 px-2 rounded-lg cursor-pointer"
          @click="$emit('switchComponent', GroupComponents.GROUP_FEED)"
          :class="{ 'bg-indigo-500 !text-gray-50  ': activeComponent == GroupComponents.GROUP_FEED }"
        >
          <span class="dark:text-gray-50">Feed</span>
          <span class="ml-2 font-medium">{{ numberFormatter(numberOfPosts) }}</span>
        </div>
        <div
          class="py-1 px-2 rounded-lg cursor-pointer"
          @click="$emit('switchComponent', GroupComponents.GROUP_WIKI)"
          :class="{ 'bg-indigo-500 !text-gray-50 ': activeComponent == GroupComponents.GROUP_WIKI }"
        >
          <span class="">Wiki</span>
        </div>
        <div class="py-1 px-2 rounded-lg cursor-pointer" @click="$emit('switchComponent', GroupComponents.GROUP_FEED)">
          <span class="dark:text-gray-50 text-gray-900">Files</span>
          <span class="ml-2 font-light dark:text-gray-50 text-gray-900"></span>
        </div>
        <div class="py-1 px-2 rounded-lg cursor-pointer" @click="$emit('switchComponent', GroupComponents.GROUP_FEED)">
          <span class="dark:text-gray-50 text-gray-900">...</span>
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
import { useGroupByIdQuery, useJoinGroupMutation } from '../../graphql/generated/types';
import { Group, GroupByIdQueryVariables, JoinGroupMutationVariables } from '../../graphql/generated/types';
import GroupPermissionContainer from './GroupPermissionContainer.vue';
import { useRouter } from 'vue-router';

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
    const numberOfMembers = ref(0);
    const router = useRouter();

    const { onResult } = useGroupByIdQuery(
      () =>
        <GroupByIdQueryVariables>{
          groupId: props.groupId,
        }
    );

    onResult(({ data }) => {
      group.value = data.groupById;
      numberOfPosts.value = data.groupById.numberOfPosts || 0;
      numberOfMembers.value = data.groupById.numberOfMembers || 0;
    });

    const { mutate: joinGrp } = useJoinGroupMutation(() => ({
      variables: <JoinGroupMutationVariables>{
        groupId: props.groupId,
      },
    }));

    const joinGroup = async () => {
      joinGrp();

      //TODO THIS SHOULD BE CHANGED TO A WAY BETTER MECHANISM XD
      try {
        await router.push({ name: 'Groups' });
        router.push({ name: 'Group', params: { id: props.groupId } });
      } catch (err) {
        console.log('refresh triggerd');
      }
    };

    return {
      numberFormatter,
      GroupComponents,
      numberOfPosts,
      numberOfMembers,
      group,
      joinGroup,
    };
  },
});
</script>
