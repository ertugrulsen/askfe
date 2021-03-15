import {
  ALL_UNANSWERED, ALL_QUESTION, ALL_MOST_VOTED,
  SEARCH_QUESTION, QUESTION_VOTE_UP, QUESTION_VOTE_DOWN, DELETE_QUESTION,
  CLOSE_QUESTION, UPDATE_QUESTION, ADD_QUESTION,
  GET_QUESTION_BY_ID
} from '../actions/question'
import EventBus from '../../library/helpers/eventbus'
import QuestionService from '../../services/QuestionService'

const state = {
  allUnanswered: [],
  allQuestion: [],
  mostVoted: [],
  questions: [],
  question: {},
  questionId: '',
  searched: [],
  vote: ''
}

const getters = {
  allUnanswered: state => state.allUnanswered,
  allQuestion: state => state.allQuestion,
  mostVoted: state => state.mostVoted,
  questions: state => state.questions,
  question: state => state.question,
  questionId: state => state.questionId,
  vote: state => state.vote,
  searched: state => state.searched
}
const actions = {
  [ALL_UNANSWERED]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.GetAllUnanswered(payload).then(response => {
        commit(ALL_UNANSWERED, response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [GET_QUESTION_BY_ID]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.Get(payload).then(response => {
        commit(GET_QUESTION_BY_ID, response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [ALL_QUESTION]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.GetAll(payload).then(response => {
        commit(ALL_QUESTION, response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [ALL_MOST_VOTED]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.GetMostVoted(payload).then(response => {
        commit(ALL_MOST_VOTED, response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [SEARCH_QUESTION]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.Search(payload).then(response => {
        commit(SEARCH_QUESTION, response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [QUESTION_VOTE_UP]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.VoteIncrease(payload).then((response) => {
        commit(QUESTION_VOTE_UP, payload.Id)
        resolve()
      })
        .catch((error) => {
          reject(error)
        })
    })
  },
  [QUESTION_VOTE_DOWN]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.VoteDecrease(payload)
        .then((response) => {
          commit(QUESTION_VOTE_DOWN, payload)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  [CLOSE_QUESTION]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.Close(payload).then(response => {
        commit(CLOSE_QUESTION, payload)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [ADD_QUESTION]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.Add(payload).then(response => {
        commit(ADD_QUESTION, response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [UPDATE_QUESTION]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.Update(payload).then(response => {
        commit(UPDATE_QUESTION, payload)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  [DELETE_QUESTION]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      QuestionService.Delete(payload).then(response => {
        commit(DELETE_QUESTION, payload)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const mutations = {
  [ADD_QUESTION]: (state, payload) => {
    state.questionId = payload.data.Response.Id
    EventBus.EmitMethod('add-question')
  },
  [ALL_UNANSWERED]: (state, payload) => {
    state.allUnanswered = payload
    EventBus.EmitMethod('change-all-unanswered')
  },
  [ALL_QUESTION]: (state, payload) => {
    state.allQuestion = payload
    EventBus.EmitMethod('change-all-question')
  },
  [ALL_MOST_VOTED]: (state, payload) => {
    state.mostVoted = payload
    EventBus.EmitMethod('change-most-voted')
  },
  [SEARCH_QUESTION]: (state, payload) => {
    state.searched = payload
    EventBus.EmitMethod('search-questions')
  },
  [QUESTION_VOTE_UP]: (state, payload) => {
    state.vote = payload
    EventBus.EmitMethod('change-vote')
  },
  [QUESTION_VOTE_DOWN]: (state, payload) => {
    state.vote = payload
    EventBus.EmitMethod('change-vote')
  },
  [DELETE_QUESTION]: (state, payload) => {
    state.question = {}
    EventBus.EmitMethod('change-user-list')
  },
  [CLOSE_QUESTION]: (state, payload) => {
    state.question = payload
    EventBus.EmitMethod('closed-question')
  },
  [UPDATE_QUESTION]: (state, payload) => {
    state.question = payload
    EventBus.EmitMethod('updated-question')
  },
  [GET_QUESTION_BY_ID]: (state, payload) => {
    state.question = payload
    EventBus.EmitMethod('get-question')
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
