<template>
  <div class="w-full flex justify-center lg:justify-start">
    <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4">
      <div class="h-full flex flex-col gap-2 mt-4 items-center">
        <follow-user-card
          v-for="user in followings"
          :key="user.id"
          :user="user"
          class="dark:!bg-dark-600 bg-gray-200 rounded-lg py-3 w-full !text-md"
        ></follow-user-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Card from '../components/Card/Card.vue';
import { defineComponent, ref } from 'vue';
import LazyImage from '../components/Blurhash/LazyImage.vue';
import PostList from '../components/Post/PostList.vue';
import { useGetFollowingQuery } from '../graphql/generated/types';
import FollowUserCard from '../components/FollowUserCard.vue';
import { useResult } from '@vue/apollo-composable';


export default defineComponent({
  components: { PostList, Card, LazyImage, FollowUserCard },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const { result } = useGetFollowingQuery(() => ({
      userId: props.userId,
      take: 99999999,
      skip: 0 
    }));
        
    const followings = useResult(result, [], data => data.getFollowing)
    
    return {
      followings,
    };
  },
});
</script>

<style></style>
