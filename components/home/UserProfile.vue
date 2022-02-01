<template>
  <div class="flex justify-between items-center bg-white rounded px-4 py-4 shadow">
    
    <div>
      <img width="40px" :src="`http://localhost:4000${data.avatar}`" alt="">
    </div>

    <div>
      <div>
        <div>
          <p class="font-bold">{{ data.name }}</p> 
        </div>
        <div>
          <p>{{ data.bio }}</p> 
        </div>
      </div>  
    </div>

    <div>  
      <p>{{ data.followers.length }} Followers</p>
      <p>{{ data.following.length }} Following</p>
    </div>

    <div>
      <button @click="follow(data._id)" v-if="isFollowing" class="bg-blue-500 text-white rounded px-2 py-1">Follow</button>
      <button @click="unfollow(data._id)" v-else class="bg-blue-500 text-white rounded px-2 py-1">UnFollow</button>

    </div>
    
  </div>
</template>

<script>
export default {
  props: ['data'],
  data(){
    return {
      isFollowing: false
    }
  },
  mounted(){
    // Verify it is not the same user & create a property to verify if the user is following or not
    this.data.followers.forEach(follower => {
      if(follower._id === this.$auth.user._id){
        this.isFollowing = true
      }
    })
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
  }
}
</script>