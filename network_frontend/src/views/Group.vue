<template>
  <div class="flex h-full">
    <div
      class="flex h-full items-center flex-1 bg-white dark:bg-dark700 flex-col rounded-t-2xl border-t-2 border-r-2 py-1 pt-2 pr-0.5 border-dark-600"
    >
      <infinite-scroll-wrapper :queryLoading="loading" @loadMore="loadMore()" class="overflow-y-auto p-4 py-3">
        <group-header :groupId="$route.params.id" @switchComponent="switchComponent($event)" :activeComponent="activeComponent" />
        <div class="flex w-full">
          <div class="w-full flex justify-center">
            <group-permission-container :groupId="$route.params.id" ref="groupPermission">
              <component :is="activeComponent" />
            </group-permission-container>
            <div v-if="!isAllowed" class="w-full flex justify-center">
              <group-entry />
            </div>
          </div>
          <!-- <div class="dark:bg-dark-600 bg-gray-100 dark:text-gray-50 mt-4 w-1/3 rounded-xl items-center justify-center h-96 hidden lg:flex">
            <div class="">SIDEPANEL RIGHT</div>
          </div> -->
        </div>
      </infinite-scroll-wrapper>
    </div>

    <div class="h-full hidden lg:flex w-80">
      <group-user-sidebar />
    </div>
  </div>
</template>

<script lang="ts">
import PostList from '../components/Post/PostList.vue';
import { useGetPostsFromGroupQuery } from '../graphql/generated/graphqlOperations';
import { GetPostsFromGroupQueryVariables } from '../graphql/generated/types';
import { defineComponent, ref, defineAsyncComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import InfiniteScrollWrapper from '../components/InfiniteScrollWrapper.vue';
import GroupHeader from '../components/Group/GroupHeader.vue';
import GroupUserSidebar from '../components/Group/GroupUserSidebar.vue';
import GroupPermissionContainer from '../components/Group/GroupPermissionContainer.vue';
import GroupEntry from '../components/Group/GroupEntry.vue';

export enum GroupComponents {
  GROUP_FEED = 'GroupFeed',
  GROUP_WIKI = 'GroupWiki',
}

export default defineComponent({
  components: {
    PostList,
    InfiniteScrollWrapper,
    GroupHeader,
    GroupFeed: defineAsyncComponent(() => import('../components/Group/GroupFeed.vue')),
    GroupUserSidebar,
    GroupPermissionContainer,
    GroupEntry,
  },
  setup() {
    const posts = ref([]);
    const activeComponent = ref<GroupComponents>(GroupComponents.GROUP_FEED);
    const take = ref(3);
    const route = useRoute();
    const skip = ref(0);
    const groupPermission = ref<InstanceType<typeof GroupPermissionContainer>>();
    const isAllowed = ref<Boolean | undefined>(false);
    isAllowed.value = groupPermission.value?.isAllowed;

    watch(
      () => groupPermission.value?.isAllowed,
      () => {
        isAllowed.value = groupPermission.value?.isAllowed;
      }
    );

    const { onResult } = useGetPostsFromGroupQuery(
      () =>
        <GetPostsFromGroupQueryVariables>{
          groupId: route.params.id,
        }
    );

    const switchComponent = (comp: GroupComponents) => {
      switch (comp) {
        case GroupComponents.GROUP_FEED:
          activeComponent.value = comp;
          break;
        case GroupComponents.GROUP_WIKI:
          activeComponent.value = comp;
          break;
      }
    };

    onResult(({ data }) => {
      posts.value = data.getPostsFromGroup;
    });

    return { posts, activeComponent, switchComponent, groupPermission, isAllowed };
  },
});
</script>

<style></style>
