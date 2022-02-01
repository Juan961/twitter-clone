<template>
  <div>
    <HomeHeaderHome :page="'bookmarks'" />
    <main class="flex flex-col gap-4 md:grid md:grid-cols-6 bg-gray-100 px-5 py-5">
      <div class="md:col-start-2 ">
        <HomeMarkNav @selection="getTweets($event)" />
      </div>
      <div class="md:col-span-3">
        <div class="flex flex-col gap-4" v-if="tweets.length > 0">
          <HomeTweet v-for="tweet in tweets" :data="tweet" :key="tweet.id" />
        </div>
        <div class="flex items-center justify-center bg-white rounded px-4 py-4 shadow" v-else>
          <p>There is nothing here</p>
        </div>
      </div>
      
    </main>
    <HomeMenuBottom :page="'bookmarks'" />
  </div>
</template>

<script>
export default {
  name: 'HomeBookmarksPage',
  head: {
    title: 'Bookmarks'
  },
  async mounted(){
    await this.getTweets('tweets')

  },
  data(){
    return {
      tweets: []
    }
  },
  methods: {
    async getTweets(value){
      const logUser = this.$auth.user._id

      let resultTweets = await this.$axios.$get(`/tweets/bookmarks?user=${logUser}&type=${value}`)

      this.tweets = resultTweets.result

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