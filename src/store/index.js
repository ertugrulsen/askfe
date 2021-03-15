import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import management from './modules/management'
import company from './modules/company'
import user from './modules/user'
import question from './modules/question'
import answer from './modules/answer'
import comment from './modules/comment'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    management,
    company,
    user,
    question,
    answer,
    comment
  }
})
