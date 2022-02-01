<template>
  <div>
    <!-- <HomeRefreshTokens /> -->
    <HomeHeaderHome :page="'home'" />
    <main class="grid grid-cols-6 gap-4 bg-gray-100 py-5 px-5">
      <div class="col-span-6 md:col-span-4 md:col-start-2 lg:col-span-3 lg:col-start-2">
        <HomeNewTweet />
        <section class="flex flex-col gap-4 mt-6">
          <HomeTweet v-for="tweet in tweets" :data="tweet" :key="tweet.id" />
        </section>
      </div>
      <div class="hidden lg:flex lg:flex-col lg:gap-4">
        <HomeTrending />
        <HomeFollow />
      </div>
      
    </main>
    <HomeMenuBottom :page="'home'" />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  head: {
    title: 'Home'
  },
  data(){
    return {
      tweets: [],
      status: '',
    }
  },
  methods: {
    async getUser(id){
      let result = await this.$axios.$get(`/users/${id}`)

      return result
    }
  },
  async mounted(){
    let resultTweets = await this.$axios.$get('/tweets')
    this.tweets = resultTweets.tweets
    this.status = this.$auth.strategy.token.status().valid()
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