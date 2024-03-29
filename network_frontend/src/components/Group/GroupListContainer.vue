<template>
  <div class="mt-10 p-4 pb-2 w-full dark:bg-dark-600 bg-gray-200 rounded-xl dark:text-gray-50">
    <div>
      <div class="pb-2 flex justify-between px-4">
        <span class="text-lg md:text-xl font-semibold">{{ headerText }}</span>
      </div>
    </div>
    <div
      class="w-full p-1 flex flex-col"
      ref="groupListContainer"
      :class="groups && groups?.length === 0 && 'py-5 p-4'"
    >
      <div v-if="isLoading" class="flex gap-4 pb-5">
        <div v-for="index in numberOfPlaceholder" :key="index" class="xl:w-64 w-40 md:w-64 bg-dark-600 animate-pulse">
          <div class="w-full md:h-96 h-64 bg-dark-700 rounded-lg"></div>
        </div>
      </div>
      <div v-else class="w-full">
        <swiper
          v-if="groups && groups?.length > 0"
          :slides-per-view="6"
          :options="swiperOptions"
          :space-between="10"
          navigation
          scrollbar
          @reachEnd="onReachEnd"
          class="w-full mb-2 rounded-xl"
          :breakpoints="swiperOptions.breakpoints"
        >
          <swiper-slide v-for="group in groups" :key="group.id" class="xl:w-64 md:w-72 w-full pb-5">
            <group-card :group="group" :isMemberOfGroup="isMember"></group-card>
          </swiper-slide>
        </swiper>
        <div v-else class="font-semibold">{{ emptyText }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Group } from '../../graphql/generated/types';
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import GroupCard from './GroupCard.vue';
import breakpoints from '../../utils/breakpoints';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
export default defineComponent({
  emits: ['loadMore'],
  components: {
    Swiper,
    SwiperSlide,
    GroupCard,
  },
  props: {
    groups: {
      type: Object as PropType<Group[]>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    headerText: {
      type: String,
      required: true,
    },
    emptyText: {
      type: String,
      required: true,
    },
    isMember: {
      type: Boolean,
      default: false,
    },
  },

  setup(_, { emit }) {
    const swiperOptions = {
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
          scrollbar: { draggable: true },
        },
        770: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1023: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1600: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        2000: {
          slidesPerView: 8,
          spaceBetween: 10,
        },
      },
    };

    const numberOfPlaceholder = computed(() => (breakpoints.is === 'sm' ? 2 : 4));

    onMounted(() => {
      //fix a weird bug, where the scrollbar is not showing up
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 200);
    });

    //lazy load more groups when the scroll end is reached
    const onReachEnd = (event: any) => {
      emit('loadMore');
    };

    return { onReachEnd, swiperOptions, numberOfPlaceholder };
  },
});
</script>
<style>
.swiper-button-prev,
.swiper-button-next {
  color: white;
  @apply hidden md:block;
}

.swiper-button-disabled {
  display: none;
}
</style>
