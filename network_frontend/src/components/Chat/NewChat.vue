<template>
  <div class="dark:text-gray-50 text-gray-900">
    <custom-select
      :options="users?.filter((u) => u.id !== user.id)?.map((u) => u.firstname + ' ' + u.lastname + ' @' + u.username)"
      @value-chosen="setUser($event)"
    />
    <app-button class="mt-40" @click="createChat">Chat erstellen</app-button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import InputField from '../Form/InputField.vue';
import CustomSelect from '../Form/CustomSelect.vue';
import { useCreateChatMutation, useSearchQuery } from '../../graphql/generated/types';
import { useResult } from '@vue/apollo-composable';
import { useStore } from 'vuex';
export default defineComponent({
  components: { InputField, CustomSelect },
  emits: ['close'],
  props: {},
  setup(props, { emit }) {
    const store = useStore();

    const user = computed(() => store.state.userData.user);

    const { result } = useSearchQuery(() => ({
      searchString: '',
    }));

    const { mutate: createNewChat } = useCreateChatMutation(() => ({
      variables: {
        memberId: choosenId.value,
      },
    }));

    const choosenId = ref('');

    const setUser = (user: string) => {
      const username = user.match(/@[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g)[0].replace('@', '');
      const foundUser = users.value?.find((u) => u.username === username);
      if (!foundUser) return;
      choosenId.value = foundUser.id;
    };

    const createChat = () => {
      createNewChat();
      emit('close');
    };

    const users = useResult(result, null, (data) => data.search.users);

    return { users, user, setUser, createChat };
  },
});
</script>
<style></style>
