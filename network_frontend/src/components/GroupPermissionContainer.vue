<template>
  <slot v-if="isAllowed"></slot>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCheckGroupAccessQuery } from '../graphql/generated/graphqlOperations';
import { CheckGroupAccessQueryVariables } from '../graphql/generated/types';

export default defineComponent({
  props: {
    groupId: String,
  },
  setup(props) {
    const isAllowed = ref(false);

    const { onResult } = useCheckGroupAccessQuery(
      () =>
        <CheckGroupAccessQueryVariables>{
          groupId: props.groupId,
        }
    );

    onResult(({ data }) => {
      isAllowed.value = data.checkGroupAccess;
    });

    return { isAllowed };
  },
});
</script>
<style></style>
