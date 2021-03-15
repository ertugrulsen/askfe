<template>
  <div>
    <div class="scene active" id="management__group__edit"  v-if="visible" >
      <div class="part equal white-bg short-label">
        <h4>{{ GetLabel(this, 'management_users_new_role') }}</h4>
        <button type="button" class="btn top small white" @click="returnRoles()">
          <i class="fas fa-chevron-left"></i>
          {{ GetLabel(this, "management_user_result") }}
        </button>
            <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-col cols="12" sm="8">
              <dxFormTextInput
                ref="rolenameRef"
                type="text"
                v-model="role.RoleName"
                placeholder="management_role_name"
                :clear="true"
                :isRequired="true"
              />
            </v-col>
            <v-col cols="12" sm="8">
              <dxFormTextInput
                ref="roledescRef"
                type="text"
                v-model="role.Description"
                placeholder="management_role_description"
                :clear="true"
                :isRequired="true"
              />
            </v-col>
            <div class="form__section align-top">
              <label for="Kullanıcılar" class="input-label">
                 <strong>{{GetLabel(this, "users")}}</strong>
              </label>
              <div class="label">
                <template v-if='userData.length > 0'>
                  <div v-for="(user, i) in userData" :key="i">
                    <dxFormCheckboxInput
                      name="Kullanıcı"
                      :label="user.Name + ' ' + user.SurName"
                      :checked="getChecked(user.ID)"
                      @input="setChecked(user.ID)"
                      :value="role.ID"
                    />
                  </div>
                </template>
                <label v-else for="notFoundUser">{{GetLabel(this, "user_not_found")}}.</label>
                  <span v-if="!userIsValid"  class="form-text text-danger">*{{GetLabel(this, "required_field")}}</span>
              </div>
            </div>
            <div class="form__button-group left-side">
                <v-col cols="4" sm="4">
                  </v-col>
                  <v-btn :disabled="!valid" class="btn mt-4 btn-primary" color="btn-block" text @click="UpdateRole">{{GetLabel(this, "save")}}</v-btn>
                  <v-btn class="btn mt-4 btn-secondary" color="white" text @click="returnRoles"> {{GetLabel(this, "cancel")}}</v-btn>
            </div>
          </v-form>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_USER, UPDATE_ROLE, DELETE_ROLE_FROM_USER, ADD_ROLE_TO_USER } from '../../../../store/actions/management'
import EventBus from '../../../../library/helpers/eventbus'
import dxFormCheckboxInput from '../../../../components/customcontrols/dxInput/dxFormCheckboxInput/dxFormCheckboxInput'
import dxFormTextInput from '../../../../components/customcontrols/dxInput/dxFormTextInput/dxFormTextInput'
export default {
  name: 'ttManagementRoleEdit',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    role: {
      type: Object,
      required: true
    }
  },
  components: {
    dxFormCheckboxInput,
    dxFormTextInput
  },
  data () {
    return {
      valid: true,
      userIsValid: true,
      updateUsers: [],
      alertoptions: {
        okText: 'Tamam'
      },
      confirmoptions: {
        okText: 'Evet',
        cancelText: 'Hayır',
        animation: 'bounce'
      },
      userData: [
        {
          ID: 1,
          Name: 'Erdinç',
          SurName: 'DEĞİRMENCİ',
          Username: 'ED',
          UserType: 'Admin',
          Roles: 'Role1',
          Statu: true
        },
        {
          ID: 2,
          Name: 'Emre',
          SurName: 'SOLUGAN',
          Username: 'ES',
          UserType: 'Admin',
          Roles: 'Role2',
          Statu: false
        },
        {
          ID: 3,
          Name: 'Nurullah',
          SurName: 'TURKYILMAZ',
          Username: 'NT',
          UserType: 'Admin',
          Roles: 'Role3',
          Statu: true
        },
        {
          ID: 4,
          Name: 'Mehmet',
          SurName: 'KARLI',
          Username: 'MK',
          UserType: 'Admin',
          Roles: 'Role4',
          Statu: false
        },
        {
          ID: 5,
          Name: 'Definex',
          SurName: 'Definex',
          Username: 'DD',
          UserType: 'Admin',
          Roles: 'Role5',
          Statu: true
        },
        {
          ID: 6,
          Name: 'Definex',
          SurName: 'Definex',
          Username: 'DD',
          UserType: 'Admin',
          Roles: 'Role6',
          Statu: true
        }
      ]
    }
  },
  created () {
    this.GetUsers()
  },
  mounted () {
    EventBus.GetEventBus().$on('change-user-list', () => {
      this.GetUsers()
    })
  },
  updated () {
    this.updateUsers = this.selectedUsers.slice()
  },
  computed: {
    selectedUsers: {
      get: function () {
        const array = []
        if (this.$props.role.Users) {
          if (this.$props.role.Users.length > 0) {
            this.$props.role.Users.forEach((element) => {
              array.push(element)
            })
          }
        }
        return array
      },
      set: function (value) {}
    }
  },
  methods: {
    returnRoles: function () {
      this.updateUsers = []
      this.$emit('return-roles')
      EventBus.EmitMethod('refresh-user-table')
      EventBus.EmitMethod('refresh-role-table')
    },
    UpdateRole: function (id) {
      if (!this.$refs.form.validate()) {
        return
      }
      if (this.updateUsers.length === 0) {
        this.userIsValid = false
      } else {
        this.userIsValid = true
      }

      const updateRoleAreaModel = {
        value: id,
        name: this.role.name,
        description: this.role.description,
        users: this.updateUsers
      }
      const _this = this
      this.$dialog.confirm(this.role.name + ' ' + this.GetMessage(this, 'approve_update'), this.confirmoptions).then(dialog => {
        this.$store.dispatch(UPDATE_ROLE, updateRoleAreaModel).then(() => {
          this.$dialog.alert(this.GetMessage(this, 'operation_success'), this.alertoptions).then(dialog => {
            for (const i in _this.selectedUsers) {
              if (_this.updateUsers.findIndex(x => x.value === _this.selectedUsers[i].value) === -1) {
                _this.$store.dispatch(DELETE_ROLE_FROM_USER, { roleValue: id, userValue: _this.selectedUsers[i].value })
              }
            }
            for (const i in _this.updateUsers) {
              if (_this.selectedUsers.findIndex(x => x.value === _this.updateUsers[i].value) === -1) {
                _this.$store.dispatch(ADD_ROLE_TO_USER, { userValue: _this.updateUsers[i].value, role: updateRoleAreaModel })
              }
            }

            this.returnRoles()
          })
        })
      })
    },
    GetUsers: function () {
      this.$store.dispatch(LOAD_USER).then(() => {
        this.userData = []
        this.$store.getters.userData.forEach((element) => {
          this.userData.push(element)
        })
      })
    },
    getChecked (value) {
      if (this.selectedUsers.findIndex((x) => x.value === value) === -1) {
        return null
      } else {
        return value
      }
    },
    setChecked: function (value) {
      let matchItem = false

      for (var i = 0; i < this.updateUsers.length; i++) {
        if (this.updateUsers[i].value === value) {
          this.updateUsers.splice(i, 1)
          matchItem = true
        }
      }
      if (!matchItem) {
        this.updateUsers.push(this.userData[this.userData.findIndex(x => x.value === value)])
      }
    }
  }
}
</script>
