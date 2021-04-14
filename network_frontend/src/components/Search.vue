<template>
  <div class="relative" ref="target">
    <input-field
      @click="isFocus = true"
      v-model="searchString"
      :iconPadding="2"
      inputClasses="text-sm md:text-md pl-10"
      placeholder="Suche nach Usern, Tags oder Gruppen"
    >
      <template v-slot:icon>
        <svg class="h-6 w-6 dark:fill-white fill-dark700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.6115 2C6.30323 2 2 6.20819 2 11.3993C2 16.5903 6.30323 20.7985 11.6115 20.7985C13.8819 20.7985 15.9684 20.0287 17.613 18.7415L20.7371 21.7886L20.8202 21.8586C21.1102 22.0685 21.5214 22.0446 21.7839 21.7873C22.0726 21.5043 22.072 21.0459 21.7825 20.7636L18.6952 17.7523C20.2649 16.0794 21.2231 13.8487 21.2231 11.3993C21.2231 6.20819 16.9198 2 11.6115 2ZM11.6115 3.44774C16.1022 3.44774 19.7426 7.00776 19.7426 11.3993C19.7426 15.7908 16.1022 19.3508 11.6115 19.3508C7.12086 19.3508 3.48044 15.7908 3.48044 11.3993C3.48044 7.00776 7.12086 3.44774 11.6115 3.44774Z"
          />
        </svg>
      </template>

      <template v-slot:mobileIcon>
        <svg
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="dark:fill-white fill-dark600 h-14 w-14"
        >
          <g id="Iconly/Bulk/Plus" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Plus" transform="translate(2.000000, 2.000000)" fill-rule="nonzero" class="fill-highlight-500">
              <path
                d="M14.6666667,0 L5.33333333,0 C1.92888889,0 0,1.92888889 0,5.33333333 L0,14.6666667 C0,18.0622222 1.92,20 5.33333333,20 L14.6666667,20 C18.0711111,20 20,18.0622222 20,14.6666667 L20,5.33333333 C20,1.92888889 18.0711111,0 14.6666667,0 Z"
                id="Path_34200"
                opacity="0.400000006"
              ></path>
              <path
                d="M13.3204549,10.7083369 L10.7495202,10.7083369 L10.7495202,13.256979 C10.7495202,13.6673381 10.4139486,14 10,14 C9.58605145,14 9.25047985,13.6673381 9.25047985,13.256979 L9.25047985,10.7083369 L6.67954513,10.7083369 C6.29342268,10.6686984 6,10.3461424 6,9.96132113 C6,9.57649984 6.29342268,9.25394382 6.67954513,9.21430535 L9.24242049,9.21430535 L9.24242049,6.67365277 C9.28240567,6.2908784 9.60778305,6 9.99597032,6 C10.3841576,6 10.709535,6.2908784 10.7495202,6.67365277 L10.7495202,9.21430535 L13.3204549,9.21430535 C13.7065773,9.25394382 14,9.57649984 14,9.96132113 C14,10.3461424 13.7065773,10.6686984 13.3204549,10.7083369 L13.3204549,10.7083369 Z"
                id="Path_34201"
              ></path>
            </g>
          </g>
        </svg>
      </template>
    </input-field>

    <div
      class="dark:text-gray-50 text-gray-900 absolute w-full dark:bg-dark500 bg-gray-50 mt-4 p-4 rounded-lg shadow-2xl border dark:border-dark400 max-h-96 overflow-auto"
      v-if="searchString.length !== 0 && isFocus"
    >
      <div v-if="searchResult.users.length === 0 && searchResult.groups.length === 0 && searchResult.tags.length === 0">
        Keine Nutzer, Tags oder Gruppen gefunden
      </div>
      <div v-else>
        <div class="pb-2 font-semibold">Nutzer</div>
        <div v-if="searchResult.users && searchResult.users.length > 0">
          <div
            v-for="result in searchResult.users"
            :key="result.id"
            class="flex items-center w-full dark:bg-dark600 bg-gray-200 first:mt-0 last:mb-0 my-4 p-3 rounded-md cursor-pointer"
            @click="handleRouting('USERS', result.username)"
          >
            <div class="table-cell align-middle mr-4">
              <img class="h-10 w-10 rounded-full bg-dark700" :src="result.profilePicLink" />
            </div>
            <div class="flex flex-row align-middle">{{ result.firstname }} {{ result.lastname }}</div>
            <div class="flex flex-row align-middle ml-3">@{{ result.username }}</div>
          </div>
        </div>
        <div class="mt-2 text-sm mb-4" v-else>Keine Nutzer gefunden</div>
        <div class="pb-2 pt-2 font-semibold">tags</div>
        <div v-if="searchResult.tags && searchResult.tags.length > 0">
          <div
            v-for="result in searchResult.tags"
            :key="result.id"
            class="flex items-center w-full dark:bg-dark600 bg-gray-200 first:mt-0 last:mb-0 my-2 p-3 rounded-md cursor-pointer"
            @click="handleRouting('TAGS', result.name)"
          >
            <div class="flex flex-row align-middle">{{ result.name }}</div>
          </div>
        </div>
        <div class="mt-2 text-sm mb-2" v-else>Keine Tags gefunden</div>
        <div class="pb-2 pt-2 font-semibold">Gruppen</div>
        <div v-if="searchResult.groups && searchResult.groups.length > 0">
          <div
            v-for="result in searchResult.groups"
            :key="result.id"
            class="flex items-center w-full dark:bg-dark600 bg-gray-200 first:mt-0 last:mb-0 my-4 p-3 rounded-md cursor-pointer"
            @click="handleRouting('GROUPS', result.id)"
          >
            <div class="flex flex-row align-middle">{{ result.name }}</div>
          </div>
        </div>
        <div class="mt-2 text-sm" v-else>Keine Gruppen gefunden</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onClickOutside, TimeoutFnResult } from '@vueuse/core';
