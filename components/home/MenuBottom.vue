<template>
  <div class="menu-bottom sticky w-full bg-white flex items-center justify-evenly md:hidden">
    <div @click="home" class="cursor-pointer hover:bg-gray-200 text-gray-400" :class="{'text-blue-500': page=='home'}">
      <i class='bx bxs-home'></i>
    </div>
    <div @click="explore" class="cursor-pointer hover:bg-gray-200 text-gray-400" :class="{'text-blue-500': page=='explore'}">
      <i class='bx bx-compass'></i>
    </div>
    <div @click="bookmarks" class="cursor-pointer hover:bg-gray-200 text-gray-400" :class="{'text-blue-500': page=='bookmarks'}">
      <i class='bx bxs-bookmark-star'></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['page'],
  methods: {
    home(){
      this.$router.push('/home')
    },
    explore(){
      this.$router.push('/home/explore')
    },
    bookmarks(){
      this.$router.push('/home/bookmarks')
    }
  }
}
</script>

<style>
.menu-bottom {
  height: 50px;
  bottom: 0;
  left: 0;
}
</style>