<template>
  <slot v-if="groupState?.isMember || groupState?.type === GroupType.Public" name="isMemberAndPublic"></slot>
  <slot v-else name="isNoMember"></slot>
  <slot name="onlyMember" v-if="groupState?.isMember"></slot>
  <slot name="public" v-if="groupState?.type === GroupType.Public && !groupState.isMember"></slot>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useCheckGroupAccessQuery } from '../../graphql/generated/types';
import { CheckGroupAccessQueryVariables, GroupState, GroupType } from '../../graphql/generated/types';
import { state } from '../../utils/state';

export default defineComponent({
  props: {
    groupId: String,
  },
  setup(props) {
    const groupState = ref<GroupState>();

    const { onResult, onError, refetch } = useCheckGroupAccessQuery(
      () =>
        <CheckGroupAccessQueryVariables>{
          groupId: props.groupId,
        }
    );

    //refreshes the content of the group if the state is set
    watch(
      () => state.refreshGroup,
      async () => {
        await refetch();
        state.refreshGroup = false;
      }
    );

    //validates the access permissions for a given group
    onResult(({ data }) => {
      if (data) {
        groupState.value = data.checkGroupAccess;
      }
    });

    //sets the error state of the group
    onError(() => {
      console.log('error');
      state.groupError = true;
    });

    return { groupState, GroupType };
  },
});
</script>
<style></style>
