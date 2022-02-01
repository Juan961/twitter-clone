<template>
  <div class="bg-white rounded px-2 py-2">
    <p class="text-sm font-bold">Trends for you</p>
    <hr>
    <div v-for="trend in trends" :key="trend.id" class="my-2">
      <p class="font-bold"> #{{ trend.name }} </p>
      <p class="text-gray-400 text-sm"> {{ trend.tweets.length }} Tweets</p>
    </div>
    <div v-if="trends.length <= 0" class="my-2">
      <p>We don have trends right now :(</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      trends: []
    }
  },
  async mounted(){
    let resultTrends = await this.$axios.$get('/tweets/trends')
    this.trends = resultTrends.trends
  }
}
</script>