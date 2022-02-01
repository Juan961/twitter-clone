<template>
  <div class="bg-white flex flex-col px-4 py-4 gap-2 rounded-lg relative shadow">
    <p class="text-sm font-bold">Tweet something</p>
    <hr>
    <div class="flex">
      <img src="" alt="">
      <textarea name="" id="" v-model="content" maxlength="280" placeholder="What's happening?" class="resize-none border rounded px-2 py-2 w-full"></textarea>
    </div>
    <div class="flex items-center gap-4">
      <i class='bx bx-image-alt text-blue-500 text-base cursor-pointer'></i>
      <div class="flex items-center cursor-pointer gap-1" @click="toggleReply">
        <i class='bx bx-world text-blue-500 text-base' ></i>
        <p class="text-blue-500 text-base" v-if="whoReply == 'everyone' ">Everyone</p>
        <p class="text-blue-500 text-base" v-else>People you follow</p>
      </div>
      <button @click="newTweet" class="bg-blue-500 text-white rounded px-7 py-1 ml-auto">Tweet</button>
    </div>
    <div v-if="showReply" class="flex flex-col gap-2 show-reply rounded bg-white py-4 px-4 absolute shadow">
      <div>
        <p class="text-sm font-bold">Who can reply?</p>
        <p class="text-gray-400 text-sm">Choose who can reply to this tweet</p>
        <div @click="changeReply('everyone')" class="flex items-center gap-4 cursor-pointer rounded hover:bg-gray-200 py-1 px-2">
          <i class='bx bx-world'></i>
          <p>Everyone</p>
        </div>
        <div @click="changeReply('no-one')" class="flex items-center gap-4 cursor-pointer rounded hover:bg-gray-200 py-1 px-2">
          <i class='bx bx-user-check'></i>
          <p>People you follow</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      content: '',
      whoReply: 'everyone',
      showReply: false
    }
  },
  methods: {
    toggleReply(){
      this.showReply = !this.showReply
    },
    changeReply(who){
      this.whoReply = who
      this.toggleReply()
    },
    async newTweet(){
      let response = await this.$axios.$post('/tweets', {
        userId: this.$auth.user._id,
        content: this.tweet.content
      })
      this.tweet.content = ''

    }
  }
  
}
</script>

<style>
.show-reply {
  bottom: -125px;
  left: 50px;
}
</style>