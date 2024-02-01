import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { pl } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    locale: {
      locale: 'pl',
      fallback: 'pl',
      messages: { pl },
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#004e90',
            secondary: '#c2e7ff'
          }
        },
      },
    }
  })
  app.vueApp.use(vuetify)
})