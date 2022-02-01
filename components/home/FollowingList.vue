<template>
  <div class="absolute flex items-center justify-center bg-black bg-opacity-25 top-0 left-0 w-full h-full">
    <div class="relative bg-white px-4 py-4 rounded shadow">
      <i @click="closeMenu" class='bx bx-x absolute cursor-pointer right-4'></i>
      <h2 class="mb-2">Following</h2>
      <div class="flex flex-col gap-2">
        <HomeUserProfile v-for="user in users" :key="user.id" :data="user" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      usersId: [],
      users: []
    }
  },
  async mounted(){
    const user = await this.$axios.$get(`/users/${this.id}`)
    this.usersId = user.user.following
    for (const userId of this.usersId) {
      const user = await this.$axios.$get(`/users/${userId}`)
      this.users.push(user.user)
    }
  },
  methods: {
    closeMenu(){
      this.$emit('closeList')
    }
  }
}
</script>

<style>

</style>