<template>
  <v-app>
    <SystemBar />
    <Home v-if="ready" />
    <Footer :emailEndpoint="mailEndpoint" v-if="ready" />
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import 'pineapple-styles'

/* SystemBar */
import 'pineapple-system-bar'
import 'pineapple-system-bar/dist/pineapple-system-bar.css'

/* HowToConnect */
import 'pineapple-how-to-connect'
import 'pineapple-how-to-connect/dist/pineapple-how-to-connect.css'

/* Testimonials */
import 'pineapple-testimonials'
import 'pineapple-testimonials/dist/pineapple-testimonials.css'

/* Popup */
import 'pineapple-popup'
import 'pineapple-popup/dist/pineapple-popup.css'

/* UserContact */
import 'pineapple-contact-form'
import 'pineapple-contact-form/dist/pineapple-contact-form.css'

/* FAQ */
import 'pineapple-faq'
import 'pineapple-faq/dist/pineapple-faq.css'

import Home from '@/views/Home.vue'

/* Footer */
import 'pineapple-footer'
import 'pineapple-footer/dist/pineapple-footer.css'

export default {
  name: 'App',

  components: {
    Home
  },

  data () {
    return {
      ready: false,
      page: null
    }
  },
  computed: {
    ...mapState(['viewportWidth', 'pages', 'selectors']),
    ...mapState('content', ['browserTabTitle', 'footer']),
    ...mapState('contact', ['mailEndpoint'])
  },
  methods: {
    ...mapActions('content', {
      getContent: 'GET_CONTENT'
    }),
    ...mapActions('testimonials', {
      getTestimonials: 'GET_CONTENT'
    }),
    onResize () {
      this.$store.commit('CHANGE_VIEWPORT')
    }
  },
  created () {
    this.getContent(5)
      .then((response) => {
        document.title = response.browserTabTitle
        this.ready = true
      })
    this.getTestimonials()
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  }
}
</script>
