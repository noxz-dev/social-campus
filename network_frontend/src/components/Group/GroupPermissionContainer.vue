<template>
  <slot v-if="groupState?.isMember || groupState?.type === GroupType.Public" name="isMemberAndPublic"></slot>
  <slot v-else name="isNoMember"></slot>
  <slot name="onlyMember" v-if="groupState?.isMember"></slot>
  <slot name="public" v-if="groupState?.type === GroupType.Public && !groupState.isMember"></slot>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCheckGroupAccessQuery } from '../../graphql/generated/types';
import { CheckGroupAccessQueryVariables, GroupState, GroupType } from '../../graphql/generated/types';

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

    const update = () => {
      refetch();
    };

    onResult(({ data }) => {
      if (data) {
        groupState.value = data.checkGroupAccess;
      }
    });

    onError(() => {
      console.log('error');
    });

    return { groupState, update, GroupType };
  },
});
</script>
<style></style>
