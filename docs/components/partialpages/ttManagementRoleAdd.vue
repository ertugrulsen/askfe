<template>
  <div>
    <div class="scene" id="management__group__add" :class="{active :visible}">
      <div class="part equal white-bg short-label">
        <h4 class="green">Yeni Rol</h4>
        <div class="form"  @submit.prevent="handleSubmit" >
          <div class="part">
            <div class="form__section">
              <label for="ad" class="input-label">
                <strong>Ad</strong>
              </label>
              <div>
              <input @blur="$v.roleModel.name.$touch()" type="text" name="ad" value class="xs" v-model="roleModel.name" :class="{ 'error': !this.isSubmitted && $v.roleModel.name.$error }"/>
              <span v-if="!$v.roleModel.name.required && $v.roleModel.name.$error && !this.isSubmitted" class="form-text text-danger"> *Bu alan zorunludur.</span>
              </div>
            </div>
            <div class="form__section">
              <label for="Açıklama" class="input-label">
                <strong>Açıklama</strong>
              </label>
              <div>
              <input @blur="$v.roleModel.description.$touch()" type="text" name="Açıklama" value class="xs" v-model="roleModel.description" :class="{ 'error': !this.isSubmitted && $v.roleModel.description.$error }"/>
               <span v-if="!$v.roleModel.description.required && $v.roleModel.description.$error && !this.isSubmitted"  class="form-text text-danger"> *Bu alan zorunludur.</span>
              </div>
            </div>
            <div class="form__section align-top">
              <label for="Kullanıcılar" class="input-label">
                <strong>Kullanıcılar</strong>
              </label>
              <div class="label-side">
                <template v-if='userData.length > 0'>
                  <div v-for="(user, i) in userData" :key="i">
                      <dxFormCheckboxInput name="Kullanıcı" :value="user.value" :checked="false" @input="setChecked(user.value)"/>
                      <label for="Kullanıcı">{{user.name + ' ' + user.surname}}</label>
                  </div>
               </template>
               <label v-else for="notFoundUser">Kullanıcı Bulunamadı.</label>
             </div>
            </div>
            <div class="form__button-group empty-left-side">
              <button type="menu" class="btn grey big" v-on:click="SaveRole">Kaydet</button>
              <button type="menu" class="btn grey big" @click="returnRoles">İptal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_USER, ADD_ROLE, UPDATE_USER } from '../../../src/store/actions/management'
import EventBus from '../../../src/library/helpers/eventbus'
import dxFormCheckboxInput from '../customcontrols/dxFormCheckboxInput'
import { required } from 'vuelidate/lib/validators'

/**
   * This is the roleadd component that is used to add roles.
   */

export default {
  name: 'ttManagementRoleAdd',
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
      selectedUsers: [],
      userData: [],
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
      /**
      * This event makes the hidden this components and shows the management page.
      */
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
      this.handleSubmit()
      if (!this.isSubmitted) {
        return
      }
      const roleAreaModel = {
        value: Math.floor(Math.random() * 1000),
        name: this.roleModel.name,
        description: this.roleModel.description,
        isactive: true,
        users: this.selectedUsers
      }

      this.$store.dispatch(ADD_ROLE, roleAreaModel).then(() => {
        this.$dialog.alert(this.GetMessage(this, 'operation_success'), this.alertoptions).then(dialog => {
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
          this.$store.dispatch(UPDATE_USER, userAreaModel).then(() => {
            this.returnRoles()
          })
        }
      }
    },
    GetUsers: function () {
      this.$store.dispatch(LOAD_USER).then(() => {
        this.userData = []
        this.$store.getters.userData.forEach(element => {
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
        this.selectedUsers.push(this.userData[this.userData.findIndex(x => x.value === value)])
      }
    }
  }
}
</script>
