<template>
  <form enctype="multipart/form-data" @submit.prevent="register" class="flex flex-col items-center gap-3.5 bg-gray-200 w-full md:w-96 py-5 px-3 my-4 rounded-xl">
    <div class="w-full">
      <div class="flex justify-between">
        <div :class="{'progress-blue': step == 1}" class="progress"></div>
        <div :class="{'progress-blue': step == 2}" class="progress"></div>
        <div :class="{'progress-blue': step == 3}" class="progress"></div>
        <div :class="{'progress-blue': step == 4}" class="progress"></div>
      </div>
      <h2>Register</h2>
    </div>

    <section v-if="step == 1" class="flex flex-col gap-2 w-full">
      <div> 
        <h3>Step 1</h3>
        <p>General info</p>
      </div>
      
      <div class="flex flex-col gap-2 w-full">
        <input v-model="user.name" type="text" class="rounded-xl px-4 py-2" placeholder="Name">
        <input v-model="user.email" type="email" class="rounded-xl px-4 py-2" placeholder="Email">
        <input v-model="user.password" type="password" class="rounded-xl px-4 py-2" placeholder="Password">
      </div>
      
      <div class="flex justify-end">
        <p @click="pass" class="bg-blue-500 text-white w-20 py-1 rounded-xl cursor-pointer text-center">Next</p>
      </div>
      
    </section>

    <section v-if="step == 2" class="flex flex-col gap-2 w-full">
      <div>
        <h3>Step 2</h3>
        <p>Bio</p>
      </div>
      
      <textarea v-model="user.bio" class="w-full resize-none rounded-xl px-4 py-2" name="" id="" maxlength="230" placeholder="Tell us about you"></textarea>
      
      <div class="flex justify-between">
        <p @click="back" class="bg-blue-500 text-white w-20 py-1 rounded-xl cursor-pointer text-center">Back</p>
        <p @click="pass" class="bg-blue-500 text-white w-20 py-1 rounded-xl cursor-pointer text-center">Next</p>
      </div>
      
    </section>
    
    <section v-if="step == 3" class="flex flex-col gap-2 w-full">
      <div>
        <h3>Step 3</h3>
        <p>Profile picture</p>
      </div>

      <input key="avatar" @change="getImageAvatar" type="file" src="" alt="" accept="image/*">

      <div>
        <img v-if="urlAvatar" :src="urlAvatar" />
      </div>

      <div class="flex justify-between">
        <p @click="back" class="bg-blue-500 text-white w-20 py-1 rounded-xl cursor-pointer text-center">Back</p>
        <p @click="pass" class="bg-blue-500 text-white w-20 py-1 rounded-xl cursor-pointer text-center">Next</p>
      </div>
      
    </section>

    <section v-if="step == 4" class="flex flex-col gap-2 w-full">
      <div>
        <h3>Step 4</h3>
        <p>Header photo</p>
      </div>
      
      <input key="background" @change="getImageBack" type="file" src="" alt="" accept="image/*">
      
      <div>
        <img v-if="urlBackground" :src="urlBackground" />
      </div>

      <div class="flex justify-between">
        <p @click="back" class="bg-blue-500 text-white w-20 py-1 rounded-xl cursor-pointer text-center">Back</p>
        <button class="bg-blue-500 text-white w-20 py-1 rounded-xl" type="submit">Register</button>
      </div>
      
    </section>

  </form>
</template>

<script>
export default {
  data(){
    return {
      user: {
        name: '',
        email: '',
        password: '',
        bio: '',
        avatar: '',
        background: ''
      },
      urlAvatar: null,
      urlBackground: null,
      step: 1
    }
  },
  methods: {
    async register(){
      console.log(this.user)

      this.$axios.setHeader('Content-Type', '`multipart/form-data', [ 'post' ])
      let form = new FormData()
      form.append('name', this.user.name)
      form.append('email', this.user.email)
      form.append('password', this.user.password)
      form.append('bio', this.user.bio)
      form.append('avatar', this.user.avatar)
      form.append('background', this.user.background)

      const response = await this.$axios.$post('/users', form)

      if(response.status === 200){
        alert("User created")
        this.$router.push('/login')
      }
    },
    back(){
      this.step -= 1
    },
    pass(){
      this.step += 1
    },
    getImageAvatar(e){
      const file = e.target.files[0]
      this.urlAvatar = URL.createObjectURL(file)
      this.user.avatar = file
    },
    getImageBack(e){
      const file = e.target.files[0]
      this.urlBackground = URL.createObjectURL(file)
      this.user.background = file
    }

  }
}
</script>

<style>

.progress {
  height: 7px;
  width: 24%;
  background: grey;
  border-radius: 2px;
}

.progress-blue {
  background: #3b82f6;
}
</style>