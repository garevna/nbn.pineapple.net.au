<template>
  <v-container fluid class="homefone">
    <HomeNavBar :pages="pages" :selected.sync="page" />
    <v-main tag="main" class="homefone">
      <!-- ============================= TOP ============================= -->
      <section id="top" class="mb-12">
        <div class="base-title">
          <a href="#top" class="mr-2 d-inline-flex core-goto text--primary"></a>
          <Top v-if="top"/>
        </div>
      </section>

      <v-sheet
          width="100%"
          max-width="1440"
          color="homefone"
          tile
          class="mx-auto"
      >
        <!-- ============================= BENEFITS ============================= -->

        <v-row align="center" class="mx-0 px-0">
          <v-col cols="12" md="6" class="aside-col">
            <section id="benefits" style="width: 100%">
              <div class="base-title">
                <a href="#benefits" class="core-goto"></a>
                <Aside :info="info" />
              </div>
            </section>
          </v-col>

          <!-- ============================= USER CONTACT ============================= -->

          <v-col cols="12" md="6" class="mx-0 px-0">
            <v-row align="center" justify="center" class="pa-0 my-12">
              <section id="contact" style="width: 100%">
                <div class="base-title">
                  <a href="#contact" class="core-goto"></a>
                  <v-card flat class="transparent mx-0">
                      <v-card
                            flat
                            class="user-contact transparent mx-auto pa-0"
                            style="margin-bottom: 80px"
                      >
                      <UserContact
                            :userForm.sync="userForm"
                            :emailSubject="emailSubject"
                            :emailText="emailText"
                            :emailEndpoint="mailEndpoint"
                            v-if="userForm && userForm.fieldsToShow"
                      />
                      </v-card>
                    </v-card>
                  </div>
                </section>
              </v-row>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- ============================= HOW TO CONNECT ============================= -->

      <v-row width="100%">
        <section id="how-to-connect" style="width: 100%">
          <div class="base-title">
            <a href="#how-to-connect" class="core-goto"></a>
            <HowToConnect :page.sync="goto" />
          </div>
        </section>
      </v-row>

      <!-- ============================= TESTIMONIALS ============================= -->
      <v-row width="100%">
        <Testimonials :content="testimonials" :page.sync="goto" />
      </v-row>

      <!-- ============================= FAQs ============================= -->
      <section id="faq">
        <div class="base-title">
          <a href="#faq" class="core-goto"></a>
            <v-row width="100%">
              <FAQ :page.sync="goto" v-if="faq" />
            </v-row>
        </div>
      </section>

    </v-main>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'

import HomeNavBar from '@/components/HomeNavBar.vue'
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'

export default {
  name: 'Home',
  components: {
    HomeNavBar,
    Aside,
    Top
  },
  data () {
    return {
      ready: false,
      page: 0,
      goto: null
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('content', ['mainNavButtons', 'top', 'info', 'howToConnect', 'faq', 'userForm', 'testimonials']),
    ...mapState('contact', ['mailEndpoint', 'emailSubject', 'emailText']),
    pages () {
      return this.ready ? this.mainNavButtons.map(item => item.buttonText) : []
    }
  },
  watch: {
    mainNavButtons: {
      deep: true,
      handler (val) {
        console.log('MAIN NAV BUTTONS:\n', val)
        this.ready = !!val
      }
    },
    goto (val) {
      if (!val) return
      this.$vuetify.goTo(val, {
        duration: 500,
        offset: 20,
        easing: 'easeInOutCubic'
      })
      this.goto = undefined
    }
  },
  mounted () {
    this.page = undefined
  }
}
</script>
