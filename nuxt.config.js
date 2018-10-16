const config = require('config');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Zenika Weather App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Compétition météo entre les agences Zenika',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato:300,400',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
  },
  modules: [
    'nuxt-healthcheck',
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: config.serviceUrl,
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
    extend(conf, { isDev, isClient }) {
      if (isDev && isClient) {
        conf.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },

  /* TODO: uniformiser quand merge avec le serveur */
  generate: {
    routes: [
      '/agencies/Paris',
      '/agencies/Rennes',
      '/agencies/Singapour',
      '/agencies/Lille',
      '/agencies/Lyon',
      '/agencies/Grenoble',
      '/agencies/Montréal',
      '/agencies/Bordeaux',
      '/agencies/Nantes',
    ],
  },
};
