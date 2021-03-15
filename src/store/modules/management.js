import { LOAD_USER, DELETE_USER, DELETE_ROLES, LOAD_ROLES, ADD_USER, ADD_ROLE, UPDATE_USER, UPDATE_ROLE, DELETE_USER_FROM_ROLE, ADD_USER_TO_ROLE, DELETE_ROLE_FROM_USER, ADD_ROLE_TO_USER } from '../actions/management'
import EventBus from '../../library/helpers/eventbus'

const state = {
  userData: [],
  roleData: []
}

const getters = {
  userData: state => state.userData,
  roleData: state => state.roleData
}

const popupOptions = {
  alertoptions: {
    okText: 'Tamam'
  }
}

const actions = {
  [LOAD_USER]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(LOAD_USER, state.userData)
      // ManagementService.GetAllUsers().then(response => {
      //   commit(LOAD_USER, state.userData)
      //   resolve()
      // }).catch(error => {
      //   this.GetMessage(this, 'error_500'), this.alertoptions)
      //   reject(error)
      // })
    })
  },
  [ADD_USER]: ({ commit }, payload) => {
    /* return new Promise((resolve, reject) => {
      ManagementService.AddNewUser(payload).then(response => {
        commit(ADD_USER, payload)
        resolve()
      }).catch(error => {
        this.GetMessage(this, 'error_500'), this.alertoptions)
        reject(error)
      })
    }) */
  },
  [UPDATE_USER]: ({ commit }, payload) => {
    /* return new Promise((resolve, reject) => {
      ManagementService.UpdateUser(payload).then(response => {
        commit(UPDATE_USER, payload)
        resolve()
      }).catch(error => {
       this.GetMessage(this, 'error_500'), this.alertoptions)
        reject(error)
      })
    }) */
  },
  [DELETE_USER]: ({ commit }, payload) => {
    /* return new Promise((resolve, reject) => {
      ManagementService.DeleteUser(payload)
        .then((response) => {
          commit(DELETE_USER, payload.Id)
          resolve()
        })
        .catch((error) => {
          this.GetMessage(this, 'error_500'), this.alertoptions)
          reject(error)
        })
    }) */
  },
  [DELETE_ROLES]: ({ commit }, payload) => {
    /* return new Promise((resolve, reject) => {
      ManagementService.DeleteRole(payload)
        .then((response) => {
          commit(DELETE_ROLES, payload.Id)
          resolve()
        })
        .catch((error) => {
          this.GetMessage(this, 'error_500'), this.alertoptions)
          reject(error)
        })
    }) */
  },
  [UPDATE_ROLE]: ({ commit }, payload) => {
    /* return new Promise((resolve, reject) => {
      ManagementService.UpdateRole(payload).then(response => {
        commit(UPDATE_ROLE, payload)
        resolve()
      }).catch(error => {
        this.GetMessage(this, 'error_500'), this.alertoptions)
        reject(error)
      })
    }) */
  },
  [ADD_ROLE]: ({ commit }, payload) => {
    /* return new Promise((resolve, reject) => {
      ManagementService.AddNewRole(payload).then(response => {
        commit(ADD_ROLE, payload)
        resolve()
      }).catch(error => {
        this.GetMessage(this, 'error_500'), this.alertoptions)
        reject(error)
      })
    }) */
  },
  [LOAD_ROLES]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(LOAD_ROLES, state.roleData)
      // ManagementService.GetAllRoles().then(response => {
      //   commit(LOAD_ROLES, state.roleData)
      //   resolve()
      // }).catch(error => {
      //        this.GetMessage(this, 'error_500'), this.alertoptions), this.alertoptions)
      //   reject(error)
      // })
    })
  },
  [DELETE_USER_FROM_ROLE]: ({ commit }, payload) => {
    commit(DELETE_USER_FROM_ROLE, payload)
  },
  [ADD_USER_TO_ROLE]: ({ commit }, payload) => {
    commit(ADD_USER_TO_ROLE, payload)
  },
  [DELETE_ROLE_FROM_USER]: ({ commit }, payload) => {
    commit(DELETE_ROLE_FROM_USER, payload)
  },
  [ADD_ROLE_TO_USER]: ({ commit }, payload) => {
    commit(ADD_ROLE_TO_USER, payload)
  }
}

const mutations = {
  [LOAD_USER]: (state, payload) => {
    state.userData = payload
  },
  [LOAD_ROLES]: (state, payload) => {
    state.roleData = payload
  },
  [ADD_USER]: (state, payload) => {
    state.userData.push(payload)
    EventBus.EmitMethod('change-user-list')
  },
  [ADD_ROLE]: (state, payload) => {
    state.roleData.push(payload)
    EventBus.EmitMethod('change-role-list')
  },
  [UPDATE_USER]: (state, payload) => {
    state.index = state.userData.findIndex(x => x.value === payload.value)
    state.userData[state.index] = payload
    EventBus.EmitMethod('change-user-list')
  },
  [UPDATE_ROLE]: (state, payload) => {
    state.index = state.roleData.findIndex(x => x.value === payload.value)
    state.roleData[state.index] = payload
    EventBus.EmitMethod('change-role-list')
  },
  [DELETE_USER]: (state, payload) => {
    state.index = state.userData.findIndex(user => user.value === payload)
    state.userData.splice(state.index, 1)
    EventBus.EmitMethod('change-user-list')
  },
  [DELETE_ROLES]: (state, payload) => {
    state.index = state.roleData.findIndex(role => role.value === payload)
    state.roleData.splice(state.index, 1)
    EventBus.EmitMethod('change-role-list')
  },
  [DELETE_USER_FROM_ROLE]: (state, payload) => {
    state.index = state.roleData.findIndex(role => role.value === payload.roleValue)
    state.roleData[state.index].users = state.roleData[state.index].users.filter(user => user.value !== payload.userValue)
  },
  [ADD_USER_TO_ROLE]: (state, payload) => {
    state.index = state.roleData.findIndex(role => role.value === payload.roleValue)
    state.roleData[state.index].users.push(payload.user)
  },
  [DELETE_ROLE_FROM_USER]: (state, payload) => {
    state.index = state.userData.findIndex(user => user.value === payload.userValue)
    state.userData[state.index].roles = state.userData[state.index].roles.filter(role => role.value !== payload.roleValue)
  },
  [ADD_ROLE_TO_USER]: (state, payload) => {
    state.index = state.userData.findIndex(user => user.value === payload.userValue)
    state.userData[state.index].roles.push(payload.role)
  }

}

export default {
  state,
  getters,
  actions,
  mutations,
  popupOptions
}
