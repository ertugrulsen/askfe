import ApiCall from '../library/helpers/apicall'

export default class AuthService {
  static async Login (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    return new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('AskAuthentication/AskLogin', request, headers)
        .then(response => {
          localStorage.setItem('currentUser', JSON.stringify({ UserId: response.data.Response.Id, UserName: response.data.Response.UserName, Roles: response.data.Response.Roles }))
          localStorage.setItem('accesstoken', response.data.Response.AccessToken)
          localStorage.setItem('refreshtoken', response.data.Response.RefreshToken)

          resolve(response)
        })
        .catch(error => {
          localStorage.removeItem('currentUser')
          localStorage.removeItem('accesstoken')
          localStorage.removeItem('refreshtoken')

          reject(error)
        })
    })
  }

  static async Register (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    return new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('AskAuthentication/AskRegister', request, headers)
        .then(response => {
          localStorage.setItem('currentUser', JSON.stringify({ UserId: response.data.Response.Id,UserName: response.data.Response.UserName, Roles: response.data.Response.Roles}))
          localStorage.setItem('accesstoken', response.data.Response.AccessToken)
          localStorage.setItem('refreshtoken', response.data.Response.RefreshToken)

          resolve(response)
        })
        .catch(error => {
          localStorage.removeItem('currentUser')
          localStorage.removeItem('accesstoken')
          localStorage.removeItem('refreshtoken')

          reject(error)
        })
    })
  }

  static async Logout () {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('AskAuthentication/Logout', {}, headers)
    })
  }
}
