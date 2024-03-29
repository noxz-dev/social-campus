<template>
  <app-button
    @click="followUser"
    v-if="!following"
    :disabled="addFollowLoading"
    class="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-sm font-medium"
  >
    <svg
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      v-if="addFollowLoading"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <div class="flex items-center">
      <svg
        width="24"
        height="24"
        class="stroke-white -ml-3"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 8.3273V15.6537" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.6667 11.9905H8.33333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <div>Folgen</div>
    </div>
  </app-button>
  <app-button
    @mouseover="followButtonText = 'Entfolgen'"
    @mouseout="followButtonText = 'Folge ich'"
    @click="unfollowUser"
    v-else
    :disabled="removeFollowLoading"
    class="
      inline-flex
      items-center
      justify-center
      px-3
      py-1
      rounded-full
      text-sm
      font-medium
      hover:!bg-red-600
      transition-colors
      duration-200
    "
  >
    <svg
      class="animate-spin mr-3 -ml-1 h-5 w-5 text-white"
      v-if="removeFollowLoading"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    {{ followButtonText }}
  </app-button>
</template>
<script lang="ts">
import { useAddFollowerMutation, useRemoveFollowerMutation } from '../../graphql/generated/types';
import { defineComponent, ref } from 'vue';
import { getFeed } from '../../graphql/queries/getFeed';
import { browsePosts } from '../../graphql/queries/browsePosts';
import { recommendedUsersFaculty } from '../../graphql/queries/recommendUsersFaculty';
import { recommendedUsersInterests } from '../../graphql/queries/recommendInterests';
export default defineComponent({
  props: {
    user: { type: Object, required: true },
    following: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const followButtonText = ref('Folge Ich');

    //create the add follow mutation
    const { mutate: follow, loading: addFollowLoading } = useAddFollowerMutation(() => ({
      variables: {
        userID: props.user?.id as string,
      },
      refetchQueries: [
        {
          query: recommendedUsersFaculty,
        },
        {
          query: recommendedUsersInterests,
        },
      ],
      update: (cache, { data: { addFollower } }) => {
        cache.modify({
          id: cache.identify(props.user),
          fields: {
            meFollowing() {
              return true;
            },
          },
        });
      },
    }));

    //create the remove follow mutation
    const { mutate: unfollow, loading: removeFollowLoading } = useRemoveFollowerMutation(() => ({
      variables: {
        userID: props.user?.id as string,
      },
      update: (cache, { data: { removeFollower } }) => {
        cache.modify({
          id: cache.identify(props.user),
          fields: {
            meFollowing() {
              return removeFollower.meFollowing;
            },
          },
        });
      },
    }));

    /**
     * follows a user
     */
    const followUser = async () => {
      try {
        await follow();
      } catch (err) {
        console.log(err);
      }
    };

    /**
     * unfollows a user
     */
    const unfollowUser = async () => {
      try {
        await unfollow();
      } catch (err) {
        console.log(err);
      }
    };
    return {
      followUser,
      unfollowUser,
      followButtonText,
      addFollowLoading,
      removeFollowLoading,
    };
  },
});
</script>
<style></style>
