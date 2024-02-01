// https://nuxt.com/docs/api/configuration/nuxt-config
import runtimeConfig from './runtime.config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },
  //ssr: false,
  devServer: {
    https: {
    key: 'localhost-key.pem',
    cert: 'localhost.pem'
    }
  },
  modules: [
    '@sidebase/nuxt-auth',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],
  runtimeConfig,
  build: {
    transpile: ['vuetify'],
  },
  auth: {
    isEnabled: true,
    globalAppMiddleware: true,
    baseURL: process.env.AUTH_ORIGIN
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
