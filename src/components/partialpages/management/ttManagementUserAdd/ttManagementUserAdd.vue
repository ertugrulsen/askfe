<template>
    <div>
        <div class="scene" id="management__user__add" :class="{active :visible}">
        <div class="part equal white-bg short-label">
          <h4>{{ GetLabel(this, 'management_users_new_user') }}</h4>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                      <v-col cols="12" sm="8">
                          <dxFormTextInput  ref="userNameRef" type="text" v-model="userModel.name" placeholder="management_user_name" :clear="true" :isRequired=true />
                      </v-col>
                      <v-col cols="12" sm="8">
                          <dxFormTextInput  type="text" ref="userSurnameRef" v-model="userModel.surname" placeholder="management_user_surname" :clear="true" :isRequired=true />
                     </v-col>
                     <v-col cols="12" sm="8">
                           <dxFormTextInput  type="text" ref="userUsernameRef" v-model="userModel.username" placeholder="management_user_username" :clear="true" :isRequired=true />
                     </v-col>
                    <v-col cols="12" sm="8">
                    <dxFormTextInput  type="text" ref="userUserTypeRef" v-model="userModel.userType" placeholder="management_user_usertype" :clear="true" :isRequired=true />
                    </v-col>
              <div class="form__section align-top">
                <label for="Roller" class="input-label">
                  <strong>{{GetLabel(this, "roles")}}</strong>
                </label>
                <div class="label-side">
                  <template v-if='roleData.length > 0'>
                    <div v-for="(role, i) in roleData" :key="i">
                      <dxFormCheckboxInput :label="role.RoleName" name="Rol" :value="role.value" :checked="isChecked" @input="setChecked(role.value)"/>
                      <label for="Rol">{{role.name}}</label>
                    </div>
                  </template>
                  <label v-else for="notFoundRole">{{GetLabel(this, "role_not_found")}}</label>
                  <span v-if="!roleIsValid"  class="form-text text-danger">*{{GetLabel(this, "required_field")}}</span>
                </div>
              </div>
                 <v-col cols="4" sm="2">
                 <dxFormCheckboxInput name="Aktif" :label="GetLabel(this, 'active')" :value="userModel.isactive" v-model="userModel.isactive" :checked="userModel.isactive"/>
                </v-col>
                 <div class="form__button-group left-side">
                <v-col cols="12" sm="6">
                  </v-col>
                      <v-btn :disabled="!valid" class="btn mt-4 btn-primary" color="btn-block" text @click="SaveUser">{{GetLabel(this, "save")}}</v-btn>
                    <v-btn class="btn mt-4 btn-secondary" color="white" text @click="returnUsers"> {{GetLabel(this, "cancel")}}</v-btn>
                </div>
                  </v-form>
            </v-container>
          </div>
        </div>
      </div>
</template>

<script>
import { LOAD_ROLES, ADD_USER, UPDATE_ROLE } from '../../../../store/actions/management'
import EventBus from '../../../../library/helpers/eventbus'
import dxFormCheckboxInput from '../../../../components/customcontrols/dxInput/dxFormCheckboxInput/dxFormCheckboxInput'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'ttManagementUserAdd',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  components: {
    dxFormCheckboxInput,
    dxFormTextInput: () => import('../../../customcontrols/dxInput/dxFormTextInput/dxFormTextInput')
  },
  data () {
    return {
      valid: true,
      roleIsValid: true,
      selectedRoles: [],
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
          RoleName: 'Role3',
          Description: 'Role Description',
          Users: 'Mehmet KARLI'
        }
      ],
      userModel: {
        name: '',
        surname: '',
        username: '',
        userType: '',
        isactive: false,
        roles: {
          roleid: ''
        }
      },
      alertoptions: {
        okText: 'Tamam'
      },
      isSubmitted: false,
      isChecked: false
    }
  },
  validations: {
    userModel: {
      name: {
        required
      },
      surname: {
        required
      },
      username: {
        required
      },
      userType: {
        required
      }
    }
  },
  created () {
    this.GetRoles()
  },
  mounted () {
    EventBus.GetEventBus().$on('change-role-list', () => {
      this.GetRoles()
    })
  },
  methods: {
    returnUsers: function () {
      this.clear()
      this.$emit('return-users')
      EventBus.EmitMethod('refresh-user-table')
      EventBus.EmitMethod('refresh-role-table')
    },
    handleSubmit () {
      this.isSubmitted = true

      this.$v.$touch()
      if (this.$v.$invalid) {
        this.isSubmitted = false
      }
    },
    clear () {
      this.isSubmitted = true
      this.userModel = []
      this.selectedRoles = []
      this.GetRoles()
    },
    SaveUser: function (userModel) {
      if (!this.$refs.form.validate()) {
        return
      }
      if (this.selectedRoles.length === 0) {
        this.roleIsValid = false
      } else {
        this.roleIsValid = true
      }
      if (!this.$refs.userNameRef.validate() || !this.$refs.userSurnameRef.validate() || !this.$refs.userUsernameRef.validate() || !this.$refs.userUserTypeRef.validate() || !this.roleIsValid) {
        this.$dialog.alert(this.GetMessage(this, 'fill_empty_fields'), this.alertoptions)
        return
      }
      const userAreaModel = {
        value: Math.floor(Math.random() * 1000),
        name: this.userModel.name,
        surname: this.userModel.surname,
        username: this.userModel.username,
        userType: this.userModel.userType,
        isactive: !this.userModel.isactive,
        roles: this.selectedRoles
      }

      this.$store.dispatch(ADD_USER, userAreaModel).then(() => {
        this.$dialog.alert(this.GetMessage(this, 'operation_success'), this.alertoptions).then(dialog => {
          if (userAreaModel.roles.length === 0) {
            this.returnUsers()
          }
        })
      })

      if (userAreaModel.roles.length > 0) {
        for (let i = 0; i < userAreaModel.roles.length; i++) {
          userAreaModel.roles[i].users.push(userAreaModel)
          const roleAreaModel = {
            value: userAreaModel.roles[i].value,
            name: userAreaModel.roles[i].name,
            description: userAreaModel.roles[i].description,
            isactive: true,
            users: userAreaModel.roles[i].users
          }
          this.$store.dispatch(UPDATE_ROLE, roleAreaModel).then(() => {
            this.returnUsers()
          })
        }
      }
    },
    GetRoles: function () {
      this.$store.dispatch(LOAD_ROLES).then(() => {
        this.roleData = []
        this.$store.getters.roleData.forEach(element => {
          this.roleData.push(element)
        })
      })
    },
    setChecked: function (value) {
      let matchItem = false
      for (var i = 0; i < this.selectedRoles.length; i++) {
        if (this.selectedRoles[i] === value) {
          this.selectedRoles.splice(i, 1)
          matchItem = true
        }
      }
      if (!matchItem) {
        this.selectedRoles.push(this.roleData[this.roleData.findIndex(x => x.value === value)])
      }
    }
  }
}
</script>
