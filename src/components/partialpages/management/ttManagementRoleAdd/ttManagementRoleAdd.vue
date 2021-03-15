<template>
  <div>
    <div class="scene" id="management__group__add" :class="{ active: visible }">
      <div class="part equal white-bg short-label">
        <h4>{{ GetLabel(this, "management_users_new_role") }}</h4>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-col cols="12" sm="8">
              <dxFormTextInput
                ref="roleNameRef"
                type="text"
                v-model="roleModel.name"
                placeholder="management_role_name"
                :clear="true"
                :isRequired="true"
              />
            </v-col>
            <v-col cols="12" sm="8">
              <dxFormTextInput
                ref="roleDescRef"
                type="text"
                v-model="roleModel.description"
                placeholder="management_role_description"
                :clear="true"
                :isRequired="true"
              />
            </v-col>
            <div class="form__section align-top">
              <label for="Kullanıcılar" class="input-label">
                <strong>{{ GetLabel(this, "users") }}</strong>
              </label>
              <div class="label-side">
                <template v-if="userData.length > 0">
                  <div v-for="(user, i) in userData" :key="i">
                    <dxFormCheckboxInput
                      :label="user.Name + ' ' + user.SurName"
                      name="Kullanıcı"
                      :value="user.value"
                      :checked="false"
                      @input="setChecked(user.value)"
                    />
                  </div>
                </template>
                <label v-else for="notFoundUser">{{ GetLabel(this, "user_not_found") }}.</label>
                <span v-if="!userIsValid" class="form-text text-danger">*{{ GetLabel(this, "required_field") }}</span>
              </div>
            </div>
            <div class="form__button-group left-side">
              <v-col cols="12" sm="6"> </v-col>
               <v-btn :disabled="!valid" class="btn mt-4 btn-primary" color="btn-block" text @click="SaveRole">{{GetLabel(this, "save")}}</v-btn>
              <v-btn class="btn mt-4 btn-secondary" color="white" text @click="returnRoles" >{{ GetLabel(this, "cancel") }}</v-btn>
            </div>
          </v-form>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_USER, ADD_ROLE, UPDATE_USER } from '../../../../store/actions/management'
import EventBus from '../../../../library/helpers/eventbus'
import dxFormCheckboxInput from '../../../../components/customcontrols/dxInput/dxFormCheckboxInput/dxFormCheckboxInput'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'ttManagementRoleAdd',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  components: {
    dxFormCheckboxInput,
    dxFormTextInput: () =>
      import('../../../customcontrols/dxInput/dxFormTextInput/dxFormTextInput')
  },
  data () {
    return {
      valid: true,
      userIsValid: true,
      selectedUsers: [],
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
      ],
      roleModel: {
        name: '',
        description: ''
      },
      alertoptions: {
        okText: 'Tamam'
      },
      isSubmitted: false
    }
  },
  validations: {
    roleModel: {
      name: {
        required
      },
      description: {
        required
      }
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
  methods: {
    returnRoles: function () {
      this.clear()
      this.$emit('return-roles')
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
      this.roleModel = []
      this.selectedUsers = []
      this.GetUsers()
    },
    SaveRole: function (roleModel) {
      if (!this.$refs.form.validate()) {
        return
      }
      if (this.selectedUsers.length === 0) {
        this.userIsValid = false
      } else {
        this.userIsValid = true
      }

      const roleAreaModel = {
        value: Math.floor(Math.random() * 1000),
        name: this.roleModel.name,
        description: this.roleModel.description,
        isactive: true,
        users: this.selectedUsers
      }

      this.$store.dispatch(ADD_ROLE, roleAreaModel).then(() => {
        this.$dialog
          .alert(
            this.GetMessage(this, 'operation_success'),
            this.alertoptions
          )
          .then((dialog) => {
            if (roleAreaModel.users.length === 0) {
              this.returnRoles()
            }
          })
      })

      if (roleAreaModel.users.length > 0) {
        for (let i = 0; i < roleAreaModel.users.length; i++) {
          roleAreaModel.users[i].roles.push(roleAreaModel)
          const userAreaModel = {
            value: roleAreaModel.users[i].value,
            name: roleAreaModel.users[i].name,
            surname: roleAreaModel.users[i].surname,
            username: roleAreaModel.users[i].username,
            userType: roleAreaModel.users[i].userType,
            isactive: true,
            roles: roleAreaModel.users[i].roles
          }
          console.log(userAreaModel)
          this.$store.dispatch(UPDATE_USER, userAreaModel).then(() => {
            this.returnRoles()
          })
        }
      }
    },
    GetUsers: function () {
      this.$store.dispatch(LOAD_USER).then(() => {
        this.userData = []
        this.$store.getters.userData.forEach((element) => {
          this.userData.push(element)
        })
      })
    },
    setChecked: function (value) {
      let matchItem = false
      for (var i = 0; i < this.selectedUsers.length; i++) {
        if (this.selectedUsers[i] === value) {
          this.selectedUsers.splice(i, 1)
          matchItem = true
        }
      }
      if (!matchItem) {
        this.selectedUsers.push(
          this.userData[this.userData.findIndex((x) => x.value === value)]
        )
      }
    }
  }
}
</script>
