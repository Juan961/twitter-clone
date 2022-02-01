<template>
  <div class="relative mb-4">
    <input v-model="value" class="w-full rounded py-2 shadow" type="text" placeholder="Search">
    <i class='bx bx-search icon-search text-2xl text-gray-300'></i>
    <button @click="search" class="btn-search bg-blue-500 text-white px-4 py-1 rounded">Search</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value: ''
    }
  },
  methods: {
    search(){
      this.$emit('search', this.value)
    }
  }
}
</script>

<style scoped>
.icon-search {
  position: absolute;
  top: 5px;
  left: 10px;
}

.btn-search {
  position: absolute;
  top: 4px;
  right: 5px;
}

input {
  padding-left: 40px;
  padding-right: 100px;
}
</style>