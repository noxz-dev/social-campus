<template>
  <intersect
    @enter.once="onEnter"
    class="relative w-full h-full transform transiation duration-500"
    :class="isVisible ? 'translate-y-0' : 'translate-y-8'"
  >
    <div class="flex items-center justify-center w-full h-full">
      <!-- Show the placeholder as background -->
      <blurhash-img
        :hash="blurhash"
        :aspect-ratio="height / width"
        class="transition-opacity duration-500 w-full"
        :class="isLoaded ? 'opacity-0' : 'opacity-100'"
      />

      <!-- Show the real image on the top and fade in after loading -->
      <img
        ref="image"
        v-bind="$attrs"
        class="absolute transition-opacity duration-500 w-full h-full object-cover"
        :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      />
    </div>
  </intersect>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import intersect from '../VueIntersect.vue';
// import { loadProxyImage } from '../../utils/loadProxyImage';
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
  },
  setup(props) {
    const image = ref(null);
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
    });
    const onEnter = async () => {
      isVisible.value = true;
      const imageData = props.src;
      //   image.value.src = imageData;
      image.value.onload = () => {
        isLoaded.value = true;
      };
    };
    return { onEnter, image, isVisible, isLoaded, isHorizontal };
  },
});
</script>
