<template>
  <card v-if="user.id">
    <div class="flex items-center">
      <div class="h-10 rounded-full ml-2">
        <lazy-image
          class="h-10 w-10 !rounded-full bg-dark-700 object-cover"
          :src="user.avatar.name"
          blurhash="AePC3PmlGv{c"
          :onLoad="true"
        />
      </div>
      <div
        @click="$router.push({ name: 'Profile', params: { id: user.username } })"
        class="cursor-pointer px-2 dark:text-gray-50 text-gray-900 flex-1"
      >
        <div class="flex flex-col">
          <span class="truncate">{{ user.firstname + ' ' + user.lastname + ' ' }}</span>
          <span class="text-xs font-medium">@{{ user.username }}</span>
        </div>
      </div>
      <app-button class="mr-2 rounded-xl"><span class="!text-xs">Folgen</span></app-button>
    </div>
  </card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style></style>
