// https://nuxt.com/docs/api/configuration/nuxt-config
import runtimeConfig from './runtime.config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },
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
    globalAppMiddleware: true
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
