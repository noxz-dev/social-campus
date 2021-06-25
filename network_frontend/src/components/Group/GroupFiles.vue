<template>
  <div class="pb-40 pt-20">
    <div v-for="file in files" :key="file.id">
      <div class="text-gray-900 dark:text-gray-50 p-5 rounded-xl bg-dark-400">
        {{ file.name }}
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useMediaFromGroupQuery } from '../../graphql/generated/types';
import { defineComponent } from 'vue';
import { useResult } from '@vue/apollo-composable';
import { useRoute } from 'vue-router';
export default defineComponent({
  props: {},
  setup() {
    const route = useRoute();
    const {result } = useMediaFromGroupQuery(() => ({
      groupId: route.params.id as string
    }))
    const files = useResult(result, [], data => data.mediaFromGroup);
    return { files };
  },
});
</script>
<style></style>
