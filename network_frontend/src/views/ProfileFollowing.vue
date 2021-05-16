<template>
  <div class="w-full flex justify-center lg:justify-start">
    <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4">
      <card v-for="user in followings" :key="user.id" class="my-2">
        <div class="flex items-center">
          <div class="h-10 rounded-full ml-2">
            <lazy-image
              class="h-10 w-10 !rounded-full bg-dark-700 object-cover"
              :src="user.avatar.name"
              blurhash="AePC3PmlGv{c"
              :onLoad="true"
            />
          </div>
          <div
            @click="$router.push({ name: 'Profile', params: { id: user.username } })"
            class="cursor-pointer p-5 dark:text-gray-50 text-gray-900 flex-1"
          >
            <span>{{ user.firstname + ' ' + user.lastname + ' ' }}</span>
            <span>@{{ user.username }}</span>
          </div>
          <app-button class="rounded-xl mr-2"> <span class="!text-xs">Folgen</span></app-button>
        </div>
      </card>
    </div>
  </div>
</template>

<script lang="ts">
import Card from '../components/Card/Card.vue';
import { defineComponent, ref } from 'vue';
import LazyImage from '../components/Blurhash/LazyImage.vue';
import PostList from '../components/Post/PostList.vue';
import { useFollowingQuery } from '../graphql/generated/types';
import { FollowingQueryVariables } from '../graphql/generated/types';

export default defineComponent({
  components: { PostList, Card, LazyImage },
  props: {
    userId: String,
  },
  setup(props) {
    const followings = ref();

    const { onResult } = useFollowingQuery(
      () =>
        <FollowingQueryVariables>{
          userId: props.userId,
          take: 100,
          skip: 0,
        }
    );

    onResult(({ data }) => {
      followings.value = data.following;
    });

    return {
      followings,
    };
  },
});
</script>

<style></style>
