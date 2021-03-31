<template>
  <div
    id="notificationContainer"
    class="absolute dark:bg-dark700 bg-white h-96 w-80 top-12 right-0 rounded-lg border border-dark500 shadow-xl overflow-auto"
  >
    <div class="dark:text-gray-50 text-gray-900 text-lg border-b-2 w-full border-dark400 p-2 font-semibold">Mitteilungen</div>
    <div v-if="notificationsLoading" class="dark:text-gray-50 text-gray-900">Loading...</div>
    <div v-else class="p-1 flex flex-col w-full">
      <span class="dark:text-gray-50 text-gray-900 p-2 text-center w-full" v-if="notifications?.length === 0"> Keine Mitteilungen vorhanden</span>
      <div
        id="card"
        class="dark:bg-dark600 bg-white rounded dark:text-gray-50 text-gray-900 px-1 py-3 cursor-pointer my-1 flex justify-evenly items-center w-full border-dark500 border"
        v-for="notify of notifications"
        :key="notify.id"
        @click="handleNotificationClick(notify)"
      >
        <span class="flex-1 ml-2 dark:text-gray-50 text-gray-900">{{ notify.message }}</span>
        <div class="rounded" @click.stop="deleteNotification(notify.id)">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Iconly/Light/Close-Square"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <g id="Close-Square" transform="translate(2.000000, 2.000000)" class="stroke-red" stroke-width="1.5">
                <line x1="12.3955" y1="7.5949" x2="7.6035" y2="12.3869" id="Stroke-1"></line>
                <line x1="12.397" y1="12.3898" x2="7.601" y2="7.5928" id="Stroke-2"></line>
                <path
                  d="M14.3345,0.7502 L5.6655,0.7502 C2.6445,0.7502 0.7505,2.8892 0.7505,5.9162 L0.7505,14.0842 C0.7505,17.1112 2.6355,19.2502 5.6655,19.2502 L14.3335,19.2502 C17.3645,19.2502 19.2505,17.1112 19.2505,14.0842 L19.2505,5.9162 C19.2505,2.8892 17.3645,0.7502 14.3345,0.7502 Z"
                  id="Stroke-3"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useDeleteNotificationMutation, useGetNotificationsQuery } from '../graphql/generated/graphqlOperations';
import { computed, defineComponent, ref, watchEffect } from 'vue';
import { Notification, NotificationType } from '../graphql/generated/types';
import { useRouter } from 'vue-router';
import { getNotifications } from '../graphql/queries/notifications';
import { notificationsSubscription } from '../graphql/subscriptions/notifications';
import { useStore } from 'vuex';
export default defineComponent({
  setup() {
    const notifications = ref<Notification[]>([]);
    const { onResult, subscribeToMore, loading: notificationsLoading } = useGetNotificationsQuery();
    const store = useStore();
    const user = computed(() => store.state.userData.user);

    subscribeToMore(() => ({
      document: notificationsSubscription,
      variables: {
        userId: user.value.id,
      },
    }));
    const tobeDeleted = ref('');
    const router = useRouter();

    onResult(({ data }) => {
      notifications.value = data.getNotifications;
    });

    const { mutate: deleteNotify } = useDeleteNotificationMutation(() => ({
      variables: {
        notificationId: tobeDeleted.value,
      },
    }));

    const deleteNotification = async (id: string) => {
      tobeDeleted.value = id;
      await deleteNotify();
      notifications.value = notifications.value.filter((n) => n.id != id);
      tobeDeleted.value = '';
    };

    const handleNotificationClick = (notify: Notification) => {
      if (notify.type === NotificationType.NewFollower) {
        router.push({
          name: 'Profile',
          params: {
            id: notify.fromUser.username,
          },
        });
      }
    };

    return {
      notifications,
      deleteNotification,
      handleNotificationClick,
      notificationsLoading,
    };
  },
});
</script>

<style scoped>
#notificationContainer::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #272b2f;
}
#notificationContainer::-webkit-scrollbar {
  width: 8px;
  background-color: #272b2f;
}
#notificationContainer::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #363b41;
}
</style>
