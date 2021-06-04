<template>
  <modal ref="modal" content-text="" header-text="Post bearbeiten">
    <edit-post @close="modal?.closeModal()" :post="post" />
  </modal>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue';
import Modal from '../Modal.vue';
import EditPost from './EditPost.vue';
import { Post } from '../../graphql/generated/types';
export default defineComponent({
  components: {
    EditPost,
    Modal,
  },
  props: {
    headerText: {
      type: String,
      default: 'header',
    },
    contentText: {
      type: String,
      default: 'content',
    },
  },
  setup() {
    const modal = ref<InstanceType<typeof Modal>>();
    const post = ref();

    const internalInstance = getCurrentInstance();
    if (internalInstance) {
      const eventbus = internalInstance.appContext.config.globalProperties.eventbus;
      eventbus?.on('close-edit-modal', () => modal.value?.openModal());
      eventbus?.on('open-edit-modal', (data: Post) => {
        post.value = data;
        modal.value?.openModal();
      });
    }

    return {
      post,
      modal,
    };
  },
});
</script>

<style></style>
