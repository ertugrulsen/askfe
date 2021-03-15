import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  REGISTER_REQUEST,
  REGISTER_ERROR
} from '../actions/auth'
import AuthService from '../../services/AuthService'

const state = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || '',
  accesstoken: localStorage.getItem('accesstoken') || '',
  refreshtoken: localStorage.getItem('refreshtoken') || ''
}

const getters = {
  isAuthenticated: state => !!state.accesstoken,
  currentUser: state => state.currentUser
}

const actions = {
  [AUTH_REQUEST]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      AuthService.Login(request).then(response => {
        console.log("module", response)
        commit(AUTH_SUCCESS, response)
        resolve(response)
      })
        .catch(error => {
          console.log("module error", error)
          localStorage.removeItem('currentUser')
          localStorage.removeItem('accesstoken')
          localStorage.removeItem('refreshtoken')
          commit(AUTH_ERROR)
          reject(error)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      AuthService.Logout()
      commit(AUTH_LOGOUT)
      localStorage.removeItem('currentUser')
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('refreshtoken')
      resolve()
    })
  },
  [REGISTER_REQUEST]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      AuthService.Register(request).then(response => {
        commit(AUTH_SUCCESS, response)
        resolve(response)
      })
        .catch(error => {
          localStorage.removeItem('currentUser')
          localStorage.removeItem('accesstoken')
          localStorage.removeItem('refreshtoken')
          commit(REGISTER_ERROR)
          reject(error)
        })
    })
  }
}

const mutations = {
  [AUTH_SUCCESS]: (state, response) => {
    state.currentUser = { UserName: response.data.Response.UserName, Roles: response.data.Response.Roles, CompanyId: response.data.Response.CompanyId }
    state.accesstoken = response.data.Response.AccessToken
    state.refreshtoken = response.data.Response.RefreshToken
  },
  [AUTH_ERROR]: state => {
    state.currentUser = null
    state.accesstoken = null
    state.refreshtoken = null
  },
  [AUTH_LOGOUT]: state => {
    state.currentUser = ''
    state.accesstoken = ''
    state.refreshtoken = ''
  },
  [REGISTER_REQUEST]: (state, response) => {
    state.currentUser = { UserName: response.data.Response.UserName, Roles: response.data.Response.Roles, CompanyId: response.data.Response.CompanyId }
    state.accesstoken = response.data.Response.AccessToken
    state.refreshtoken = response.data.Response.RefreshToken
  },
  [REGISTER_ERROR]: state => {
    state.currentUser = null
    state.accesstoken = null
    state.refreshtoken = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
