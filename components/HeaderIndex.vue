<template>
  <header class="flex items-center justify-between">
    <div class="ml-2">
      <p>Twetter</p> 
    </div>
    <nav class="mr-2 flex gap-2">
      <NuxtLink class="hover:bg-blue-500 hover:text-white px-4 py-1 rounded-md" to="/login">Login</NuxtLink>
      <NuxtLink class="hover:bg-blue-500 hover:text-white px-4 py-1 rounded-md" to="/register">Register</NuxtLink>
    </nav>
  </header>
</template>