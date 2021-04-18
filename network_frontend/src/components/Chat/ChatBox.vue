<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <div class="w-full px-5 flex flex-col items-between">
        <div class="flex flex-col mt-5">
          <message message="moin" :positionRight="true"></message>
          <message message="heyyy whats up" :positionRight="false"></message>
        </div>
      </div>
    </div>
    <div class="py-5 p-2">
      <input-field
        :showButton="true"
        v-model="message"
        :iconPadding="4"
        inputClasses="text-sm md:text-md p-4"
        buttonText="Senden"
        placeholder="Schreibe eine Nachricht"
        @clicked="alert('hey')"
      >
        <template v-slot:icon>
          <svg class="h-6 w-6 fill-gray-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.6115 2C6.30323 2 2 6.20819 2 11.3993C2 16.5903 6.30323 20.7985 11.6115 20.7985C13.8819 20.7985 15.9684 20.0287 17.613 18.7415L20.7371 21.7886L20.8202 21.8586C21.1102 22.0685 21.5214 22.0446 21.7839 21.7873C22.0726 21.5043 22.072 21.0459 21.7825 20.7636L18.6952 17.7523C20.2649 16.0794 21.2231 13.8487 21.2231 11.3993C21.2231 6.20819 16.9198 2 11.6115 2ZM11.6115 3.44774C16.1022 3.44774 19.7426 7.00776 19.7426 11.3993C19.7426 15.7908 16.1022 19.3508 11.6115 19.3508C7.12086 19.3508 3.48044 15.7908 3.48044 11.3993C3.48044 7.00776 7.12086 3.44774 11.6115 3.44774Z"
            />
          </svg>
        </template>
      </input-field>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputField from '../Form/InputField.vue';
import Message from './Message.vue';
export default defineComponent({
  props: {},
  components: { Message, InputField },
  setup() {
    const message = ref('');
    return {
      message,
    };
  },
});
</script>
<style></style>
