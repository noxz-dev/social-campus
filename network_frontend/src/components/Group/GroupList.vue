<template>
  <div class="w-full justify-center flex">
    <div class="pt-1 md:px-4 w-full">
      <div class="flex gap-4 flex-wrap">
        <div v-for="group in groups" :key="group.id" class="xl:w-64 md:w-72 w-full">
          <group-card :group="group" :isMemberOfGroup="isMemberOfGroup"></group-card>
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
    isMemberOfGroup: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style></style>
