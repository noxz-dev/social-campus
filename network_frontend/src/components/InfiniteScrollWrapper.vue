<template>
  <div class="w-full flex items-center flex-col" id="scrollContainer" ref="scrollContainer">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  props: {
    queryLoading: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['loadMore'],
  setup(props, { emit }) {
    const scrollContainer = ref<HTMLElement>();
    const loadStarted = ref(false);

    watch(
      () => props.queryLoading,
      () => {
        loadStarted.value = props.queryLoading;
      }
    );

    /**
     * triggers a scroll event if the end is reached, used for lazy loading
     */
    const handleScroll = () => {
      if (scrollContainer.value) {
        const element: HTMLElement = scrollContainer.value;
        if (element?.scrollTop > element.scrollHeight - 1500) {
          if (!loadStarted.value) {
            loadStarted.value = true;
            emit('loadMore');
          }
        }
      }
    };

    //register the scroll listener
    onMounted(() => {
      document.querySelector('#scrollContainer')?.addEventListener('scroll', handleScroll);
    });

    return {
      scrollContainer,
    };
  },
});
</script>

<style></style>
