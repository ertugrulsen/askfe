<template>
  <div>
    <div class="scene active" id="management__user__edit" v-if="visible">
      <div class="part equal white-bg short-label">
        <h4>{{ GetLabel(this, "management_users_edit_user") }}</h4>
        <button type="button" class="btn top small white" @click="returnUsers">
          <i class="fas fa-chevron-left"></i>
          {{ GetLabel(this, "management_user_result") }}
        </button>
        <v-container>
           <v-form ref="form" v-model="valid" lazy-validation>
            <v-col cols="12" sm="8">
              <dxFormTextInput
                ref="usernameRef"
                type="text"
                v-model="user.NameSurname"
                placeholder="management_user_name_surname"
                :clear="true"
                :isRequired="true"
              />
            </v-col>
            <v-col cols="12" sm="8">
              <dxFormTextInput
                ref="userusernameRef"
                type="text"
                v-model="user.Username"
                placeholder="management_user_username"
                :clear="true"
                :isRequired="true"
              />
            </v-col>
            <v-col cols="12" sm="8">
              <dxFormTextInput
                ref="userusertypeRef"
                type="text"
                v-model="user.UserType"
                placeholder="management_user_usertype"
                :clear="true"
                :isRequired="true"
              />
            </v-col>
            <div class="form__section align-top">
              <label for="Roller" class="input-label">
                 <strong>{{GetLabel(this, "roles")}}</strong>
              </label>
              <div class="label-side">
                <template v-if="roleData.length > 0">
                  <div v-for="(role, i) in roleData" :key="i">
                    <dxFormCheckboxInput
                      :label="role.RoleName"
                      name="Rol"
                      :checked="getChecked(role.ID)"
                      @input="setChecked(role.ID)"
                      :value="role.ID"
                    />
                  </div>
                </template>
                <label v-else for="notFoundRole">{{GetLabel(this, "role_not_found")}}</label>
                <span v-if="!roleIsValid" class="form-text text-danger" >*{{ GetLabel(this, "required_field") }}</span>
              </div>
            </div>
            <div class="form__button-group left-side">
              <v-col cols="4" sm="4">
                <dxFormCheckboxInput
                  name="Aktif"
                  :label="GetLabel(this, 'active')"
                  :value="user.Statu"
                  v-model="user.Statu"
                  :checked="user.Statu"
                />
              </v-col>
              <v-col cols="8" sm="6">
              <v-btn class="btn mt-4 btn-primary" color="white" text @click="DeleteUser(user.ID)" >{{ GetLabel(this, "user_delete") }}</v-btn>
              <v-btn :disabled="!valid" class="btn mt-4 btn-primary" color="btn-block" text @click="UpdateUser">{{GetLabel(this, "save")}}</v-btn>
              <v-btn class="btn mt-4 btn-secondary" color="white" text @click="returnUsers" >{{ GetLabel(this, "cancel") }}</v-btn>
              </v-col>
            </div>
          </v-form>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DELETE_USER,
  LOAD_ROLES,
  UPDATE_USER,
  ADD_USER_TO_ROLE,
  DELETE_USER_FROM_ROLE
} from '../../../../store/actions/management'
import EventBus from '../../../../library/helpers/eventbus'
import dxFormCheckboxInput from '../../../../components/customcontrols/dxInput/dxFormCheckboxInput/dxFormCheckboxInput'
import dxFormTextInput from '../../../../components/customcontrols/dxInput/dxFormTextInput/dxFormTextInput'

