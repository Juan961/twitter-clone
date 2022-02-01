<template>
  <form @submit.prevent="userLogin" class="flex flex-col items-center gap-3.5 bg-gray-200 w-full md:w-96  py-10 rounded-xl">
    <h2>Login</h2>
    <input v-model="user.email" type="email" class="w-4/5 rounded-xl px-4 py-2" placeholder="Email">
    <input v-model="user.password" type="password" class="w-4/5 rounded-xl px-4 py-2" placeholder="Password">
    <button class="bg-blue-500 text-white w-20 py-1 rounded-xl">Login</button>
  </form>
</template>

<script>
export default {
  data(){
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    userLoged() {
      return this.$store.state.user
    }
  },
  methods: {
    async userLogin(){
      try {
        let response = await this.$auth.loginWith('local', { data: this.user })
      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>