<template>
  <div class="h-screen">
    <HeaderIndex />

    <main class="flex justify-center items-center">
      <LoginForm />
    </main>  
  </div>
  
</template>

<script>
export default {
  name:'LoginPage',
  mounted(){
    if (this.$auth.user) {
      this.$router.push('/home')
    }
  },
  head: {
    title: 'Login'
  }
}
</script>