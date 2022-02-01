<template>
  <div class="flex flex-col bg-white rounded px-4 py-4 shadow" :key="index">
    <div class="flex gap-2">
      <img width="44px" loading="lazy" :src="`http://localhost:4000${user.avatar}`" alt="">
      <div @click="userAccount(data.user)" class="cursor-pointer">
        <p class="font-bold"> {{ user.name }} </p> 
        <p class="text-gray-400 text-sm"> {{ data.createdAt.substr(0, 10) }} </p> 
      </div>
    </div>

    <div class="flex flex-col">
      <div class="w-full my-2">
        {{ data.content }}
      </div>

      <div class="flex justify-end gap-2"> 
          <p v-if="data.comments" class="text-sm text-gray-400">{{ data.comments.length }} Comments</p>
          <p v-if="data.retweets" class="text-sm text-gray-400">{{ data.retweets.length }} Retweets</p>
          <p v-if="data.likes" class="text-sm text-gray-400">{{ data.likes.length }} Likes</p>
          <p v-if="data.saved" class="text-sm text-gray-400">{{ data.saved.length }} Saved</p>  
      </div>
    </div>

    <hr class="my-2">

    <div>
      <div class="flex justify-evenly">
        <div @click="selectInput" class="flex cursor-pointer items-center justify-center hover:bg-gray-200 py-1 my-1 rounded w-1/4 max-w-xs">
          <i class='bx bx-comment'></i>
          <p class="hidden md:block">Comment</p>
        </div>
        <div @click="retweet(data._id)" :class="{'text-green-500' : user_retweet == true}" class="flex cursor-pointer items-center justify-center hover:bg-gray-200 py-1 my-1 rounded w-1/4 max-w-xs">
          <svg class="fill-current" viewBox="0 0 24 24" width="18" height="18" :class="{ 'text-green-500' : user_retweet == true, 'text-black' : user_retweet == false}" aria-hidden="true"><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></svg>
          <p class="hidden md:block">Retweet</p>
        </div>
        <div @click="like(data._id)" :class="{'text-red-500' : user_liked == true}" class="flex cursor-pointer items-center justify-center hover:bg-gray-200 py-1 my-1 rounded w-1/4 max-w-xs">
          <i class='bx bx-heart'></i>
          <p class="hidden md:block">Like</p>
        </div>
        <div @click="save(data._id)" :class="{'text-blue-500' : user_saved == true}" class="flex cursor-pointer items-center justify-center hover:bg-gray-200 py-1 my-1 rounded w-1/4 max-w-xs">
          <i class='bx bx-bookmark'></i>
          <p class="hidden md:block">Save</p>  
        </div>
        
      </div>

      <div>
        <input @keyup.enter="comment(data._id)" v-model="contentReply" name="" id="" maxlength="100" placeholder="Tweet your reply" class="resize-none border rounded px-2 py-2 w-full">
      </div>

      <hr class="my-2" v-if="data.comments.length > 0">

      <div>
        <HomeComment v-for="commentTweet in data.comments" :key="commentTweet.id" :id="commentTweet" />
      </div>

    </div>
  </div>
</template>


<script>
export default {
  data(){
    return {
      user: {
        name: '',
        avatar: ''
      },
      contentReply: '',
      user_liked: false,
      user_retweet: false,
      user_saved: false,
      isSelected: false,
      index: 0
    }
  },
  props: [
    'data'
  ],
  methods: {
    async getUser(id){
      let result = await this.$axios.$get(`/users/${id}`)

      return result
    },
    async retweet(id){
      let id_user = this.$auth.user._id

      await this.$axios.$post(`/tweets/${id}/retweet`, {
        userId: id_user
      })

      this.user_retweet = !this.user_retweet
      this.data.retweets = this.user_retweet ? this.data.retweets.concat([id_user]) : this.data.retweets.filter(tweet => tweet != id_user)

    },
    async like(id){
      let id_user = this.$auth.user._id
      await this.$axios.$post(`/tweets/${id}/like`, {
        userId: id_user
      })
      this.user_liked = !this.user_liked
      this.data.likes = this.user_liked ? this.data.likes.concat([id_user]) : this.data.likes.filter(tweet => tweet != id_user)
    }, 
    async save(id){
      let id_user = this.$auth.user._id
      await this.$axios.$post(`/tweets/${id}/save`, {
        userId: id_user
      })

      this.user_saved = !this.user_saved
      this.data.saved = this.user_saved ? this.data.saved.concat([id_user]) : this.data.saved.filter(tweet => tweet != id_user)
    },
    async comment(id_tweet){
      const userId = this.$auth.user._id
      const content = this.contentReply

      const response = await this.$axios.$post(`/tweets/${id_tweet}/comments`, {
        userId,
        content 
      })

      this.contentReply = ''
      this.data.comments = this.data.comments.concat(response.data)
    },
    selectInput(){
      this.isSelected = true
    },
    async verifyReactions(id_tweet, id_user){
      const response = await this.$axios.$get(`tweets/verify/${id_tweet}/users/${id_user}`)

      return response
    },

    userAccount(id){
      this.$router.push(`/home/${id}`)
    }

  },
  async mounted(){
    let id_user = this.data.user
    let response = await this.getUser(id_user)

    this.user.name = response.user.name
    this.user.avatar = response.user.avatar

    let reactions = await this.verifyReactions(this.data._id, this.$auth.user._id)

    this.user_liked = reactions.result.like ? true : false
    this.user_retweet = reactions.result.retweet ? true : false
    this.user_saved = reactions.result.save ? true : false

  }
}
</script>