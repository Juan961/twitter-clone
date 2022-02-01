<template>
  <div>
    <HomeHeaderHome :page="'explore'" />
    <main class="flex flex-col gap-4 md:grid md:grid-cols-6 bg-gray-100 px-5 py-5">
      <div class="md:col-start-2 ">
        <HomeExploreNav @selection="getTweets($event)" />
      </div>
      <div class="md:col-span-3">
        <HomeSearch @search="search($event)" />
        <div class="flex flex-col gap-4">
          
          <HomeTweet v-for="tweet in tweets" :data="tweet" :key="tweet.id" />
          
          <HomeUserProfile v-for="user in users" :data="user" :key="user.id" />

          <div v-if="tweets.lenght == 0 || users.lenght == 0">
            <p>There is nothing here</p>
          </div>

        </div>
      </div>
      
    </main>
    <HomeMenuBottom :page="'explore'" />
  </div>
</template>

<script>
export default {
  name: 'HomeExplorePage',
  head: {
    title: 'Explore'
  },
  async mounted(){
    let resultTweets = await this.$axios.$get('/tweets')
    this.tweets = resultTweets.tweets
  },
  data(){
    return {
      tweets: [],
      users: [],
      type: 'top'
    }
  },
  methods: {
    getTweets(value){
      this.type = value
    },
    async search(data){
      
      if (this.type == 'people') {
        this.tweets = []
        const users = await this.$axios.$get(`/users/search?value=${data}`)
        console.log(users)
        this.users = users.result 

      } else {
        this.users = []
        const tweets = await this.$axios.$get(`/tweets/search?search=${data}&type=${this.type}`)
        console.log(tweets)
        this.tweets = tweets.result 
      }
      
    }
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
