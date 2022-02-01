<template>
  <div>
    <HomeHeaderHome />
    <main class="flex flex-col items-center justify-center bg-gray-100 sm:px-5 sm:py-5">
      <div class="flex flex-col items-center gap-3.5 bg-white w-full md:w-96 py-5 px-3 my-4 rounded-xl">
        <div class="flex flex-col w-full">
          <label for="name">Name</label>
          <input v-model="new_profile.name" class="bg-gray-100 rounded py-2 px-2" type="text" id="name" placeholder="Name">
        </div>

        <div class="flex flex-col w-full">
          <label for="bio">Bio</label>
          <textarea v-model="new_profile.bio" class="bg-gray-100 rounded py-2 px-2 resize-none" type="text" id="Bio" placeholder="Bio"></textarea>
        </div>
        
        <div class="flex flex-col w-full">
          <label for="old_password">Old password</label>
          <input v-model="new_profile.old_password" class="bg-gray-100 rounded py-2 px-2" type="password" id="old_password" placeholder="Old password">
        </div>
        
        <div class="flex flex-col w-full">
          <label for="new_password">New Password</label>
          <input v-model="new_profile.password" class="bg-gray-100 rounded py-2 px-2 disabled:" :disabled="new_profile.old_password.length === 0" type="password" id="new_password" placeholder="New password">
          <p class="bg-red-600 bg-opacity-75 rounded text-white px-2 mt-2" v-if="new_profile.old_password.length == 0">You have to put your old password first</p>
        </div>
        
        <div class="flex flex-col w-full">
          <label for="new_password_repeat">New Password Repeat</label>
          <input v-model="new_profile.password_repeat" class="bg-gray-100 rounded py-2 px-2" :disabled="new_profile.old_password.length === 0" type="password" id="new_password_repeat" placeholder="New password repeat">
          <p class="bg-red-600 bg-opacity-75 rounded text-white px-2 mt-2" v-if="new_profile.password !== new_profile.password_repeat">The password dosen't match</p>
        </div>
        
        <div class="flex flex-col w-full">
          <label for="avatar">Avatar</label>
          <input key="avatar" @change="getImageAvatar" type="file" src="" alt="" accept="image/*">
          <div>
            <img v-if="urlAvatar" :src="urlAvatar" alt="">
          </div>
        </div>
        
        <div class="flex flex-col w-full">
          <label for="background">Background</label>
          <input key="background" @change="getImageBack" type="file" src="" alt="" accept="image/*">
          <div>
            <img v-if="urlBackground" :src="urlBackground" alt="">
          </div>
        </div>

        <button @click="createNewProfile" class="bg-blue-500 text-white rounded px-4 py-1">Send</button>
      </div>

      <div class="self-end ">
        <button @click="deleteAccount" class="bg-red-500 text-white rounded px-4 py-1">Delete account</button>
      </div>

    </main>
    <HomeMenuBottom />
  </div>
</template>

<script>
export default {
  head: {
    title: 'Account',
  },
  data(){
    return {
      new_profile: {
        name: '',
        email: '',
        old_password: '',
        password: '',
        password_repeat: '',
        bio: '',
        avatar: '',
        background: ''
      },
      old_profile: {},
      urlAvatar: null,
      urlBackground: null,
    }
  },
  async mounted(){
    let result = await this.getOldProfile()

    this.old_profile = result.user
  },
  methods: {
    async getOldProfile(){
      const logUser = this.$auth.user._id

      const result = this.$axios.$get(`/users/${logUser}`)

      return result
    },
    async createNewProfile(){
      alert("This feature is not available yet")
    },
    async deleteAccount(){
      const logUser = this.$auth.user._id
      const result = await this.$axios.$delete(`/users/${logUser}`)
      alert("Your account has been deleted")
      this.$router.push('/')
    },
    getImageAvatar(e){
      let file = e.target.files[0]
      this.new_profile.avatar = file
      this.urlAvatar = URL.createObjectURL(file)
    },
    getImageBack(e){
      let file = e.target.files[0]
      this.new_profile.background = file
      this.urlBackground = URL.createObjectURL(file)
    }
  }
}
</script>