import { useSearchQuery } from '../graphql/generated/graphqlOperations';
import { customRef, defineComponent, ref, Ref, unref, watch } from 'vue';
import { useRouter } from 'vue-router';
import InputField from './Form/InputField.vue';
export type MaybeRef<T> = Ref<T> | T;
function useDebounceRef<T>(value: T, delay: MaybeRef<number> = 200, callOutside: MaybeRef<boolean> = true) {
  let timeout: NodeJS.Timeout;
  return customRef<T>((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        if (unref(callOutside)) {
          value = newValue;
        }
        timeout = setTimeout(() => {
          if (!unref(callOutside)) {
            value = newValue;
          }
          trigger();
        }, unref(delay));
      },
    };
  });
}
export default defineComponent({
  components: { InputField },
  name: 'GroupSearch',
  setup() {
    const searchString = useDebounceRef('', 300, true);
    const router = useRouter();
    const searchResult = ref([]);
    const isFocus = ref(false);

    //CALLS ON INIT .. could be not the best idea
    const { onResult } = useSearchQuery(() => ({
      searchString: searchString.value,
    }));

    onResult(({ data }) => {
      if (data.search) {
        searchResult.value = data.search;
      } else {
        searchResult.value = [];
      }
    });

    const target = ref(null);
    onClickOutside(target, () => {
      isFocus.value = false;
    });

    const handleRouting = (type: string, payload: string) => {
      switch (type) {
        case 'USERS':
          router.push({
            name: 'Profile',
            params: {
              id: payload,
            },
          });
          break;
        case 'TAGS':
          router.push({
            name: 'Browse',
            query: {
              tag: payload,
            },
          });
          break;
        case 'GROUPS':
          router.push({
            name: 'Group',
            params: {
              id: payload,
            },
          });
          break;
      }

      searchString.value = '';
      isFocus.value = false;
    };

    return { searchString, searchResult, isFocus, target, handleRouting };
  },
});
</script>
