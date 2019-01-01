var config = require('config');
const projectVars = config.get('Config');

const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: "“What Am Politics?” Podcasting Triathalon",
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content: `${projectVars.PublicPath}wap-img.jpg`
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Amatic+SC:400,700'
      }

    ]
  },


  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#57bcc6'
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
   { src: '~plugins/ga.js', ssr: false }
 ],

  router: {
    base: projectVars.BuildPath
  },


  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: projectVars.PublicPath,
    extend(config, ctx) {

    }
  }
}
