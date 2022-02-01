<template>
  <div class="flex gap-2">
    <div>
      <img width="40px" class="rounded" :src="`http://localhost:4000${user.avatar}`" alt="">
    </div>
    <div class="w-full">
      <div class="flex flex-col bg-gray-200 rounded px-2 py-2">
        <div class="flex items-center gap-1">
          <p class="font-bold">{{user.name}}</p>
          <p class="text-sm text-gray-400">{{ comment.createdAt.substr(0, 10) }}</p>
        </div>
        <div class="w-full">
          <p>{{ comment.content }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div @click="like" :class="{'text-red-500': isLiked}" class="flex cursor-pointer items-center justify-center hover:bg-gray-200 py-1 px-2 my-1 rounded">
          <i class='bx bx-heart'></i>
          <p>Like</p>
        </div>

        <div>
          <p class="text-gray-400" >{{ comment.likes.length }} Likes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      comment: {
        createdAt: '',
        likes: []
      },
      user: {},
      isLiked: false
    }
  },
  props: ['id'],
  methods: {
    async getComment(id){
      const result = await this.$axios.$get(`/tweets/${id}/comments`)

      return result
    },
    async getUser(id){
      const result = await this.$axios.$get(`/users/${id}`)

      return result
    },
    async like(){
      const logUser = this.$auth.user._id

      const result = await this.$axios.$post(`/tweets/comments/like`, {
        idComment: this.comment._id,
        idUser: logUser,

      })

    }
  },
  async mounted(){
    const logUser = this.$auth.user._id

    console.log(this.id)
    console.log(logUser)

    
    const comment = await this.getComment(this.id)
    this.comment = comment.comment
  
    const user = await this.getUser(this.comment.user)
    this.user = user.user

    // Verify if the user has liked the comment 
    this.comment.likes.forEach(like => {
      if(like == logUser){
        this.isLiked = true
      }
    })

  }
}
</script>