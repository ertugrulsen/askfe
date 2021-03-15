import ApiCall from '../library/helpers/apicall'

export default class CommentService {
  // add comment to question
  static async Add (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('AskComment/CreateComment', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async Update (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosPost('AskComment/UpdateComment', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static async Delete (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosDelete('AskComment/DeleteComment', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  static async DeleteAnswersComments (request) {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
    return await new Promise((resolve, reject) => {
      const api = new ApiCall()
      api.AxiosDelete('AskComment/DeleteCommentByQuestionId', request, headers)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
