export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'twitter-clone',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' }
    ]
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:4000'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:4000/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    host: "0.0.0.0"
  },
  loading: {
    color: 'blue',
    height: '2px'
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    redirect: {
      login: '/login',
      logut: '/',
      home: '/home'
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access',
          maxAge: 300
        },
        refreshToken: {
          property: 'refresh',
          maxAge: 86400
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/users/login', method: 'post' },
          refresh: { url: '/users/refresh', methods: 'post' },
          user: { url: '/users', method: 'get' }
        },
        autoLogout: true
      },
    }
  }
}
