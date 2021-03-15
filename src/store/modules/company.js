import { GET_COMPANY_INFORMATION, UPDATE_COMPANY_INFORMATION } from '../actions/company'
import CompanyService from '../../services/CompanyService'

const state = {
  companyInformation: {},
  companyUsers: []
}

const getters = {
  companyInformation: state => state.companyInformation
}

const actions = {
  [GET_COMPANY_INFORMATION]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      CompanyService.GetCompanyInformation(request).then(response => {
        commit(GET_COMPANY_INFORMATION, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [UPDATE_COMPANY_INFORMATION]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      CompanyService.UpdateCompanyInformation(request).then(response => {
        commit(UPDATE_COMPANY_INFORMATION, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const mutations = {
  [GET_COMPANY_INFORMATION]: (state, response) => {
    state.companyInformation = response.data.Response;
  },
  [UPDATE_COMPANY_INFORMATION]: (state, response) => {
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
