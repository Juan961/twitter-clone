<template>
  <div class="bg-white rounded px-2 py-2">
    <p class="text-sm font-bold">Who to follow</p>
    <hr class="my-2">
    <div class="flex flex-col gap-2">
      <div v-for="person in persons" :key="person.id">
        <div class="flex items-center justify-between"> 
          <img width="40px" :src="`http://localhost:4000${person.avatar}`" alt="">
          <div>
            <p class="font-bold"> {{ person.name }} </p>
            <p class="text-sm text-gray-400"> {{ person.followers.length }} followers</p>
          </div>
          <button v-if="!person.following" @click="follow(person._id)" class="bg-blue-500 text-white rounded px-2 py-1">Follow</button>
          <button v-else @click="unfollow(person._id)" class="bg-blue-500 text-white rounded px-2 py-1">Unfollow</button>
        </div>
        <div>
          <p> {{ person.bio }} </p>
          <img :src="`http://localhost:4000${person.background}`" alt="" class="w-full">
        </div>      
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      persons:[],
      idUser:''
    }
  },
  methods: {
    async follow(id){
      const result = await this.$axios.$post('/users/follow', {
        idUserFollow: this.$auth.user._id, 
        idUserFollowed: id
      })
      console.log(result)
    },
    async unfollow(id){
      const result = await this.$axios.$post('/users/unfollow', {
        idUserFollow: this.$auth.user._id, 
        idUserFollowed: id
      })
      console.log(result)
    }
  },
  async mounted(){
    this.idUser = this.$auth.user._id
    const result = await this.$axios.$get('/users/random')
    this.persons = result.users
    // Verify it is not the same user & create a property to verify if the user is following or not
    this.persons = this.persons.filter(person => {
      return person._id !== this.$auth.user._id 
    })

    this.persons.forEach(person => {
      person.following = false
      person.followers.forEach(follower => {
        if(follower._id === this.$auth.user._id){
          person.following = true
        }
      })
    })
    
  }
}
</script>