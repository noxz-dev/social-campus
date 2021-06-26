<template>
  <div class="w-full pb-20 md:pb-0">
    <div v-for="file in files" :key="file.id" class="my-4">
      <div
        class="
          grid
          text-gray-900
          dark:text-gray-50
          p-5
          content-center
          gap-2
          rounded-xl
          bg-dark-400
          grid-cols-2 grid-rows-2 grid-flow-col
          md:flex md:flex-row md:justify-between md:items-center
        "
      >
        <div v-if="file.type === 'IMAGE'" class="w-12 h-12">
          <lazy-image class="rounded-lg" :blurhash="file.blurhash" :src="file.name" rounded="lg"></lazy-image>
        </div>
        <div v-else>
          <svg
            class="w-10 h-10 dark:stroke-white stroke-black"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.7367 2.7619H8.08369C6.02469 2.7619 4.24969 4.4309 4.24969 6.4909V17.2039C4.24969 19.3799 5.90869 21.1149 8.08369 21.1149H16.0727C18.1327 21.1149 19.8017 19.2649 19.8017 17.2039V8.0379L14.7367 2.7619Z"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.474 2.75021V5.65921C14.474 7.07921 15.623 8.23121 17.042 8.23421C18.359 8.23721 19.706 8.23821 19.797 8.23221"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M14.284 15.5578H8.88699" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.2425 10.6056H8.88651" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div>
          {{ file.createdByName }}
        </div>
        <div>{{ file.name.split('.')[1].toUpperCase() }}</div>
        <div>{{ formattedDate(file.createdAt) }}</div>
        <div class="row-span-2 flex items-center">
          <div
            role="button"
            tabindex="0"
            @keydown.enter="downloadFile"
            class="p-2 border dark:border-white border-black rounded-full hover:opacity-50 r"
            @click="downloadFile"
          >
            <svg
              class="dark:stroke-white stroke-black w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.7364 2.7619H8.08443C6.02543 2.7619 4.25043 4.4309 4.25043 6.4909V17.2279C4.25043 19.4039 5.90843 21.1149 8.08443 21.1149H16.0724C18.1324 21.1149 19.8024 19.2879 19.8024 17.2279V8.0379L14.7364 2.7619Z"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.4738 2.75021V5.65921C14.4738 7.07921 15.6228 8.23121 17.0428 8.23421C18.3588 8.23721 19.7058 8.23821 19.7968 8.23221"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M11.6407 16.0138V9.44083" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M8.80231 13.1632L11.6403 16.0142L14.4793 13.1632"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useMediaFromGroupQuery } from '../../graphql/generated/types';
import { defineComponent } from 'vue';
import { useResult } from '@vue/apollo-composable';
import { useRoute } from 'vue-router';
import LazyImage from '../../components/Blurhash/LazyImage.vue';
import dayjs from 'dayjs';
import { loadProxyFile, loadProxyImage } from '../../utils/loadProxyImage';
export default defineComponent({
  components: { LazyImage },
  props: {},
  setup() {
    const route = useRoute();
    const { result } = useMediaFromGroupQuery(() => ({
      groupId: route.params.id as string,
    }));

    const formattedDate = (date: string) => {
      return dayjs(date).format('ddd DD. MMM YYYY HH:mm');
    };

    const downloadFile = async (name: string) => {
      const link = document.createElement('a');
      link.href = await loadProxyFile(name);
      link.download = name;
      link.click();
      URL.revokeObjectURL(link.href);
    };

    const downloadImage = async (name: string) => {
      const link = document.createElement('a');
      link.href = await loadProxyImage(name);
      link.download = name;
      link.click();
      URL.revokeObjectURL(link.href);
    };

    const files = useResult(result, [], (data) => data.mediaFromGroup);
    return { files, formattedDate };
  },
});
</script>
<style></style>
