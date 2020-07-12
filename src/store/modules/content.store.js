/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {}

const getters = {
  contentEndpoint: (state, getters, rootState) => `${rootState.host}/content/5`
}

/* eslint-disable no-console */

const mutations = {
  UPDATE_ALL: (state, payload) => {
    for (const field in payload) {
      if (typeof payload[field] !== 'object') {
        state[field] = payload[field] || state[field]
      } else {
        if (Array.isArray(payload[field])) {
          state[field] = Object.assign([], payload[field])
        } else {
          state[field] = Object.assign({}, payload[field])
        }
      }
    }
  }
}

const actions = {
  async GET_CONTENT ({ getters, commit, dispatch }) {
    const content = await (await fetch(getters.contentEndpoint)).json()
    commit('UPDATE_PAGES', { pages: content.mainNavButtons, selectors: content.mainNavSectors }, { root: true })
    commit('contact/UPDATE_EMAIL_SUBJECT', content.emailSubject, { root: true })
    commit('contact/UPDATE_EMAIL_TEXT', content.emailText, { root: true })
    const browserTabTitle = content.browserTabTitle
    for (const field of ['mainNavButtons', 'mainNavSectors', 'browserTabTitle', 'emailSubject', 'emailText']) {
      delete content[field]
    }
    // commit('UPDATE_ALL', content)
    for (const field in content) {
      commit('SET_PROPERTY', {
        object: state,
        propertyName: field,
        value: content[field]
      }, { root: true })
    }
    return {
      browserTabTitle,
      fieldsToShow: content.userForm.fieldsToShow
    }
  }

  // UPDATE_ALL (context, payload) {
  //   console.log(context)
  //   for (const prop in payload) {
  //     context.commit('SET_PROPERTY', {
  //       object: context.state,
  //       propertyName: prop,
  //       value: payload[prop]
  //     }, { root: true })
  //     if (prop === 'userForm') {
  //       console.log(prop)
  //       console.log(payload[prop])
  //       context.commit('SET_PROPERTY', {
  //         object: context.state.userForm,
  //         propertyName: 'fieldsToShow',
  //         value: JSON.parse(JSON.stringify(payload[prop].fieldsToShow))
  //       }, { root: true })
  //     }
  //   }
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
