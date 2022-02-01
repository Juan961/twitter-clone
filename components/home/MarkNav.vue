<template>
  <nav class="bg-white rounded px-2 py-2 shadow">
    <div :class="{'border-l-4': selected=='tweets'}" class="w-full border-blue-500">
      <p @click="select('tweets')" :class="{'text-blue-500': selected=='tweets'}" class="pl-2 font-bold text-gray-400 hover:text-blue-500 cursor-pointer">Tweets</p>
    </div>
    <div :class="{'border-l-4': selected=='replies'}" class="w-full border-blue-500">
      <p @click="select('replies')" :class="{'text-blue-500': selected=='replies'}" class="pl-2 font-bold text-gray-400 hover:text-blue-500 cursor-pointer">Tweets & replies</p>
    </div>
    <div :class="{'border-l-4': selected=='media'}" class="w-full border-blue-500">
      <p @click="select('media')" :class="{'text-blue-500': selected=='media'}" class="pl-2 font-bold text-gray-400 hover:text-blue-500 cursor-pointer">Media</p>
    </div>
    <div :class="{'border-l-4': selected=='likes'}" class="w-full border-blue-500">
      <p @click="select('likes')" :class="{'text-blue-500': selected=='likes'}" class="pl-2 font-bold text-gray-400 hover:text-blue-500 cursor-pointer">Likes</p>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return {
      selected: 'tweets'
    }
  },
  methods: {
    select(type){
      this.selected = type
      this.$emit('selection', this.selected)
    }
  }
}
</script>

