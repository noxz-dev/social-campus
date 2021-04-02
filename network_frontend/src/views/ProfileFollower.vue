<template>
  <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-2/4">
    <card v-for="user in followers" :key="user.id">
      <div @click="$router.push({ name: 'Profile', params: { id: user.username } })" class="cursor-pointer p-5 dark:text-gray-50 text-gray-900">
        {{ user.firstname + ' ' + user.lastname + ' ' }}@{{ user.username }}
      </div>
    </card>
  </div>
</template>

<script lang="ts">
import Card from '../components/Card.vue';
import { defineComponent, ref } from 'vue';
import PostList from '../components/PostList.vue';
import { useFollowersQuery } from '../graphql/generated/graphqlOperations';
import { FollowersQueryVariables } from '../graphql/generated/types';

export default defineComponent({
  components: { PostList, Card },
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
