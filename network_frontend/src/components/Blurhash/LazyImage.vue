<template>
  <intersect @enter.once="onEnter" class="relative w-full h-full transform transiation duration-500">
    <div class="flex items-center justify-center w-full h-full">
      <blurhash-img
        :hash="blurhash"
        :aspect-ratio="height / width"
        class="transition-opacity duration-500 w-full"
        :class="isLoaded ? `opacity-0` : `opacity-100`"
        :rounded="rounded"
      />

      <img
        ref="image"
        alt="image, possibly profile or post content"
        v-bind="$attrs"
        class="absolute transition-opacity duration-500 w-full h-full object-cover"
        :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      />
    </div>
  </intersect>
</template>

<script lang="ts">
import { loadProxyImage } from '../../utils/loadProxyImage';
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import intersect from '../VueIntersect.vue';
import BlurhashImg from './BlurhashImg.vue';
export default defineComponent({
  components: {
    BlurhashImg,
    intersect,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    blurhash: {
      type: String,
      required: false,
      default: null,
    },
    width: {
      type: Number,
      default: 1,
    },
    height: {
      type: Number,
      default: 1,
    },
    onLoad: {
      type: Boolean,
      default: true,
    },
    rounded: {
      type: String,
      default: 'xl',
    },
  },
  setup(props) {
    const image = ref<HTMLImageElement>();
    const isVisible = ref(true);
    const isLoaded = ref(false);
    const isHorizontal = computed(() => {
      return props.height / props.width >= 1;
    });

    onMounted(() => {
      const imageBoundingBox = image.value.getBoundingClientRect();
      if (imageBoundingBox.bottom > window.innerHeight) {
        isVisible.value = false;
      }

      watch(
        () => props.src,
        () => {
          onEnter();
        }
      );
    });

    /** 
      replace placeholder with the real image
    */
    const onEnter = async () => {
      isVisible.value = true;

      if (props.onLoad) image.value.src = await loadProxyImage(props.src);
      image.value.onload = () => {
        isLoaded.value = true;
      };
    };
    return { onEnter, image, isVisible, isLoaded, isHorizontal };
  },
});
</script>
