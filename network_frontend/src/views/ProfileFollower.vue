<template>
  <div class="w-full flex justify-center lg:justify-start">
    <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4">
      <card v-for="user in followers" :key="user.id" class="my-2">
        <div class="flex items-center">
          <div class="h-10 rounded-full ml-2">
            <lazy-image
              class="h-10 w-10 !rounded-full bg-dark700 object-cover"
              :src="user.avatar.name"
              blurhash="AePC3PmlGv{c"
              :onLoad="true"
            />
          </div>
          <div
            @click="$router.push({ name: 'Profile', params: { id: user.username } })"
            class="cursor-pointer p-5 dark:text-gray-50 text-gray-900 flex-1"
          >
            {{ user.firstname + ' ' + user.lastname + ' ' }}@{{ user.username }}
          </div>
          <app-button class="mr-5 rounded-xl"> hey missing content </app-button>
        </div>
      </card>
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

export default defineComponent({
  components: { PostList, Card, LazyImage },
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
