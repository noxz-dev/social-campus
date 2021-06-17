<template>
  <div id="group" class="flex h-full">
    <div
      class="
        flex
        h-full
        flex-1
        lg:w-[80%]
        w-full
        items-center
        bg-white
        dark:bg-dark-700
        flex-col
        rounded-t-2xl
        border-t-2 border-r-2
        py-1
        pt-2
        pr-0.5
        border-dark-600
      "
    >
      <infinite-scroll-wrapper :queryLoading="loading" @loadMore="() => {}" class="overflow-y-auto p-4 py-3">
        <group-header
          :groupId="$route.params.id"
          @switchComponent="switchComponent($event)"
          :activeComponent="activeComponent"
          :groupState="groupState"
        />
        <div class="flex w-full">
          <div class="w-full flex justify-center">
            <group-permission-container :groupId="$route.params.id" ref="groupPermission">
              <template v-slot:isMemberAndPublic>
                <component :is="activeComponent" />
              </template>
              <template v-slot:isNoMember>
                <component :is="activeComponent + 'Placeholder'" />
              </template>
            </group-permission-container>
          </div>
        </div>
      </infinite-scroll-wrapper>
    </div>

    <div class="h-full hidden lg:flex min-w-[22rem]">
      <group-permission-container :groupId="$route.params.id">
        <template v-slot:isMemberAndPublic>
          <group-user-sidebar />
        </template>
        <template v-slot:isNoMember>
          <group-user-sidebar-placeholder />
        </template>
      </group-permission-container>
    </div>
    <group-entry v-if="!groupState?.isMember && groupState?.type === GroupType.Private" :groupId="$route.params.id" />
  </div>
</template>

<script lang="ts">
import PostList from '../components/Post/PostList.vue';
import { GroupType } from '../graphql/generated/types';
import { defineComponent, ref, defineAsyncComponent, computed } from 'vue';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import GroupPermissionContainer from '../components/Group/GroupPermissionContainer.vue';
import GroupEntry from '../components/Group/GroupEntry.vue';

export enum GroupComponents {
  GROUP_FEED = 'GroupFeed',
  GROUP_ABOUT = 'GroupAbout',
  GROUP_FILES = 'GroupFiles',
  GROUP_MEMBER = 'GroupUserSidebar',
}

export default defineComponent({
  components: {
    PostList,
    InfiniteScrollWrapper,
    GroupHeader: defineAsyncComponent(() => import('../components/Group/GroupHeader.vue')),
    GroupFeed: defineAsyncComponent(() => import('../components/Group/GroupFeed.vue')),
    GroupFeedPlaceholder: defineAsyncComponent(() => import('../components/Group/GroupFeedPlaceholder.vue')),
    GroupUserSidebar: defineAsyncComponent(() => import('../components/Group/GroupUserSidebar.vue')),
    GroupAbout: defineAsyncComponent(() => import('../components/Group/GroupAbout.vue')),
    GroupFiles: defineAsyncComponent(() => import('../components/Group/GroupFiles.vue')),
    GroupPermissionContainer,
    GroupEntry,
    GroupUserSidebarPlaceholder: defineAsyncComponent(
      () => import('../components/Group/GroupUserSidebarPlaceholder.vue')
    ),
  },
  setup() {
    const activeComponent = ref<GroupComponents>(GroupComponents.GROUP_FEED);
    const groupPermission = ref<InstanceType<typeof GroupPermissionContainer>>();
    const groupState = computed(() => groupPermission.value?.groupState);

    const switchComponent = (comp: GroupComponents) => {
      activeComponent.value = comp;
    };

    return { activeComponent, switchComponent, groupPermission, groupState, GroupType };
  },
});
</script>

<style></style>
