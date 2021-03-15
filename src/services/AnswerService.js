import ApiCall from '../library/helpers/apicall'

export default class AnswerService {
  // get company information
  static async Add (request) {
    const headers = { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('AskAnswer/CreateAnswer', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async Update (request) {
    const headers = { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('AskAnswer/UpdateAnswer', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async Delete (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer '  + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosDelete('AskAnswer/DeleteAnswer', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async VoteIncrease (request) {
    console.log("voteincrese")
    const headers = { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('AskAnswer/AnswerUpdateUpVote', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log("service", error,request)
          reject(error)
        })
    })
  }
  static async VoteDecrease (request) {
    console.log("VoteDecrease answer",request)
    const headers = { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('AskAnswer/AnswerUpdateDownVote', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
