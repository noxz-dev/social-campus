<template>
  <div class="w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4 mt-10 mb-10">
    <card bgColorDark="bg-dark-600 pb-4">
      <div class="pb-28 p-10">
        <div class="pb-10 font-semibold text-2xl">Du bist kein Teil dieser Gruppe</div>
        <div class="pb-4">Gruppen Passwort</div>
        <input-field class="pb-8" />
        <app-button @click="joinGroup">Beitreten</app-button>
      </div>
    </card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import Card from '../Card/Card.vue';
import InputField from '../Form/InputField.vue';

export default defineComponent({
  components: { Card, InputField },
  setup() {
    const route = useRoute();
    const joinGroup = () => {};

    return {
      joinGroup,
    };
  },
});
</script>

<style></style>
