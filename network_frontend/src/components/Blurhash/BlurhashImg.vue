<!-- Based on https://github.com/fpapado/blurhash-img -->

<template>
  <div class="h-0">
    <canvas
      ref="canvas"
      class="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
      width="32"
      :class="`rounded-${rounded}`"
      height="32"
    />
  </div>
</template>

<script lang="ts">
import { decode } from 'blurhash';
export default {
  props: {
    hash: {
      type: String,
      required: true,
    },
    aspectRatio: {
      type: Number,
      default: 1,
    },
    rounded: {
      type: String,
    },
  },
  mounted() {
    const pixels = decode(this.hash, 32, 32);
    const imageData = new ImageData(pixels, 32, 32);
    const context = this.$refs.canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);
  },
};
</script>
