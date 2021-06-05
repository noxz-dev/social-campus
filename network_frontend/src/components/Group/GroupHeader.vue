<template>
  <div class="flex flex-col dark:bg-dark-600 bg-gray-100 p-6 items-center w-full rounded-xl">
    <div class="bg-pink-300 w-full rounded-xl h-72">
      <lazy-image src="" blurhash="AePC3PmlGv{c" :onLoad="false" />
    </div>
    <div class="w-full mt-6 py-10 flex flex-col md:flex-row justify-between">
      <div class="flex flex-col w-full">
        <div class="flex justify-between flex-col md:flex-row w-full">
          <div id="groupNameWrapper" class="w-[80%]">
            <div v-if="group" class="text-xl font-semibold dark:text-gray-50 text-gray-900 break-words">
              <span>{{ group.name }}</span>
            </div>
            <div class="flex flex-col md:flex-row">
              <div class="text-lg font-semibold dark:text-gray-400 text-gray-900" v-if="group">
                <span v-if="group.type === 'PRIVATE'">Private </span>
                <span v-else>Öffentliche </span>
                <span>Gruppe</span>
              </div>
              <div class="w-1"></div>
              <div class="text-lg font-semibold dark:text-gray-400 text-gray-900">
                ·
                <span>
                  {{ numberFormatter(numberOfMembers) }} <span v-if="numberOfMembers === 1">Mitglied</span>
                  <span v-else>Mitglieder</span>
                </span>
              </div>
            </div>
          </div>
          <div class="flex h-full items-center justify-center mb-2">
            <div class="ml-0 md:ml-10 w-full mt-5 md:mt-0">
              <group-permission-container :groupId="groupId">
                <template v-slot:onlyMember>
                  <div class="flex flex-col">
                    <app-button
                      class="w-full items-center justify-center mt-2"
                      @click="$refs.groupSettingsModal.openModal()"
                    >
                      <svg
                        class="h-6 w-6 mr-2"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                      >
                        <g
                          id="Iconly/Light/Edit"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <g id="Edit" transform="translate(3.000000, 3.000000)" stroke="#fff" stroke-width="1.5">
                            <line x1="10.7473996" y1="17.4429051" x2="18" y2="17.4429051" id="Stroke-1"></line>
                            <path
                              d="M9.7800071,0.794792587 C10.5556498,-0.132213323 11.949987,-0.268144478 12.8962256,0.491732963 C12.9485416,0.532957985 14.6294799,1.83878843 14.6294799,1.83878843 C15.6689776,2.46719147 15.9919725,3.80310504 15.3493946,4.8225887 C15.3152754,4.877184 5.81194644,16.7644749 5.81194644,16.7644749 C5.49577537,17.1588981 5.01583223,17.3917638 4.50290722,17.3973347 L0.863527997,17.4430165 L0.0435303654,13.9723153 C-0.0713375414,13.4843002 0.0435303654,12.9717729 0.359701436,12.5773497 L9.7800071,0.794792587 Z"
                              id="Stroke-3"
                            ></path>
                            <line x1="8.02082217" y1="3.00088838" x2="13.4730672" y2="7.18801364" id="Stroke-5"></line>
                          </g>
                        </g>
                      </svg>
                      <span class="text-md">Bearbeiten</span>
                    </app-button>
                  </div>
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

        <div class="dark:text-gray-50 text-gray-900 my-2 break-words">{{ group?.description }}</div>
      </div>
    </div>
    <div class="w-full mt-6 py-4 text-lg font-semibold dark:text-gray-50 text-gray-900">
      <div class="flex sm:space-x-10 space-x-0 sm:space-y-0 sm:flex-row w-full justify-between md:justify-start">
        <div
          class="py-1 pr-2 rounded-lg cursor-pointer"
          @click="$emit('switchComponent', GroupComponents.GROUP_ABOUT)"
          :class="{ 'bg-brand-500 !text-gray-50 ': activeComponent == GroupComponents.GROUP_ABOUT }"
        >
          <span class="">Über</span>
        </div>
        <div
          class="py-1 px-2 rounded-lg cursor-pointer"
          @click="$emit('switchComponent', GroupComponents.GROUP_FEED)"
          :class="{ 'bg-brand-500 !text-gray-50  ': activeComponent == GroupComponents.GROUP_FEED }"
        >
          <span class="dark:text-gray-50">Feed</span>
          <span class="ml-2 font-medium">{{ numberFormatter(numberOfPosts) }}</span>
        </div>

        <div
          class="py-1 px-2 rounded-lg cursor-pointer"
          @click="$emit('switchComponent', GroupComponents.GROUP_FILES)"
          :class="{ 'bg-brand-500 !text-gray-50  ': activeComponent == GroupComponents.GROUP_FILES }"
        >
          <span class="dark:text-gray-50 text-gray-900">Dateien</span>
        </div>
        <div
          v-if="breakpoints.is === 'sm'"
          class="py-1 pl-2 rounded-lg cursor-pointer"
          @click="$emit('switchComponent', GroupComponents.GROUP_MEMBER)"
          :class="{ 'bg-brand-500 !text-gray-50  ': activeComponent == GroupComponents.GROUP_MEMBER }"
        >
          <span class="dark:text-gray-50 text-gray-900">Mitglieder</span>
        </div>
      </div>
    </div>
    <modal ref="groupSettingsModal" headerText="Gruppe bearbeiten">
      <group-edit :group="group" @close="$refs.groupSettingsModal.closeModal()"></group-edit>
    </modal>
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
import { state } from '../../utils/state';
import GroupEdit from './GroupEdit.vue';
import Modal from '../../components/Modal.vue';
import InputField from '../../components/Form/InputField.vue';
import CustomSelect from '../../components/Form/CustomSelect.vue';
import { GroupRoles } from '../../graphql/generated/types';
import breakpoints from '../../utils/breakpoints';

export default defineComponent({
  components: { LazyImage, GroupPermissionContainer, Modal, InputField, CustomSelect, GroupEdit },
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
      await joinGrp();
      state.refreshGroup = true;
    };

    return {
      numberFormatter,
      GroupComponents,
      numberOfPosts,
      numberOfMembers,
      group,
      joinGroup,
      GroupRoles,
      breakpoints,
    };
  },
});
</script>
