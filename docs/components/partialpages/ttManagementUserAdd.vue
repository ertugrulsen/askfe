<template>
    <div>
        <div class="scene" id="management__user__add" :class="{active :visible}">
        <div class="part equal white-bg short-label">
          <h4 class="green">Kullanıcı Ekle</h4>
          <div class="form" @submit.prevent="handleSubmit" >
            <div class="part">
              <div class="form__section">
                <label for="ad" class="input-label">
                  <strong>Ad</strong>
                </label>
                 <div>
                  <input @blur="$v.userModel.name.$touch()" type="text" name="ad" value class="xs" v-model="userModel.name" :class="{ 'error': !this.isSubmitted && $v.userModel.name.$error }" />
                  <span v-if="!$v.userModel.name.required && $v.userModel.name.$error && !this.isSubmitted" class="form-text text-danger"> *Bu alan zorunludur.</span>
                </div>
              </div>

              <div class="form__section">
                <label for="Soyad" class="input-label">
                  <strong>Soyad</strong>
                </label>
                <div>
                  <input @blur="$v.userModel.surname.$touch()" type="text" name="Soyad" value class="xs" v-model="userModel.surname" :class="{ 'error': !this.isSubmitted && $v.userModel.surname.$error }"/>
                  <span v-if="!$v.userModel.surname.required && $v.userModel.surname.$error && !this.isSubmitted"  class="form-text text-danger"> *Bu alan zorunludur.</span>
                </div>
              </div>

              <div class="form__section">
                <label for="Kullanıcı Adı" class="input-label">
                  <strong>Kullanıcı Adı</strong>
                </label>
                <div>
                  <input @blur="$v.userModel.username.$touch()" type="text" name="Kullanıcı Tipi" value class="xs" v-model="userModel.username" :class="{ 'error': !this.isSubmitted && $v.userModel.username.$error }"/>
                  <span v-if="!$v.userModel.username.required && $v.userModel.username.$error && !this.isSubmitted" class="form-text text-danger"> *Bu alan zorunludur.</span>
                </div>
              </div>

              <div class="form__section">
                <label for="Kullanıcı Tipi" class="input-label">
                  <strong>Kullanıcı Tipi</strong>
                </label>
               <div>
                <input @blur="$v.userModel.userType.$touch()" type="text" name="Kullanıcı Tipi" value class="xs" v-model="userModel.userType" :class="{ 'error': !this.isSubmitted && $v.userModel.userType.$error }"/>
                <span v-if="!$v.userModel.userType.required && $v.userModel.userType.$error && !this.isSubmitted" class="form-text text-danger"> *Bu alan zorunludur.</span>
               </div>
            </div>

              <div class="form__section align-top">
                <label for="Roller" class="input-label">
                  <strong>Roller</strong>
                </label>
                <div class="label-side">
                  <template v-if='roleData.length > 0'>
                    <div v-for="(role, i) in roleData" :key="i">
                      <dxFormCheckboxInput name="Rol" :value="role.value" :checked="isChecked" @input="setChecked(role.value)"/>
                      <label for="Rol">{{role.name}}</label>
                    </div>
                  </template>
                  <label v-else for="notFoundRole">Rol Bulunamadı.</label>
                </div>
              </div>
              <div class="form__button-group empty-left-side">
                <button type="menu" class="btn grey big">
                  <input type="checkbox" name="aktif" v-model="userModel.isactive" :checked="userModel.isactive" />
                  <label v-if="userModel.isactive" for="aktif">Aktif</label>
                  <label v-else for="aktif">Pasif</label>
                </button>
                <button type="menu" class="btn grey big" v-on:click="SaveUser">Kaydet</button>
                <button type="menu" class="btn grey big" @click="returnUsers">İptal</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { LOAD_ROLES, ADD_USER, UPDATE_ROLE } from '../../../src/store/actions/management'
import EventBus from '../../../src/library/helpers/eventbus'
import dxFormCheckboxInput from '../customcontrols/dxFormCheckboxInput'
import { required } from 'vuelidate/lib/validators'

/**
   * This is the user adding component that is used in management page.
   */

export default {
  name: 'ttManagementUserAdd',
  props: {
    /**
       * Makes visible or hidden this component in page.
       * @values true, false
       */
    visible: {
      type: Boolean,
      required: true
    }
  },
  components: {
    dxFormCheckboxInput
  },
  data () {
    return {
      selectedRoles: [],
      roleData: [],
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
      /**
      * This event makes the hidden this components and shows the management page.
      */
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
      this.handleSubmit()
      if (!this.isSubmitted) {
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
