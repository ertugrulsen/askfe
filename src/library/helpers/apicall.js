import Axios from 'axios'
import { refreshToken } from './refreshtoken'
import configStore from './configStore'
import router from '../../router/index'
import { AUTH_LOGOUT } from '../../store/actions/auth'
import store from '../../store'

export default class ApiCall {
    baseUrl = '';
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    constructor () {
      this.baseUrl = (process.env.NODE_ENV === 'production' ? configStore.settings.publishUrl : configStore.settings.localUrl)
    }

    async AxiosGetAll (url, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'get',
          url: this.baseUrl + url,
          headers: this.headers
        })
          .catch(error => {
            if (error.response.status === 401 && localStorage.getItem('accesstoken')) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
                      resolve(this.AxiosGetAll(url, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.currentRoute.query.returnUrl = router.currentRoute.path
                          router.push({path:'/login',query:router.currentRoute.query})
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.currentRoute.query.returnUrl = router.currentRoute.path
                    router.push({path:'/login',query:router.currentRoute.query})
                  })
              })
            } else if (error.response.status === 401 && !localStorage.getItem('accesstoken')) {
              router.currentRoute.query.returnUrl = router.currentRoute.path
              router.push({path:'/login',query:router.currentRoute.query})
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(response => {
            if (response && response.data && !response.data.IsSucceed && response.data.ErrorCode) {
              reject(response.data.ErrorCode)
            } else {
              resolve(response)
            }
          })
      })
    }

    async AxiosReadFile (url, item, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'post',
          url: this.baseUrl + url,
          data: item,
          headers: this.headers,
          responseType: 'arraybuffer'
        })
          .catch(error => {
            if (error.response.status === 401 && localStorage.getItem('accesstoken')) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
                      resolve(this.AxiosReadFile(url, item, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.currentRoute.query.returnUrl = router.currentRoute.path
                          router.push({path:'/login',query:router.currentRoute.query})
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.currentRoute.query.returnUrl = router.currentRoute.path
                    router.push({path:'/login',query:router.currentRoute.query})
                  })
              })
            } else if (error.response.status === 401 && !localStorage.getItem('accesstoken')) {
              router.currentRoute.query.returnUrl = router.currentRoute.path
              router.push({path:'/login',query:router.currentRoute.query})
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(resp => {
            resolve(resp)
          })
      })
    }

    async AxiosGetWithId (url, item, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'get',
          url: this.baseUrl + url,
          data: item,
          headers: this.headers
        })
          .catch(error => {
            if (error.response.status === 401 && localStorage.getItem('accesstoken')) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
                      resolve(this.AxiosGetWithId(url, item, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.currentRoute.query.returnUrl = router.currentRoute.path
                          router.push({path:'/login',query:router.currentRoute.query})
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.currentRoute.query.returnUrl = router.currentRoute.path
                    router.push({path:'/login',query:router.currentRoute.query})
                  })
              })
            } else if (error.response.status === 401 && !localStorage.getItem('accesstoken')) {
              router.currentRoute.query.returnUrl = router.currentRoute.path
              router.push({path:'/login',query:router.currentRoute.query})
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(response => {
            if (response && response.data && !response.data.IsSucceed && response.data.ErrorCode) {
              reject(response.data.ErrorCode)
            } else {
              resolve(response)
            }
          })
      })
    }

    async AxiosPost (url, item, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'post',
          url: this.baseUrl + url,
          data: item,
          headers: this.headers
        })
          .catch(error => {
            if (error.response.status === 401 && localStorage.getItem('accesstoken')) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
                      resolve(this.AxiosPost(url, item, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.currentRoute.query.returnUrl = router.currentRoute.path
                          router.push({path:'/login',query:router.currentRoute.query})
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.currentRoute.query.returnUrl = router.currentRoute.path
                    router.push({path:'/login',query:router.currentRoute.query})
                  })
              })
            } else if (error.response.status === 401 && !localStorage.getItem('accesstoken')) {
              router.currentRoute.query.returnUrl = router.currentRoute.path
              router.push({path:'/login',query:router.currentRoute.query})
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(response => {
            if (response && response.data && !response.data.IsSucceed && response.data.ErrorCode) {
              reject(response.data.ErrorCode)
            } else {
              resolve(response)
            }
          })
      })
    }

    async AxiosPut (url, item, _headers) {
      this.headers = { ...this.headers, ..._headers }

      return await new Promise((resolve, reject) => {
        Axios({
          method: 'put',
          url: this.baseUrl + url,
          data: item,
          headers: this.headers
        })
          .catch(error => {
            if (error.response.status === 401 && localStorage.getItem('accesstoken')) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
                      resolve(this.AxiosPut(url, item, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.currentRoute.query.returnUrl = router.currentRoute.path
                          router.push({path:'/login',query:router.currentRoute.query})
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.currentRoute.query.returnUrl = router.currentRoute.path
                    router.push({path:'/login',query:router.currentRoute.query})
                  })
              })
            } else if (error.response.status === 401 && !localStorage.getItem('accesstoken')) {
              router.currentRoute.query.returnUrl = router.currentRoute.path
              router.push({path:'/login',query:router.currentRoute.query})
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(response => {
            if (response && response.data && !response.data.IsSucceed && response.data.ErrorCode) {
              reject(response.data.ErrorCode)
            } else {
              resolve(response)
            }
          })
      })
    }

    async AxiosDelete (url, item, _headers) {
      this.headers = { ...this.headers, ..._headers }
      return await new Promise((resolve, reject) => {
        Axios({
          method: 'put',
          url: this.baseUrl + url,
          data: item,
          headers: this.headers
        })
          .catch(error => {
            if (error.response.status === 401 && localStorage.getItem('accesstoken')) {
              return new Promise((resolve) => {
                refreshToken().then(response => {
                  if (response.status === 200) {
                    if (response.data.IsSucceed) {
                      _headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
                      resolve(this.AxiosDelete(url, item, _headers))
                    } else {
                      const headersForLogOut = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }

                      store.dispatch(AUTH_LOGOUT, { headersForLogOut })
                        .then(response => {
                          router.currentRoute.query.returnUrl = router.currentRoute.path
                          router.push({path:'/login',query:router.currentRoute.query})
                        })
                    }
                  }
                })
                  .catch(_error => {
                    // ilk promise'nin reject ini kullandÄ±m Ã§Ã¼nkÃ¼ ilkinden dÃ¶nÃ¼yor error aslÄ±nda
                    console.log(error)
                    console.log(_error)
                    router.currentRoute.query.returnUrl = router.currentRoute.path
                    router.push({path:'/login',query:router.currentRoute.query})
                  })
              })
            } else if (error.response.status === 401 && !localStorage.getItem('accesstoken')) {
              router.currentRoute.query.returnUrl = router.currentRoute.path
              router.push({path:'/login',query:router.currentRoute.query})
              reject(error)
            } else {
              reject(error)
            }
          })
          .then(response => {
            if (response && response.data && !response.data.IsSucceed && response.data.ErrorCode) {
              reject(response.data.ErrorCode)
            } else {
              resolve(response)
            }
          })
      })
    }
}
