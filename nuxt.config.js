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
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // Hack to get vue-svg-loader to work
      // See: https://github.com/nuxt/nuxt.js/issues/1584
      // get and remove file loader
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg)$/')
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      // add it again, but now without 'gate-icon' entries
      config.module.rules.push({
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]',
        },
      });

      config.module.rules.push({
        test: /\.svg$/,
        exclude: /(assets\/map|static)/, // skip map.svg and static svgs
        loader: 'svg-url-loader',
      })

      config.module.rules.push({
        test: /assets\/map\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              { cleanupIDs: false }
            ]
          }
        }
      })

      config.module.rules.push({
        test: /.svg$/,
        loader: 'file-loader',
        include: /static/
      })
    }
  },
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-26911216-2'
    }]
  ]
}
