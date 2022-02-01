<template>
  <header class="sticky top-0 z-50 bg-white flex items-center justify-evenly w-full relative">
    <div>Tweeter</div>
    
    <nav class="hidden md:flex md:items-center md:gap-4 h-full">
      <NuxtLink :class="{ 'text-blue-500': page == 'home'}" class="text-gray-400 font-semibold" to="/home">Home</NuxtLink>
      <NuxtLink :class="{ 'text-blue-500': page == 'explore'}" class="text-gray-400 font-semibold" to="/home/explore">Explore</NuxtLink>
      <NuxtLink :class="{ 'text-blue-500': page == 'bookmarks'}" class="text-gray-400 font-semibold" to="/home/bookmarks">Bookmars</NuxtLink>
    </nav>

    <div @click="toggleOptions" class="flex gap-2 cursor-pointer">
      <img width="24px" :src="`http://localhost:4000${user.avatar}`" alt="">
      <p>{{ user.name }}</p> 
    </div>

    <div v-if="showOptions" class="options-menu flex flex-col gap-2 bg-white rounded shadow absolute py-2 px-2 md:right-1/4">
      <div @click="showAccount" class="flex items-center gap-1 cursor-pointer hover:bg-gray-200 rounded px-1 py-1">
        <i class='bx bx-user-circle'></i>
        <p>My profile</p>
      </div>
      <div @click="showChat" class="flex items-center gap-1 cursor-pointer hover:bg-gray-200 rounded px-1 py-1">
        <i class='bx bx-user-voice'></i>
        <p>Group chat</p>
      </div>
      <div @click="showSettings" class="flex items-center gap-1 cursor-pointer hover:bg-gray-200 rounded px-1 py-1">
        <p>Settings</p>
        
      </div>
      <hr class="my-1">
      <div @click="logout" class="flex items-center gap-1 cursor-pointer hover:bg-gray-200 rounded px-1 py-1 text-red-600">
        <i class='bx bx-log-out'></i>
        <p>Logout</p>
        
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data(){
    return {
      showOptions: false,
      user: this.$auth.user
    }
  },
  methods: {
    toggleOptions(){
      this.showOptions = !this.showOptions
    },
    async logout(){
      await this.$auth.logout(/* .... */)
    },
    showAccount(){
      const id = this.user._id
      this.$router.push(`/home/${id}`)
    },
    showSettings(){
      this.$router.push('/home/account')
    },
    showChat(){
      this.$router.push('/home/chat')
    }
  },
  props: [
    'page'
  ]
}
</script>

<style>
header {
  height: 50px;
}

.options-menu {
  z-index: 2;
  bottom: -190px;
  right: 20%;
}
</style>