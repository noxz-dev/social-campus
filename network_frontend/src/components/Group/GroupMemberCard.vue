<template>
  <div>
    <Menu as="div" class="relative inline-block text-left w-full">
      <MenuButton class="dark:bg-dark-700 w-full focus:outline-indigo-500 text-left">
        <div
          class="cursor-pointer rounded-lg border dark:border-dark-600 bg-white dark:bg-dark-700 dark:hover:!bg-dark-600 hover:!bg-gray-200 px-6 py-2 pl-1 shadow-sm flex items-center space-x-3 hover:!border-gray-400"
        >
          <div class="flex-shrink-0">
            <div class="h-10 rounded-full">
              <lazy-image
                class="h-10 w-10 !rounded-full bg-dark700 object-cover"
                :src="avatar"
                :blurhash="avatarBlurhash"
                rounded="full"
                :onLoad="true"
              />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="focus:outline-none">
              <p class="text-sm font-medium dark:text-gray-50 text-gray-900">{{ firstname + ' ' + lastname }}</p>
            </div>
            <div class="dark:text-gray-50 text-xs">
              <span class="flex items-center text-green-500" v-if="status"
                ><div class="h-2 rounded-full w-2 bg-green-500 mr-2"></div>
                online</span
              >
              <span class="flex items-center text-gray-400" v-else
                ><div class="h-2 rounded-full w-2 bg-gray-500 mr-2"></div>
                offline</span
              >
            </div>
          </div>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute z-30 w-56 mt-2 origin-top-right bg-white dark:bg-dark600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black dark:ring-dark-500 ring-opacity-5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  @click="$router.push({ name: 'Profile', params: { id: username } })"
                  :class="[
                    active
                      ? 'bg-gray-200 dark:bg-dark-500 dark:text-gray-50 text-gray-900'
                      : 'dark:text-gray-50 text-gray-900',
                    'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                  ]"
                >
                  Profil
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }" v-if="userId !== loggedInUser.id">
                <button
                  @click="handleNav"
                  :class="[
                    active
                      ? 'bg-gray-200 dark:bg-dark-500  dark:text-gray-50 text-gray-900'
                      : 'dark:text-gray-50 text-gray-900',
                    'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                  ]"
                >
                  Nachricht senden
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>

        <div class="w-56 text-right fixed top-16"></div>
      </MenuButton>
    </Menu>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import { useCreateChatMutation } from '../../graphql/generated/types';
import { useResult } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import LazyImage from '../Blurhash/LazyImage.vue';
export default defineComponent({
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    LazyImage,
  },
  props: {
    firstname: String,
    lastname: String,
    username: String,
    status: Boolean,
    userId: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    avatarBlurhash: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const loggedInUser = computed(() => store.state.userData.user);

    const { mutate: createChat } = useCreateChatMutation(() => ({
      variables: {
        memberId: props.userId,
      },
    }));

    const handleNav = async () => {
      const response = await createChat();
      router.push({ name: 'ChatBox', params: { id: response.data?.createChat.id! } });
    };

    return {
      handleNav,
      loggedInUser,
    };
  },
});
</script>
<style></style>
