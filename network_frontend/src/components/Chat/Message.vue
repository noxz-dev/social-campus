<template>
  <div class="w-full">
    <div class="flex mb-2 w-full" :class="positionRight ? 'justify-end' : 'justify-start'">
      <div>
        <div
          v-if="positionRight"
          class="mr-2 max-w-xs md:max-w-xl bg-brand-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-xl text-white"
        >
          <div v-if="media" class="relative xl:min-w-[36rem] min-w-[20rem]">
            <div class="aspect-ratio-4/3"></div>
            <lazy-image
              class="rounded-tl-2xl absolute left-0 top-0 w-full h-full object-cover rounded-tr-xl cursor-pointer"
              :src="media.name"
              :blurhash="media.blurhash"
              v-viewer="viewerOptions"
            />
          </div>
          <div class="p-2">
            <span class="break-words p-2">{{ message }}</span>
            <span class="ml-2 text-[0.7rem] text-gray-300 float-right pt-1">{{
              dayjs(createdAt).format('HH:mm')
            }}</span>
          </div>
        </div>
        <div v-else class="mr-2 max-w-xl bg-gray-500 rounded-br-2xl rounded-tl-2xl rounded-tr-xl text-white">
          <div v-if="media" class="relative xl:min-w-[36rem] min-w-[20rem]">
            <div class="aspect-ratio-4/3"></div>
            <lazy-image
              class="rounded-tl-2xl absolute left-0 top-0 w-full h-full object-cover rounded-tr-xl cursor-pointer"
              :src="media.name"
              :blurhash="media.blurhash"
              v-viewer="viewerOptions"
            />
          </div>
          <div class="p-2">
            <span class="break-words p-2">{{ message }}</span>
            <span class="ml-2 text-[0.7rem] text-gray-300 float-right pt-1">{{
              dayjs(createdAt).format('HH:mm')
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import LazyImage from '../../components/Blurhash/LazyImage.vue';
export default defineComponent({
  components: {
    LazyImage,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    positionRight: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    media: {
      type: Object,
    },
  },
  setup() {
    const viewerOptions = {
      inline: false,
      button: false,
      navbar: false,
      title: false,
      toolbar: false,
      tooltip: false,
      movable: false,
      zoomable: false,
      rotatable: false,
      scalable: false,
      transition: true,
      fullscreen: true,
    };
    return {
      dayjs,
      viewerOptions,
    };
  },
});
</script>
<style></style>
