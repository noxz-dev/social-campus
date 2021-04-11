<template>
  <div class="w-full pt-4 flex flex-wrap gap-3 justify-center">
    <div v-for="group in groups" :key="group.id" class="xl:w-64 md:w-72 w-full">
      <group-card :group="group"></group-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GroupCard from './GroupCard.vue';

export default defineComponent({
  components: { GroupCard },
  props: {
    groups: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style></style>
