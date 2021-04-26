<template>
  <div id="group" class="flex h-full">
    <div
      class="flex h-full items-center flex-1 bg-white dark:bg-dark700 flex-col rounded-t-2xl border-t-2 border-r-2 py-1 pt-2 pr-0.5 border-dark-600"
    >
      <infinite-scroll-wrapper :queryLoading="loading" @loadMore="loadMore()" class="overflow-y-auto p-4 py-3">
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
          <!-- <div class="dark:bg-dark-600 bg-gray-100 dark:text-gray-50 mt-4 w-1/3 rounded-xl items-center justify-center h-96 hidden lg:flex">
            <div class="">SIDEPANEL RIGHT</div>
          </div> -->
        </div>
      </infinite-scroll-wrapper>
    </div>

    <div class="h-full hidden lg:flex w-80">
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
import { defineComponent, ref, defineAsyncComponent, watch, computed, PropType } from 'vue';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import GroupHeader from '../components/Group/GroupHeader.vue';
import GroupPermissionContainer from '../components/Group/GroupPermissionContainer.vue';
import GroupEntry from '../components/Group/GroupEntry.vue';

export enum GroupComponents {
  GROUP_FEED = 'GroupFeed',
  GROUP_ABOUT = 'GroupAbout',
}

export default defineComponent({
  components: {
    PostList,
    InfiniteScrollWrapper,
    GroupHeader,
    GroupFeed: defineAsyncComponent(() => import('../components/Group/GroupFeed.vue')),
    GroupFeedPlaceholder: defineAsyncComponent(() => import('../components/Group/GroupFeedPlaceholder.vue')),
    GroupUserSidebar: defineAsyncComponent(() => import('../components/Group/GroupUserSidebar.vue')),
    GroupAbout: defineAsyncComponent(() => import('../components/Group/GroupAbout.vue')),
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
      switch (comp) {
        case GroupComponents.GROUP_FEED:
          activeComponent.value = comp;
          break;
        case GroupComponents.GROUP_ABOUT:
          activeComponent.value = comp;
          break;
      }
    };

    return { activeComponent, switchComponent, groupPermission, groupState, GroupType };
  },
});
</script>

<style></style>
