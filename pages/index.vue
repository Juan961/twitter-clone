<template>
  <main class="flex h-screen">
    <div class="hidden lg:block w-5/12 bg-cover bg-center bg-no-repeat" :style="{'background-image': `url(${require('@/static/background.jpg')})`}" ></div>
    <section class="flex flex-col justify-between w-full px-5 py-10 md:px-10 lg:w-7/12">
      <div>
        <h1 class="font-bold text-7xl">Happening now</h1>
        <h2 class="font-bold text-3xl">Join Twetter today.</h2>  
      </div>

      <div class="flex flex-col gap-4">
        <div>
          <NuxtLink to="/register" class="transition px-5 py-1 w-full border bg-blue-500 border-blue-500 text-white font-bold hover:bg-blue-600 rounded-2xl">Sign up with email</NuxtLink>
        </div>

        <p class="font-bold">Already have an account?</p>

        <div>
          <NuxtLink to="/login" class="transition px-5 py-1 w-full border bg-white border-gray-400 text-blue-500 font-bold hover:bg-blue-50 rounded-2xl">Sign in</NuxtLink>
        </div>
      </div>
      
    </section>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  head: {
    title: 'Tweeter'
  },
  mounted(){
    if (this.$auth.user) {
      this.$router.push('/home')
    }
  },
  auth: false
}
</script>

<style>

main {
  min-height: calc(100vh - 50px);
}

@media (max-width: 768px) {
  main {
    min-height: calc(100vh - 100px);
  } 
}
</style>