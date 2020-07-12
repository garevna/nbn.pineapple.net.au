import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'https://api.pineapple.net.au',
    landhost: `${location.origin}${location.pathname}`,
    officeAddress: '75 Brighton Road, Elwood VIC 3184',
    officePhone: '1300 857 501',
    officeEmail: 'info@pineapple.net.au',
    officeABN: '55 618 934 437',
    linkedIn: 'https://www.linkedin.com/company/pineapplenet/',
    faceBook: 'https://www.facebook.com/PineappleNetAU/',
    contactEndpoint: '',
    viewport: 'lg',
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    pages: [],
    selectors: [],
    plan: 'residential'
  },
  modules,

  getters: {
    //
  },

  mutations: {
    UPDATE_PAGES: (state, payload) => {
      state.pages = Object.assign([], payload.pages)
      state.selectors = Object.assign([], payload.selectors)
    },
    CHANGE_VIEWPORT: (state) => {
      state.viewportWidth = window.innerWidth
      state.viewportHeight = window.innerHeight
    },

    CHANGE_PLAN: (state, plan) => { state.plan = plan },

    ERROR_HANDLER: (state, { moduleName, error }) => {
      state.errorsLog.push({
        module: moduleName,
        error,
        time: new Date().getTime()
      })
    },
    ERRORS_CLEAR: (state) => {
      state.errorsLog = []
    },
    SET_PROPERTY: (state, payload) => {
      Vue.set(payload.object, payload.propertyName, payload.value)
    },
    DELETE_PROPERTY: (state, payload) => {
      Vue.delete(payload.object, payload.propertyName)
    }
  },
  actions: {
  }
})
