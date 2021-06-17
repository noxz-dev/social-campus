<template>
  <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4 mb-10 mt-10">
    <div v-for="index in 3" :key="index">
      <post-card-placeholder class="mt-4"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostCardPlaceholder from '../Post/PostCardPlaceholder.vue';
import PostList from '../Post/PostList.vue';

export default defineComponent({
  components: {
    PostList,
    PostCardPlaceholder,
  },
});
</script>

<style></style>
