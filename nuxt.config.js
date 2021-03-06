module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Bouwen is Macht',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Wie heeft de macht in Rotterdam?' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'https://www.datocms-assets.com/5547/1528381276-bouwen-is-macht.png' },
      { name: 'og:title', content: 'Bouwen is Macht' },
      { name: 'og:description', content: 'Bouw hier jouw Rotterdam' },
      { name: 'og:image', content: 'https://www.datocms-assets.com/5547/1528381276-bouwen-is-macht.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#ff738e' },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets: ['vue-app', ['env', { useBuiltIns: true }]],
    },

    extend (config, { isDev, isClient }) {
      const urlLoader = config.module.rules.find(rule => rule.loader === 'url-loader');
      urlLoader.test = /\.(png|jpe?g|gif)$/;

      // Add svg loader (see above)
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [ { cleanupIDs: false } ]
          }
        }
      });

      config.module.rules.push({
        test: /\.wav$/,
        loader: 'url-loader'
      });

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      };
    }
  },
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-26911216-2'
    }]
  ]
}
