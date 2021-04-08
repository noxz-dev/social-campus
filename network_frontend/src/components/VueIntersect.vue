<template>
  <div ref="slot">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, PropType, ref } from 'vue';
export default defineComponent({
  name: 'intersect',
  abstract: true,
  props: {
    threshold: {
      type: Array as PropType<number[]>,
      required: false,
      default: () => [0, 0.2],
    },
    root: {
      type: typeof HTMLElement !== 'undefined' ? HTMLElement : Object,
      required: false,
      default: null,
    },
    rootMargin: {
      type: String,
      required: false,
      default: () => '0px 0px 0px 0px',
    },
  },
  setup(props, { emit }) {
    const slot = ref<HTMLDivElement>();
    let observer: IntersectionObserver;
    onMounted(() => {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) {
            emit('leave', [entries[0]]);
          } else {
            emit('enter', [entries[0]]);
          }
          emit('change', [entries[0]]);
        },
        {
          threshold: props.threshold,
          root: props.root,
          rootMargin: props.rootMargin,
        }
      );
      nextTick(() => {
        if (!slot.value) {
          return;
        }
        observer.observe(slot.value);
      });
    });
    onUnmounted(() => {
      emit('destroyed');
      observer.disconnect();
    });
    return {
      slot,
    };
  },
});
</script>
