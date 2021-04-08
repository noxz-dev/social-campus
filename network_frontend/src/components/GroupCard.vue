<template>
  <card class="xl:w-80 w-full flex flex-col justify-center" bgColorDark="bg-dark500">
    <div class="p-1 pb-2 pt-2">
      <div class="p-2">
        <img class="rounded-xl object-cover h-52 w-full" src="https://picsum.photos/300/300" alt="" />
      </div>
      <div class="p-3">
        <div><span class="text-md">{{ group.name}}</span></div>
        <div><span class="text-sm text-gray-400">Gruppe - 1k Mitglieder</span></div>
      </div>
      <div class="mt-4 mb-4 px-2">
        <button
          class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white dark:bg-dark-600 bg-gray-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
          @click="post"
        >
          <span>beitreten</span>
        </button>
      </div>
    </div>
  </card>
</template>

<script lang="ts">
import { Group } from 'src/graphql/generated/types';
import { defineComponent, PropType } from 'vue';
import Card from './Card.vue';
export default defineComponent({
  props: {
    group: {
      type: Object as PropType<Group>
    }
  },
  components: { Card },
});
</script>

<style></style>
