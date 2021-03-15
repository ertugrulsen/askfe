<template>
  <div>
    <div class="scene" id="management__group__edit" :class="{active:visible}">
      <div class="part equal white-bg short-label">
        <h4 class="green">Rol Düzenle</h4>
        <button type="button" class="btn top small white" @click="returnRoles()">
          <i class="fas fa-chevron-left"></i>
          Tüm Roller
        </button>
        <div class="form">
          <div class="part">
            <div class="form__section">
              <label for="ad" class="input-label">
                <strong>Ad</strong>
              </label>
              <input type="text" name="ad" value="Grup 1" class="xs" v-model="role.name" />
            </div>
            <div class="form__section">
              <label for="Açıklama" class="input-label">
                <strong>Açıklama</strong>
              </label>
              <input
                type="text"
                name="Açıklama"
                value="Mobil Hat Sorgulama"
                class="xs"
                v-model="role.description"
              />
            </div>
            <div class="form__section align-top">
              <label for="Kullanıcılar" class="input-label">
                <strong>Kullanıcılar</strong>
              </label>
              <div class="label-side">
                <template v-if='userData.length > 0'>
                  <div v-for="(user, i) in userData" :key="i">
                    <dxFormCheckboxInput
                      name="Kullanıcı"
                      :checked="getChecked(user.value)"
                      @input="setChecked(user.value)"
                      :value="role.value"
                    />
                    <label for="Kullanıcı">{{user.name + ' ' + user.surname}}</label>
                  </div>
                </template>
                <label v-else for="notFoundUser">Kullanıcı Bulunamadı.</label>
              </div>
            </div>
            <div class="form__button-group empty-left-side">
              <button type="menu" class="btn grey big" @click="UpdateRole(role.value)">Kaydet</button>
              <button type="menu" class="btn grey big" @click="returnRoles()">İptal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_USER, UPDATE_ROLE, DELETE_ROLE_FROM_USER, ADD_ROLE_TO_USER } from '../../../src/store/actions/management'
import EventBus from '../../../src/library/helpers/eventbus'
import dxFormCheckboxInput from '../customcontrols/dxFormCheckboxInput'

/**
   * This is the roleedit component that is used to edit roles.
   */

export default {
  name: 'ttManagementRoleEdit',
  props: {
    /**
       * Makes visible or hidden this component in page.
       * @values true, false
       */
    visible: {
      type: Boolean,
      required: true
    },
    /**
       * This prop includes the datas of selected role
       * @values JSON Array
       */
    role: {
      type: Object,
      required: true
    }
  },
  components: {
    dxFormCheckboxInput
  },
  data () {
    return {
      updateUsers: [],
      userData: [],
      alertoptions: {
        okText: 'Tamam'
      },
      confirmoptions: {
        okText: 'Evet',
        cancelText: 'Hayır',
        animation: 'bounce'
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
  updated () {
    this.updateUsers = this.selectedUsers.slice()
  },
  computed: {
    selectedUsers: {
      get: function () {
        const array = []
        if (this.$props.role.users) {
          if (this.$props.role.users.length > 0) {
            this.$props.role.users.forEach((element) => {
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
      /**
      * This event makes the hidden this components and shows the management page.
      */
      this.$emit('return-roles')
      EventBus.EmitMethod('refresh-user-table')
      EventBus.EmitMethod('refresh-role-table')
    },
    UpdateRole: function (id) {
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
      return this.selectedUsers.findIndex(x => x.value === value) !== -1
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
