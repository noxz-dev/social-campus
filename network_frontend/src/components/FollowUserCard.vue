<template>
  <div v-if="user.id">
    <div class="flex items-center">
      <div class="h-10 rounded-full ml-2">
        <lazy-image
          class="h-10 w-10 !rounded-full bg-dark-700 object-cover"
          :src="user.avatar.name"
          :blurhash="user.avatar.blurhash"
          :onLoad="true"
        />
      </div>
      <div
        @click="$router.push({ name: 'Profile', params: { id: user.username } })"
        class="cursor-pointer px-2 dark:text-gray-50 text-gray-900 flex-1"
      >
        <div class="flex flex-col">
          <span class="truncate">{{ user.firstname + ' ' + user.lastname + ' ' }}</span>
          <span class="text-xs font-medium">@{{ user.username }}</span>
        </div>
      </div>
      <div class="mr-2">
        <follow-button-small
          v-if="user.id !== userFromStore.id"
          :user="user"
          :following="user.meFollowing"
          class="mr-2 rounded-xl w-full"
          :class="'!text-' + buttonTextSize"
        ></follow-button-small>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import FollowButton from './Form/FollowButton.vue';
import FollowButtonSmall from './Form/FollowButtonSmall.vue';
export default defineComponent({
  components: { FollowButton, FollowButtonSmall },
  props: {
    buttonTextSize: {
      type: String,
      default: 'base',
    },
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const userFromStore = computed(() => store.state.userData.user);
    return {
      userFromStore,
    };
  },
});
</script>
<style></style>
