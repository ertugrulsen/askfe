import { ADD_ANSWER, VOTE_UP, VOTE_DOWN, DELETE_ANSWER, UPDATE_ANSWER } from '../actions/answer'
import AnswerService from '../../services/AnswerService'

const state = {
  answerId: '',
  vote: 0
}
const getters = {
  vote: state => state.vote,
  answerId: state => state.answerId
}
const actions = {
  [ADD_ANSWER]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      AnswerService.Add(request).then(response => {
        commit(ADD_ANSWER, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [UPDATE_ANSWER]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      AnswerService.Update(request).then(response => {
        commit(UPDATE_ANSWER, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [DELETE_ANSWER]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
        AnswerService.Delete(request).then(response => {
          commit(DELETE_ANSWER, response)
          resolve()
        }).catch(error => {
          reject(error)
      })
    })
  },
  [VOTE_DOWN]: ({ commit }, request) => {
    console.log("sevice dowm")
    return new Promise((resolve, reject) => {
      AnswerService.VoteDecrease(request).then(response => {
        commit(VOTE_DOWN, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [VOTE_UP]: ({ commit }, request) => {
    console.log("sevice up")
    return new Promise((resolve, reject) => {
      AnswerService.VoteIncrease(request).then(response => {
        commit(VOTE_UP, response)
        resolve()
      }).catch(error => {
        console.log("sevice error")
        reject(error)
      })
    })
  }
}

const mutations = {
  [ADD_ANSWER]: (state, response) => {
    state.answerId = response.data.Response.Id
  },
  [VOTE_UP]: (state, response) => {
    state.vote = response.data.Vote
  },
  [VOTE_DOWN]: (state, response) => {
    state.vote = response.data.Vote
  },
  [DELETE_ANSWER]: (state, response) => {
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
