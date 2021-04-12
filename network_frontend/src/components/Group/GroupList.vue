<template>
  <div class="w-full justify-center flex">
    <div class="pt-4 md:px-6 w-full">
      <div class="flex gap-3 flex-wrap">
        <div v-for="group in groups" :key="group.id" class="xl:w-64 md:w-72 w-full">
          <group-card :group="group"></group-card>
        </div>
      </div>
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
