<template>
  <div class="w-full flex flex-col items-center">
    <div class="user-background">
      <img :src="`http://localhost:4000${data.background}`" alt="" class="w-full">

      <div class="w-full flex items-center justify-center mt-2">
        <div class="w-11/12 flex flex-col items-center justify-evenly sm:flex-row sm:gap-2 bg-white rounded shadow px-2 py-2">
          <div>
            <img width="100px" class="user-back border-2 rounded-md " :src="`http://localhost:4000${data.avatar}`" alt="">
          </div>
          <div>
            <div>
              <h2 class="font-bold">{{data.name}}</h2>
              <div class="flex text-gray-400 text-sm gap-2">
                <p v-if="data.following" @click="toggleFollowing" class="cursor-pointer">{{ data.following.length }} Following</p>
                <p v-if="data.followers" @click="toggleFollowers" class="cursor-pointer">{{ data.followers.length }} Followers</p>
              </div>
              
            </div>
            <div>
              {{data.bio}}
            </div>
          </div>
          <div>
            <button @click="config" v-if="logUser == data._id" class="bg-blue-500 text-white py-1 px-3 rounded">Config</button>
            <button @click="follow" v-else class="bg-blue-500 text-white py-1 px-3 rounded">Follow</button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  meta: {
    title: 'Hola'
  },
  props: ['data'],
  data(){
    return {
      logUser: ''
    }
  },
  methods: {
    config(){
      this.$router.push('/home/account')
    },
    toggleFollowing(){
      this.$emit('toggleFollowing')
    },
    toggleFollowers(){
      this.$emit('toggleFollowers')
    },
    async follow(){
      let resultFollow = this.$axios.$post('/users/follow', {

      })
    }
  },
  mounted(){
    this.logUser = this.$auth.user._id

  }
}
</script>

<style>
.user-background {
  max-width: 1024px;
}
</style>