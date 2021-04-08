<template>
  <div class="w-full pt-4 flex flex-wrap gap-3">
    <div v-for="group in groups" :key="group.id" class="w-full md:w-auto">
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
      required: true
    }
  }
})
</script>

<style>

</style>