<template>
  <card id="postcard" bgColorDark="bg-dark-600">
    <card-header-placeholder />
    <div class="px-4">
      <div class="text-sm bg-dark-500 p-10 rounded-xl px-2 mr-1 mb-3"></div>
      <div class="flex items-center justify-between p-2 pb-3 cursor-default">
        <div class="flex">
          <div class="flex cursor-pointer h-6">
            <div class="px-5 bg-dark-500 rounded-xl"></div>
          </div>
          <div class="flex cursor-pointer">
            <div class="px-5 ml-2 bg-dark-500 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Card from '../Card/Card.vue';
import CardHeaderPlaceholder from '../Card/CardHeaderPlaceholder.vue';

dayjs.extend(relativeTime);

export default defineComponent({
  components: { Card, CardHeaderPlaceholder },
});
</script>

<style></style>
