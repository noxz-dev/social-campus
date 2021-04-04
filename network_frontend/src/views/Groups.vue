<template>
  <div>
    <div id="groups" class="flex h-full items-center bg-white dark:bg-dark700 flex-col rounded-3xl overflow-y-auto p-5">
      <div class="p-4 pt-0 w-full rounded-lg">
        <div class="flex justify-between dark:text-gray-50 text-gray-900 items-center">
          <div class="text-md font-semibold">Finde Gruppen</div>
          <div>
            <div></div>
            <div>
              <button
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-3xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                @click="post"
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
                Gruppe erstellen
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
          <group-card />
        </div>
      </div>
      <div class="mt-10 p-4 dark:bg-dark-600 w-full h-1/3 rounded-lg dark:text-gray-50">Gruppen von Leuten denen du folgst</div>
    </div>
  </div>
</template>

<script lang="ts">
import Card from '../components/Card.vue';
import { defineComponent } from 'vue';
import GroupCard from '../components/GroupCard.vue';

export default defineComponent({
  components: {
    Card,
    GroupCard,
  },
});
</script>

<style></style>
