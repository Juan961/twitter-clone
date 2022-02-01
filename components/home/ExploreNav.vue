<template>
  <nav class="bg-white rounded px-2 py-2">
    <div :class="{'border-l-4': selected=='top'}" class="w-full border-blue-500">
      <p @click="select('top')" :class="{'text-blue-500': selected=='top'}" class="pl-2 font-bold text-gray-400 hover:text-blue-500 cursor-pointer">Top</p>
    </div>
    <div :class="{'border-l-4': selected=='lastest'}" class="w-full border-blue-500">
      <p @click="select('lastest')" :class="{'text-blue-500': selected=='lastest'}" class="pl-2 font-bold text-gray-400 hover:text-blue-500 cursor-pointer">Lastest</p>
    </div>
    <div :class="{'border-l-4': selected=='people'}" class="w-full border-blue-500">
      <p @click="select('people')" :class="{'text-blue-500': selected=='people'}" class="pl-2 font-bold text-gray-400 hover:text-blue-500 cursor-pointer">People</p>
    </div>
    <div :class="{'border-l-4': selected=='media'}" class="w-full border-blue-500">
      <p @click="select('media')" :class="{'text-blue-500': selected=='media'}" class="pl-2 font-bold text-gray-400 hover:text-blue-500 cursor-pointer">Media</p>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return {
      selected: 'top'
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