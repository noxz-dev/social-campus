<template>
  <div>
    <div id="chats" class="flex h-full items-center bg-white dark:bg-dark-700 flex-col rounded-2xl overflow-y-auto">
      <div class="w-full h-full flex">
        <div id="userContainer" class="w-1/4 dark:bg-dark-700 h-full overflow-y-auto border-r border-dark-500">
          <div>
            <div v-for="index in 30" :key="index">
              <div class="dark:bg-dark-700 w-full h-20 p-0.5 my-1.5">
                <div
                  :class="index === 1 ? 'dark:!bg-dark-600 !bg-gray-200' : ''"
                  class="cursor-pointer rounded-lg border dark:border-dark-600 bg-white dark:bg-dark-700 dark:hover:!bg-dark-600 hover:!bg-gray-200 px-6 py-5 shadow-sm flex items-center space-x-3 hover:!border-gray-400"
                >
                  <div class="flex-shrink-0">
                    <img
                      class="h-10 w-10 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80"
                      alt=""
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="focus:outline-none">
                      <p class="text-sm font-medium dark:text-gray-50 text-gray-900">Leslie Alexander</p>
                      <p class="text-sm text-gray-500 truncate">letzte nachricht</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 dark:bg-dark-700 h-full">
          <div class="flex flex-col justify-between h-full">
            <div>
              <div class="w-full px-5 flex flex-col items-between">
                <div class="flex flex-col mt-5">
                  <div class="flex justify-end mb-4">
                    <div class="mr-2 py-3 px-4 bg-highlight-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-xl text-white">first chat message</div>
                  </div>
                  <div class="flex justify-start mb-4 w-2/3">
                    <div class="ml-2 py-3 px-4 bg-dark-400 rounded-br-2xl rounded-tr-2xl rounded-tl-xl text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat at praesentium, aut ullam delectus odio error sit rem.
                      Architecto nulla doloribus laborum illo rem enim dolor odio saepe, consequatur quas?
                    </div>
                  </div>
                  <div class="flex justify-end mb-4">
                    <div>
                      <div class="mr-2 py-3 px-4 bg-highlight-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-xl text-white">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, repudiandae.
                      </div>

                      <div class="mt-4 mr-2 py-3 px-4 bg-highlight-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-xl text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis!
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-start mb-4">
                    <div class="ml-2 py-3 px-4 bg-dark-400 rounded-br-2xl rounded-tr-2xl rounded-tl-xl text-white">hey cool whatsup</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="py-5 p-2">
              <input
                class="w-full dark:bg-dark-600 py-5 px-3 rounded-lg text-dark-900 dark:text-gray-50"
                type="text"
                placeholder="type your message here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style>
@screen md {
  #userContainer::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.897);
    box-shadow: inset 0 0 6px #ffffff;
    border-radius: 10px;
    background-color: #ffffff;
  }
  #userContainer::-webkit-scrollbar {
    width: 4px;
    background-color: #ffffff;
  }
  #userContainer::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.4);
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.4);
    background-color: #d8d8d8;
  }

  .dark #userContainer::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px #181a20;
    box-shadow: inset 0 0 6px #181a20;
    background-color: #181a20;
  }
  .dark #userContainer::-webkit-scrollbar {
    width: 4px;
    background-color: #181a20;
  }
  .dark #userContainer::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #363b41;
  }
}
</style>
