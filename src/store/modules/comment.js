import { ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, DELETE_ANSWERS_COMMENTS } from '../actions/comment'
import CommentService from '../../services/CommentService'
import EventBus from '../../library/helpers/eventbus'

const state = {
  commentId: ''
}

const actions = {
  [ADD_COMMENT]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      CommentService.Add(request).then(response => {
        commit(ADD_COMMENT, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [UPDATE_COMMENT]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      CommentService.Update(payload).then(response => {
        commit(UPDATE_COMMENT, payload)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [DELETE_COMMENT]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      CommentService.Delete(request).then(response => {
        commit(DELETE_COMMENT, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [DELETE_ANSWERS_COMMENTS]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      CommentService.DeleteAnswersComments(request).then(response => {
        commit(DELETE_ANSWERS_COMMENTS, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const getters = {
  commentId: state => state.commentId
}

const mutations = {
  [ADD_COMMENT]: (state, payload) => {
    state.commentId = payload.data.Response.Id
    EventBus.EmitMethod('add-comment')
  },
  [DELETE_COMMENT]: (state, payload) => {
    EventBus.EmitMethod('delete-comment')
  },
  [DELETE_ANSWERS_COMMENTS]: (state, payload) => {
    EventBus.EmitMethod('delete-answers-comment')
  },
  [UPDATE_COMMENT]: (state, payload) => {
    EventBus.EmitMethod('update-answers-comment')
  }
}

export default {
  actions,
  state,
  mutations,
  getters
}
