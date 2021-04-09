<template>
  <card class="flex flex-col justify-center" bgColorDark="bg-dark500">
    <div class="p-1 pb-2 pt-2">
      <div class="p-2 h-80">
        <lazy-image class="rounded-xl object-cover w-full" src="https://picsum.photos/300/300" blurhash="AePC3PmlGv{c" />
      </div>
      <div class="p-3">
        <div>
          <span class="text-md">{{ group.name }}</span>
        </div>
        <div><span class="text-sm text-gray-400">Gruppe - 1k Mitglieder</span></div>
      </div>
      <div class="mt-4 mb-4 px-2">
        <button
          class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white dark:bg-dark-600 bg-gray-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
          @click="
            $router.push({
              name: 'Group',
              params: {
                id: group.id,
              },
            })
          "
        >
          <span>beitreten</span>
        </button>
      </div>
    </div>
  </card>
</template>

<script lang="ts">
import { Group } from '../../graphql/generated/types';
import { defineComponent, PropType } from 'vue';
import Card from '../Card/Card.vue';
import LazyImage from '../Blurhash/LazyImage.vue';
export default defineComponent({
  props: {
    group: {
      type: Object as PropType<Group>,
    },
  },
  components: { Card, LazyImage },
});
</script>
LazyImage

<style></style>
