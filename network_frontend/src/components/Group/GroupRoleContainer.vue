<template>
  <slot v-if="isAllowed"></slot>
</template>
<script lang="ts">
import { GroupRoles, useCheckGroupRoleAccessQuery } from '../../graphql/generated/types';
import { defineComponent, PropType } from 'vue';
import { useResult } from '@vue/apollo-composable';

export default defineComponent({
  props: {
    groupId: { type: String, required: true },
    role: { type: String as PropType<GroupRoles>, required: true },
  },
  setup(props) {
    //check if the user has the needed permission to view this content
    const { result } = useCheckGroupRoleAccessQuery(() => ({
      groupId: props.groupId,
      groupRole: props.role,
    }));

    const isAllowed = useResult(result, false, (data) => data.checkGroupRoleAccess.isAllowed);

    return { isAllowed };
  },
});
</script>
<style></style>
