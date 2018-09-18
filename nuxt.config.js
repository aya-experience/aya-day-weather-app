const config = {
  isDev: process.env.NODE_ENV === 'dev' ? true : false
};

// Changes the website's base to work on Github pages
const routerBase =
  process.env.NODE_ENV === 'gh_pages'
    ? {
        router: {
          base: '/aya-day-weather-app/'
        }
      }
    : {};

module.exports = {
  ...routerBase,

  /*
  ** Headers of the page
  */
  head: {
    title: 'Aya Weather App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato:300,400'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        });
      }
    }
  },

  env: {
    isDev: config.isDev, // True if we are in dev mode, false otherwise
    baseUrl_dev: 'http://localhost:8080', // API URL used in dev
    baseUrl: '' // Define production API URL
  }
};
