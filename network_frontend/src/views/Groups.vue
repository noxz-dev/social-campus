<template>
  <div>
    <div
      id="groups"
      class="flex h-full items-center bg-white dark:bg-dark-700 flex-col rounded-3xl overflow-y-auto p-5 pb-20"
    >
      <div class="p-4 pt-0 w-full rounded-lg">
        <div class="flex justify-between dark:text-gray-50 text-gray-900 items-center">
          <div class="text-md font-semibold text-lg">Finde Gruppen</div>
          <div>
            <div></div>
            <div>
              <app-button @click="newGroupModal?.openModal()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 256 256" class="mr-2 h-6">
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
                <span class="hidden md:block">Gruppe erstellen</span>
                <span class="sm:block md:hidden">
                  <svg
                    class="h-6"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g id="Iconly/Bulk/2-User" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="2-User" transform="translate(2.000000, 3.000000)" fill="#fff" fill-rule="nonzero">
                        <path
                          d="M7.34933305,11.8577345 C3.38552687,11.8577345 -6.83897383e-14,12.4700446 -6.83897383e-14,14.9173685 C-6.83897383e-14,17.3666088 3.3640004,18 7.34933305,18 C11.3131392,18 14.6986661,17.3876899 14.6986661,14.940366 C14.6986661,12.4911257 11.3346657,11.8577345 7.34933305,11.8577345"
                          id="Fill-1"
                        ></path>
                        <path
                          d="M7.34933305,9.52482353 C10.0489483,9.52482353 12.2123586,7.40617314 12.2123586,4.76241176 C12.2123586,2.11865038 10.0489483,-9.76996262e-15 7.34933305,-9.76996262e-15 C4.65069631,-9.76996262e-15 2.48630745,2.11865038 2.48630745,4.76241176 C2.48630745,7.40617314 4.65069631,9.52482353 7.34933305,9.52482353"
                          id="Fill-3"
                          opacity="0.400000006"
                        ></path>
                        <path
                          d="M14.1734202,4.84874844 C14.1734202,6.19506404 13.7605033,7.45130586 13.0364311,8.49482023 C12.9610885,8.60214218 13.0276248,8.74683517 13.1587406,8.76983274 C13.3407371,8.79953792 13.527626,8.81774432 13.7184289,8.82157725 C15.6166723,8.87044707 17.3201989,7.67361562 17.7908459,5.87118171 C18.4884992,3.19675692 16.4415275,0.79542817 13.833889,0.79542817 C13.5511095,0.79542817 13.2800716,0.824175122 13.0158831,0.876877868 C12.9796795,0.884543722 12.9405405,0.901791893 12.9209709,0.932455309 C12.8955306,0.971742811 12.9141216,1.02252909 12.939562,1.0560672 C13.7233212,2.13216145 14.1734202,3.44206424 14.1734202,4.84874844"
                          id="Fill-5"
                          opacity="0.400000006"
                        ></path>
                        <path
                          d="M19.779109,12.1693515 C19.4317501,11.4439701 18.5931962,10.9466478 17.3172635,10.7022987 C16.7155008,10.5585639 15.0853598,10.3544606 13.5697005,10.3832075 C13.5471956,10.3860822 13.5344754,10.4014139 13.5325184,10.4109962 C13.529583,10.4263279 13.5364323,10.4493255 13.5657866,10.4656155 C14.2663754,10.8048295 16.9738184,12.2805064 16.6333088,15.3928431 C16.6186317,15.528912 16.7291994,15.6438998 16.8671645,15.6247352 C17.5335067,15.5317867 19.2477966,15.1705333 19.779109,14.0474857 C20.0736303,13.453382 20.0736303,12.7634552 19.779109,12.1693515"
                          id="Fill-7"
                        ></path>
                      </g>
                    </g></svg
                ></span>
              </app-button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 p-4 pb-2 w-full dark:bg-dark-600 bg-gray-200 rounded-xl dark:text-gray-50">
        <div>
          <div class="pb-2 flex justify-between px-4">
            <span class="text-md md:text-lg">Deine Gruppen</span>

            <app-button class="text-xs cursor-pointer !rounded-full !py-1" @click="myGroupsOpen = !myGroupsOpen"
              >Zeige alle</app-button
            >
          </div>
        </div>
        <div
          class="w-full p-1 flex flex-col items-center min-h-[24rem]"
          ref="groupListContainer"
          :class="myGroupsOpen ? '' : 'max-h-[27rem] overflow-hidden'"
        >
          <div class="w-full">
            <div v-if="myGroups">
              <div v-if="!myGroups" class="pt-40">Keine Gruppen gefunden, tritt doch welchen bei</div>
              <group-list
                v-if="myGroups.length > 0"
                :groups="myGroups"
                :isMemberOfGroup="true"
                :loading="myGroupsLoading"
              ></group-list>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 p-4 pb-2 w-full dark:bg-dark-600 bg-gray-200 rounded-xl dark:text-gray-50">
        <div>
          <div class="pb-2 flex justify-between px-4">
            <span class="text-md md:text-lg">Empfohlene Gruppen</span>

            <app-button class="text-xs cursor-pointer !rounded-full !py-1 h-8 md:h-auto" @click="toggleGroups"
              >Zeige alle</app-button
            >
          </div>
        </div>
        <div class="w-full p-1 flex flex-col items-center min-h-[24rem]" ref="groupListContainer">
          <group-list
            v-if="groups.length > 0"
            :groups="groups"
            :isMemberOfGroup="false"
            :loading="recoGroupsLoading"
          ></group-list>
          <div v-else class="pt-40">Keine Gruppen gefunden, erstell doch eine</div>
        </div>
      </div>
      <div class="mt-10 p-4 pb-2 w-full dark:bg-dark-600 bg-gray-200 rounded-xl dark:text-gray-50">
        <div>
          <div class="pb-2 flex justify-between px-4">
            <span class="text-md md:text-lg">Gruppen von Personen, denen du folgst</span>

            <app-button
              class="text-xs cursor-pointer !rounded-full !py-1 h-8 md:h-auto"
              @click="followingGroupsOpen = !followingGroupsOpen"
              >Zeige alle</app-button
            >
          </div>
        </div>
        <div
          v-if="followingGroups"
          class="w-full p-1 flex flex-col items-center min-h-[24rem]"
          :class="followingGroupsOpen ? '' : 'max-h-[27rem] overflow-hidden'"
        >
          <group-list
            v-if="followingGroups.length > 0"
            :groups="followingGroups"
            :isMemberOfGroup="false"
            :loading="followingGroupsLoading"
          ></group-list>
          <div v-else class="pt-40">Keine Gruppen gefunden</div>
        </div>
      </div>
    </div>
    <new-group-modal ref="newGroupModal" />
  </div>
