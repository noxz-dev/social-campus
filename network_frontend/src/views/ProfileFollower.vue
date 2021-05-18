<template>
  <div class="w-full flex justify-center lg:justify-start">
    <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4">
      <div class="h-full flex flex-col gap-2 mt-4 items-center">
        <follow-user-card
          v-for="user in followers"
          :key="user.id"
          :user="user"
          class="dark:!bg-dark-600 bg-gray-200 rounded-lg py-3 w-full"
        ></follow-user-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Card from '../components/Card/Card.vue';
import { defineComponent, ref } from 'vue';
import PostList from '../components/Post/PostList.vue';
import { useFollowersQuery } from '../graphql/generated/types';
import { FollowersQueryVariables } from '../graphql/generated/types';
import LazyImage from '../components/Blurhash/LazyImage.vue';
import FollowUserCard from '../components/FollowUserCard.vue';

export default defineComponent({
  components: { PostList, Card, LazyImage, FollowUserCard },
  props: {
    userId: String,
  },
  setup(props) {
    const followers = ref();

    const { onResult } = useFollowersQuery(
      () =>
        <FollowersQueryVariables>{
          userId: props.userId,
          take: 100,
          skip: 0,
        }
    );

    onResult(({ data }) => {
      followers.value = data.followers;
    });

    return {
      followers,
    };
  },
});
</script>

<style></style>