export default {
  name: 'ttManagementUserEdit',
  props: {
    user: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  components: {
    dxFormCheckboxInput,
    dxFormTextInput
  },
  created () {
    this.GetRoles()
  },
  mounted () {
    EventBus.GetEventBus().$on('change-role-list', () => {
      this.GetRoles()
    })
  },
  updated () {
    this.updateRoles = this.selectedRoles.slice()
  },
  data () {
    return {
      valid: true,
      roleIsValid: true,
      updateRoles: [],
      roleData: [
        {
          ID: 1,
          RoleName: 'Role1',
          Description: 'Role Description',
          Users: 'Erdinç DEĞİRMENCİ'
        },
        {
          ID: 2,
          RoleName: 'Role2',
          Description: 'Role Description',
          Users: 'Emre SOLUGAN'
        },
        {
          ID: 3,
          RoleName: 'Role3',
          Description: 'Role Description',
          Users: 'Nurullah TURKYILMAZ'
        },
        {
          ID: 4,
          RoleName: 'Role4',
          Description: 'Role Description',
          Users: 'Mehmet KARLI'
        },
        {
          ID: 5,
          RoleName: 'Role5',
          Description: 'Role Description',
          Users: 'Mehmet KARLI'
        },
        {
          ID: 6,
          RoleName: 'Role6',
          Description: 'Role Description',
          Users: 'Mehmet KARLI'
        }
      ],
      confirmoptions: {
        okText: 'Evet',
        cancelText: 'Hayır',
        animation: 'bounce'
      },
      alertoptions: {
        okText: 'Tamam'
      }
    }
  },
  computed: {
    selectedRoles: {
      get: function () {
        const array = []
        if (this.$props.user.Roles) {
          if (this.$props.user.Roles.length > 0) {
            for (
              let index = 0;
              index < this.$props.user.Roles.length;
              index++
            ) {
              array.push(this.$props.user.Roles[index])
            }
          }
        }
        return array
      },
      set: function (value) {}
    }
  },
  methods: {
    returnUsers: function () {
      this.updateRoles = []
      this.$emit('return-users')
      EventBus.EmitMethod('refresh-user-table')
      EventBus.EmitMethod('refresh-role-table')
    },
    UpdateUser: function (id) {
      if (!this.$refs.form.validate()) {
        return
      }
      if (this.updateRoles.length === 0) {
        this.roleIsValid = false
      } else {
        this.roleIsValid = true
      }
      const updateUserAreaModel = {
        value: id,
        name: this.user.name,
        surname: this.user.surname,
        username: this.user.username,
        userType: this.user.userType,
        isactive: this.user.isactive,
        roles: this.updateRoles
      }
      const _this = this
      this.$dialog
        .confirm(
          this.user.name +
            ' ' +
            this.user.surname +
            ' ' +
            this.GetMessage(this, 'approve_update'),
          this.confirmoptions
        )
        .then((dialog) => {
          this.$store.dispatch(UPDATE_USER, updateUserAreaModel).then(() => {
            this.$dialog
              .alert(
                this.GetMessage(this, 'operation_success'),
                this.alertoptions
              )
              .then((dialog) => {
                for (const i in _this.selectedRoles) {
                  if (
                    _this.updateRoles.findIndex(
                      (x) => x.value === _this.selectedRoles[i].value
                    ) === -1
                  ) {
                    _this.$store.dispatch(DELETE_USER_FROM_ROLE, {
                      roleValue: _this.selectedRoles[i].value,
                      userValue: id
                    })
                  }
                }
                for (const i in _this.updateRoles) {
                  if (
                    _this.selectedRoles.findIndex(
                      (x) => x.value === _this.updateRoles[i].value
                    ) === -1
                  ) {
                    _this.$store.dispatch(ADD_USER_TO_ROLE, {
                      roleValue: _this.updateRoles[i].value,
                      user: updateUserAreaModel
                    })
                  }
                }

                this.returnUsers()
              })
          })
        })
    },
    GetRoles: function () {
      this.$store.dispatch(LOAD_ROLES).then(() => {
        this.roleData = []
        this.$store.getters.roleData.forEach((element) => {
          this.roleData.push(element)
        })
      })
    },
    DeleteUser: function (id) {
      const deleteUserAreaModel = {
        Id: id
      }
      this.$dialog
        .confirm(
          this.GetMessage(this, 'approve_delete'),
          this.confirmoptions
        )
        .then((dialog) => {
          this.$store.dispatch(DELETE_USER, deleteUserAreaModel).then(() => {
            this.returnUsers()
          })
        })
    },
    getChecked (value) {
      if (this.selectedRoles.findIndex((x) => x.value === value) === -1) {
        return null
      } else {
        return value
      }
    },
    setChecked: function (value) {
      let matchItem = false

      for (var i = 0; i < this.updateRoles.length; i++) {
        if (this.updateRoles[i].value === value) {
          this.updateRoles.splice(i, 1)
          matchItem = true
        }
      }
      if (!matchItem) {
        this.updateRoles.push(
          this.roleData[this.roleData.findIndex((x) => x.value === value)]
        )
      }
    }
  }
}
</script>

<style>
</style>
