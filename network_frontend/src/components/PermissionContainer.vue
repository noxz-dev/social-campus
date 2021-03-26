<template>
  <slot v-if="isOwner"></slot>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    userId: String,
  },
  setup(props) {
    const store = useStore();
    const isOwner = ref(false);
    const user = computed(() => store.state.userData.user);

    if (user.value.id === props.userId) {
      isOwner.value = true;
    }

    return { isOwner };
  },
});
</script>
<style></style>
