<template>
  <slot v-if="isAllowed"></slot>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCheckGroupAccessQuery } from '../../graphql/generated/graphqlOperations';
import { CheckGroupAccessQueryVariables } from '../../graphql/generated/types';

export default defineComponent({
  props: {
    groupId: String,
  },
  setup(props) {
    const isAllowed = ref(false);

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
        isAllowed.value = data.checkGroupAccess;
      }
    });

    onError(() => {
      console.log('error');
    });

    return { isAllowed, update };
  },
});
</script>
<style></style>
