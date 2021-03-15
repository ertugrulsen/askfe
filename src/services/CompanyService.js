import ApiCall from '../library/helpers/apicall'

export default class CompanyService {
  // get company information
  static async GetCompanyInformation (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('Company/GetCompany', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async UpdateCompanyInformation (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('Company/UpdateCompany', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
