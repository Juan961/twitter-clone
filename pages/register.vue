<template>
  <div class="h-screen">
    <HeaderIndex />

    <main class="flex justify-center items-center">
      <RegisterForm />
    </main>  
  </div>
  
</template>

<script>
export default {
  name:'RegisterPage',
  mounted(){
    if (this.$auth.user) {
      this.$router.push('/home')
    }
  },
  head: {
    title: 'Register'
  },
  auth: false
}
</script>