module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'De Bouwende Macht',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Wie heeft de macht in Rotterdam?' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#ff738e' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */

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
