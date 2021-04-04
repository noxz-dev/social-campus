<template>
  <div>
    <div id="groups" class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto p-5">
      <div class="p-4 pt-0 w-full rounded-lg">
        <div class="flex justify-between dark:text-gray-50 text-gray-900 items-center">
          <div class="text-md font-semibold hidden md:block">Finde Gruppen</div>
          <div class="w-full md:w-2/4">
            <input-field
              @click="isFocus = true"
              v-model="searchString"
              :iconPadding="2"
              inputClasses="text-sm md:text-md pl-10 p-2"
              placeholder="Suche nach Gruppen"
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
          </div>
          <div>
            <div></div>
            <div>
              <button
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                @click="eventbus.emit('open-new-group-modal')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 256 256" class="mr-2 h-6">
                  <rect width="256" height="256" fill="none"></rect>
                  <line
                    x1="40"
                    y1="128"
                    x2="216"
                    y2="128"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="128"
                    y1="40"
                    x2="128"
                    y2="216"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                </svg>
                <span class="hidden md:block">Gruppe erstellen</span>
                <span class="sm:block md:hidden">
                  <svg class="h-6" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>Iconly/Bulk/2 User</title>
                    <g id="Iconly/Bulk/2-User" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="2-User" transform="translate(2.000000, 3.000000)" fill="#fff" fill-rule="nonzero">
                        <path
                          d="M7.34933305,11.8577345 C3.38552687,11.8577345 -6.83897383e-14,12.4700446 -6.83897383e-14,14.9173685 C-6.83897383e-14,17.3666088 3.3640004,18 7.34933305,18 C11.3131392,18 14.6986661,17.3876899 14.6986661,14.940366 C14.6986661,12.4911257 11.3346657,11.8577345 7.34933305,11.8577345"
                          id="Fill-1"
                        ></path>
                        <path
                          d="M7.34933305,9.52482353 C10.0489483,9.52482353 12.2123586,7.40617314 12.2123586,4.76241176 C12.2123586,2.11865038 10.0489483,-9.76996262e-15 7.34933305,-9.76996262e-15 C4.65069631,-9.76996262e-15 2.48630745,2.11865038 2.48630745,4.76241176 C2.48630745,7.40617314 4.65069631,9.52482353 7.34933305,9.52482353"
                          id="Fill-3"
                          opacity="0.400000006"
                        ></path>
                        <path
                          d="M14.1734202,4.84874844 C14.1734202,6.19506404 13.7605033,7.45130586 13.0364311,8.49482023 C12.9610885,8.60214218 13.0276248,8.74683517 13.1587406,8.76983274 C13.3407371,8.79953792 13.527626,8.81774432 13.7184289,8.82157725 C15.6166723,8.87044707 17.3201989,7.67361562 17.7908459,5.87118171 C18.4884992,3.19675692 16.4415275,0.79542817 13.833889,0.79542817 C13.5511095,0.79542817 13.2800716,0.824175122 13.0158831,0.876877868 C12.9796795,0.884543722 12.9405405,0.901791893 12.9209709,0.932455309 C12.8955306,0.971742811 12.9141216,1.02252909 12.939562,1.0560672 C13.7233212,2.13216145 14.1734202,3.44206424 14.1734202,4.84874844"
                          id="Fill-5"
                          opacity="0.400000006"
                        ></path>
                        <path
                          d="M19.779109,12.1693515 C19.4317501,11.4439701 18.5931962,10.9466478 17.3172635,10.7022987 C16.7155008,10.5585639 15.0853598,10.3544606 13.5697005,10.3832075 C13.5471956,10.3860822 13.5344754,10.4014139 13.5325184,10.4109962 C13.529583,10.4263279 13.5364323,10.4493255 13.5657866,10.4656155 C14.2663754,10.8048295 16.9738184,12.2805064 16.6333088,15.3928431 C16.6186317,15.528912 16.7291994,15.6438998 16.8671645,15.6247352 C17.5335067,15.5317867 19.2477966,15.1705333 19.779109,14.0474857 C20.0736303,13.453382 20.0736303,12.7634552 19.779109,12.1693515"
                          id="Fill-7"
                        ></path>
                      </g>
                    </g></svg
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 p-4 dark:bg-dark-600 bg-gray-300 w-full rounded-xl dark:text-gray-50">
        <div>
          <div class="pb-4">
            <span>Empfohlene Gruppen</span>
          </div>
        </div>
        <div class="pt-4 flex flex-wrap gap-3">
          <group-card />
          <group-card />
          <group-card />
          <group-card />
          <group-card />
        </div>
      </div>
      <div class="mt-10 p-4 dark:bg-dark-600 w-full h-1/3 rounded-lg dark:text-gray-50">Gruppen von Leuten denen du folgst</div>
    </div>
    <new-group-modal contentText="" headerText="Erstelle eine Gruppe" />
  </div>
</template>

<script lang="ts">
import Card from '../components/Card.vue';
import { defineComponent } from 'vue';
import GroupCard from '../components/GroupCard.vue';
import NewGroupModal from '../components/NewGroupModal.vue';
import InputField from '../components/InputField.vue';

export default defineComponent({
  components: {
    Card,
    GroupCard,
    NewGroupModal,
    InputField,
  },
});
</script>

<style></style>
