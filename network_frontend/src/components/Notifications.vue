<template>
  <div
    id="notificationContainer"
    class="absolute dark:bg-dark-700 bg-white h-96 w-80 top-12 right-0 rounded-lg border border-dark-500 shadow-xl overflow-auto"
  >
    <div class="dark:text-gray-50 text-gray-900 text-lg border-b-2 w-full border-dark-400 p-2 font-semibold">
      Mitteilungen
    </div>
    <div v-if="notificationsLoading" class="dark:text-gray-50 text-gray-900">Loading...</div>
    <div v-else class="p-1 flex flex-col w-full">
      <span class="dark:text-gray-50 text-gray-900 p-2 text-center w-full" v-if="notifications?.length === 0">
        Keine Mitteilungen vorhanden</span
      >
      <div
        id="card"
        class="dark:bg-dark-600 bg-white rounded dark:text-gray-50 text-gray-900 px-1 py-3 cursor-pointer my-1 flex justify-evenly items-center w-full border-dark-500 border"
        v-for="notify of notifications"
        :key="notify.id"
        @click="handleNotificationClick(notify)"
      >
        <div class="h-8 w-8">
          <lazy-image
            class="h-8 w-8 rounded-full"
            blurhash="AePC3PmlGv{c"
            rounded="full"
            :src="notify.fromUser?.avatar.name"
            alt=""
          />
        </div>
        <div class="flex flex-col flex-1 ml-2">
          <span class="flex-1 dark:text-gray-50 text-gray-900 text-sm">{{ notify.message }}</span>
          <span v-if="notify.chatMessage" class="flex-1 dark:text-gray-300 text-gray-900 text-sm">{{
            notify.chatMessage.content
          }}</span>
        </div>
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
import { useDeleteNotificationMutation } from '../graphql/generated/types';
import { defineComponent, PropType, ref, toRefs, watch } from 'vue';
import { Notification, NotificationType } from '../graphql/generated/types';
import { useRouter } from 'vue-router';
import lazyImage from '../components/Blurhash/LazyImage.vue';
import { RecursivePartial } from '../utils/typeUtils';
export default defineComponent({
  emits: ['closeNotify', 'deleteNotification'],
  props: {
    notifications: {
      type: Object as PropType<RecursivePartial<Notification>[]>,
      required: true,
    },
  },
  components: {
    lazyImage,
  },
  setup(props, { emit }) {
    const notifications = ref<RecursivePartial<Notification>[]>(props.notifications);
    const router = useRouter();
    const notificationsLoading = ref(false);
    const tobeDeleted = ref('');
    watch(
      () => props.notifications,
      () => {
        notifications.value = props.notifications;
      }
    );

    const { mutate: deleteNotify } = useDeleteNotificationMutation(() => ({
      variables: {
        notificationId: tobeDeleted.value,
      },
    }));

    const deleteNotification = async (id: string) => {
      tobeDeleted.value = id;
      await deleteNotify();
      emit('deleteNotification', id);
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
      } else if (notify.type === NotificationType.Mention) {
        if (notify.post) {
          router.push({
            name: 'DetailPost',
            params: {
              id: notify.post.id,
            },
          });
        }
      } else if (notify.type === NotificationType.NewComment) {
        if (notify.post) {
          router.push({
            name: 'DetailPost',
            params: {
              id: notify.post.id,
            },
          });
        }
      } else if (notify.type === NotificationType.PostLike) {
        if (notify.post) {
          router.push({
            name: 'DetailPost',
            params: {
              id: notify.post.id,
            },
          });
        }
      } else if (notify.type === NotificationType.NewChatMessage) {
        console.log(notify);
        if (notify.chat) {
          router.push({
            name: 'ChatBox',
            params: {
              id: notify.chat.id,
            },
          });
        }
      }
      emit('closeNotify');
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

<style scoped></style>
