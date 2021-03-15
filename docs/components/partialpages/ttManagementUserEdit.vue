<template>
  <div>
      <div class="scene" id="management__user__edit" :class="{active :visible}">
        <div class="part equal white-bg short-label">
          <h4 class="green">Kullanıcı Düzenle</h4>
          <button type="button" class="btn top small white" @click="returnUsers">
            <i class="fas fa-chevron-left"></i>
            Tüm Sonuçlar
          </button>
          <div class="form">
            <div class="part">
              <div class="form__section">
                <label for="ad" class="input-label">
                  <strong>Ad</strong>
                </label>
                <input type="text" name="ad" v-model="user.name"  class="xs" />
              </div>
              <div class="form__section">
                <label for="Soyad" class="input-label">
                  <strong>Soyad</strong>
                </label>
                <input type="text" name="Soyad" v-model="user.surname" class="xs" />
              </div>
              <div class="form__section">
                <label for="Kullanıcı Adı" class="input-label">
                  <strong>Kulanıcı Adı</strong>
                </label>
                <input type="text" name="Kullanıcı Adı" v-model="user.username" class="xs" />
              </div>
              <div class="form__section">
                <label for="Kullanıcı Tipi" class="input-label">
                  <strong>Kulanıcı Tipi</strong>
                </label>
                <input type="text" name="Kullanıcı Tipi" v-model="user.userType" class="xs" />
              </div>
              <div class="form__section align-top">
                <label for="Roller" class="input-label">
                  <strong>Roller</strong>
                </label>
                <div class="label-side">
                  <template v-if='roleData.length > 0'>
                    <div v-for="(role, i) in roleData" :key="i">
                      <dxFormCheckboxInput name="Rol" :checked="getChecked(role.value)" @input="setChecked(role.value)" :value="role.value"/>
                      <label for="Rol">{{role.name}}</label>
                    </div>
                  </template>
                  <label v-else for="notFoundRole">Rol Bulunamadı.</label>
                </div>
              </div>
              <div class="form__button-group empty-left-side">
                <button type="menu" class="btn grey big green" @click="DeleteUser(user.value)">Kullanıcıyı Sil</button>
                <button type="menu" class="btn grey big">
                  <input type="checkbox" name="aktif" v-model="user.isactive" :checked="user.isactive" />
                  <label v-if="user.isactive" for="aktif">Aktif</label>
                  <label v-else for="aktif">Pasif</label>
                </button>
                <button type="button" class="btn grey big" v-on:click="UpdateUser(user.value)">Kaydet</button>
                <button type="menu" class="btn grey big" @click="returnUsers">İptal</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { DELETE_USER, LOAD_ROLES, UPDATE_USER, ADD_USER_TO_ROLE, DELETE_USER_FROM_ROLE } from '../../../src/store/actions/management'
import EventBus from '../../../src/library/helpers/eventbus'
import dxFormCheckboxInput from '../customcontrols/dxFormCheckboxInput'

/**
   * This is the useredit component that is used to edit users.
   */

export default {
  name: 'ttManagementUserEdit',
  props: {
    /**
       * This prop includes the datas of selected user
       * @values JSON Array
       */
    user: {
      type: Object,
      required: true
    },
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
      updateRoles: [],
      roleData: [],
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
        if (this.$props.user.roles) {
          if (this.$props.user.roles.length > 0) {
            for (let index = 0; index < this.$props.user.roles.length; index++) {
              array.push(this.$props.user.roles[index])
            }
          }
        }
        return array
      },
      set: function (value) {
      }
    }
  },
  methods: {
    returnUsers: function () {
      this.updateRoles = []
      /**
      * This event makes the hidden this components and shows the management page.
      */
      this.$emit('return-users')
      EventBus.EmitMethod('refresh-user-table')
      EventBus.EmitMethod('refresh-role-table')
    },
    UpdateUser: function (id) {
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
      this.$dialog.confirm(this.user.name + ' ' + this.user.surname + ' ' + this.GetMessage(this, 'approve_update'), this.confirmoptions).then(dialog => {
        this.$store.dispatch(UPDATE_USER, updateUserAreaModel).then(() => {
          this.$dialog.alert(this.GetMessage(this, 'operation_success').then(dialog => {
            for (const i in _this.selectedRoles) {
              if (_this.updateRoles.findIndex(x => x.value === _this.selectedRoles[i].value) === -1) {
                _this.$store.dispatch(DELETE_USER_FROM_ROLE, { roleValue: _this.selectedRoles[i].value, userValue: id })
              }
            }
            for (const i in _this.updateRoles) {
              if (_this.selectedRoles.findIndex(x => x.value === _this.updateRoles[i].value) === -1) {
                _this.$store.dispatch(ADD_USER_TO_ROLE, { roleValue: _this.updateRoles[i].value, user: updateUserAreaModel })
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
        this.$store.getters.roleData.forEach(element => {
          this.roleData.push(element)
        })
      })
      console.log(this.roleData)
    },
    DeleteUser: function (id) {
      const deleteUserAreaModel = {
        Id: id
      }
      this.$dialog.confirm(this.GetMessage(this, 'approve_delete'), this.confirmoptions).then(dialog => {
        this.$store.dispatch(DELETE_USER, deleteUserAreaModel).then(() => {
          this.returnUsers()
        })
      })
    },
    getChecked (value) {
      return this.selectedRoles.findIndex(x => x.value === value) !== -1
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
        this.updateRoles.push(this.roleData[this.roleData.findIndex(x => x.value === value)])
      }
    }
  }
}
</script>

<style>

</style>
