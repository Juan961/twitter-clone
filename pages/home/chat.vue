<template>
  <div>
    <HomeHeaderHome :page="'explore'" />
    <main class="flex justify-center items-center bg-gray-100">
      <div class="bg-white px-4 py-4 rounded shadow">
        <p class="text-lg">Sorry, this feature is not ready yet.</p>  
      </div>
    </main>
    <HomeMenuBottom :page="'explore'" />
  </div>
</template>

<script>
export default {
  name: 'HomeChatPage',
  head: {
    title: 'Chat'
  }
}
</script>
