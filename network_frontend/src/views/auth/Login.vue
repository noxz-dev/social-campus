<template>
  <div @click="login">Login</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { login as loginMutation } from '../../graphql/mutations/login'
export default defineComponent({
  setup() {
    const { mutate: login, onDone } = useMutation(loginMutation, {
      variables: {
        email: 'test12@email.com',
        password: 'Password123',
      },
    })
    onDone((result) => {
      localStorage.setItem('apollo-token', result.data.login.accessToken)
    })
    onMounted(() => {
      login()
    })

    return { login }
  },
})
</script>

<style></style>