</template>

<script lang="ts">
import Card from '../components/Card/Card.vue';
import { defineComponent, ref } from 'vue';
import GroupCard from '../components/Group/GroupCard.vue';
import NewGroupModal from '../components/Group/NewGroupModal.vue';
import InputField from '../components/Form/InputField.vue';
import {
  Group,
  useFollowingGroupsQuery,
  useGroupsQuery,
  useMyGroupsQuery,
} from '../graphql/generated/types';
import GroupList from '../components/Group/GroupList.vue';
import { takeStateGroups } from '../utils/groupsTake';
import { useResizeObserver } from '@vueuse/core';
import { useResult } from '@vue/apollo-composable';

export default defineComponent({
  components: {
    Card,
    GroupCard,
    NewGroupModal,
    InputField,
    GroupList,
  },
  setup() {
    const groups = ref<Partial<Group>[]>([]);
    const groupListContainer = ref<HTMLDivElement>();
    const skip = ref(0);
    const allGroups = ref(false);
    const newGroupModal = ref<InstanceType<typeof NewGroupModal>>();
    const myGroupsOpen = ref(false);
    const followingGroupsOpen = ref(false);

    function updateTake([entry]: any) {
      if (takeStateGroups.take < 200) {
        const { width } = entry.contentRect;

        takeStateGroups.take = Math.floor(width / 260);
      }
    }

    useResizeObserver(groupListContainer, (entries) => {
      updateTake(entries);
    });

    const { onResult, loading: recoGroupsLoading } = useGroupsQuery(() => ({
      take: takeStateGroups.take,
      skip: skip.value,
    }));

    function toggleGroups(): void {
      if (!allGroups.value) {
        takeStateGroups.take = 200;
        allGroups.value = !allGroups.value;
      } else {
        const { width } = groupListContainer.value?.getBoundingClientRect()!;
        takeStateGroups.take = Math.floor(width / 260);
        allGroups.value = !allGroups.value;
      }
    }

    onResult(({ data }) => {
      groups.value = data.groups;
    });

    const { result, loading: myGroupsLoading } = useMyGroupsQuery();
    const myGroups = useResult(result, null, (data) => data.myGroups);

    const { result: groupsResult, loading: followingGroupsLoading } = useFollowingGroupsQuery();
    const followingGroups = useResult(groupsResult, null, (data) => data.followingGroups);


    return {
      groups,
      toggleGroups,
      newGroupModal,
      groupListContainer,
      myGroups,
      myGroupsOpen,
      myGroupsLoading,
      followingGroups,
      followingGroupsOpen,
      followingGroupsLoading,
      recoGroupsLoading,

    };
  },
});
</script>

<style></style>
