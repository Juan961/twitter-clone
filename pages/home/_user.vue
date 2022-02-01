<template>
  <div :class="{'overflow-hidden': showFollowing || showFollowers}">
    <HomeHeaderHome />
    <main class="bg-gray-100">
      <div >
        <HomeUserHead :data="user" @toggleFollowing="toggleFollowing" @toggleFollowers="toggleFollowers" />
      </div>
      <div class="grid grid-cols-6 gap-4 mt-4 pb-4">
        <div class="col-span-6 md:col-span-1 md:col-start-2">
          <HomeMarkNav />

        </div>
        <div v-if="tweets.length > 0" class="flex flex-col gap-4 col-span-6 md:col-span-3">
          <HomeTweet v-for="tweet in tweets" :data="tweet" :key="tweet.id" />
        </div>
        <div v-else class="flex flex-col gap-4 col-span-6 md:col-span-3">
          <h3>You dont have tweets yet, go home and publish one</h3>
        </div>
      </div>
    </main>

    <HomeMenuBottom />


    <HomeFollowingList v-if="showFollowing" @closeList="toggleFollowing" :id="user_id" />
    <HomeFollowersList v-if="showFollowers" @closeList="toggleFollowers" :id="user_id" />
  </div>
  
</template>

<script>
export default {
  name: 'HomeUserPage',
  async asyncData({ params }) {
    return {
      user_id: params.user
    }
  },
  data(){
    return {
      tweets: [],
      user: {},
      showFollowers: false,
      showFollowing: false,
    }
  },
  methods: {
    async getUser(id){
      let result = await this.$axios.$get(`/users/${id}`)

      return result
    },
    toggleFollowing(){
      this.showFollowing = !this.showFollowing
    },
    toggleFollowers(){
      this.showFollowers = !this.showFollowers
    },
  },
  async mounted(){
    let result = await this.getUser(this.user_id)
    this.user = result.user

    let resultTweets = await this.$axios.$get(`/tweets/${this.user_id}`)
    this.tweets = resultTweets.tweets
    
  }
}
</script>

<style>
header {
  height: 50px;
}

main {
  min-height: calc(100vh - 50px);
}
</style>