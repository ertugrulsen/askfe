<template>
  <div class="vertnav navbar navbar-light">
    <div id="menu__logo">
      <v-img
        lazy-src="../../assets/images/definex-pic.jpg"
        max-height="85"
        max-width="220"
        src="../../assets/images/definex-pic.jpg"
        alt="Definex Logo"></v-img>
    </div>
    <p v-if="currentUser" class="font-weight-bold px-5 h5  mt-4 mb-1">
      <span>{{GetLabel(this, "leftmenu_welcome")}} {{currentUser.UserName}}</span>
    </p>
    <v-list  nav dense >
      <v-list-item-group
        class="mb-2"
        color="primary" >
        <router-link :to="{ name: 'Home'}" class="nav-link">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ GetLabel(this, 'leftmenu_dashboard') }}</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link :to="{ name: 'AskQuestion'}" class="nav-link">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>far fa-question-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ GetLabel(this, 'leftmenu_askquestion') }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
    <div class="language d-block d-sm-none">
       <dxFormCombobox id="language_selection" :selectedValue="selectedLanguage" :items="languageList" @input="onLanguageChange"/>
    </div>
    <v-list nav dense v-if="currentUser"  class="logout">
      <v-list-item-group
        class="mb-2"
        color="primary" >
          <router-link class="nav-link" v-if="currentUser" :to="{ name: 'Home'}">
            <v-list-item v-if="currentUser" link @click="LogOut">
              <v-list-item-icon>
                <v-icon>fas fa-sign-out-alt</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ GetLabel(this, 'leftmenu_logout') }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
  </div>
</template>

<script>
import constant from '../../library/constants/constants'
import { AUTH_LOGOUT } from '../../store/actions/auth'
import i18n from '../../library/plugins/i18n.js'

export default {
  name: 'left-menu',
  components: {
    dxFormCombobox: () => import('../customcontrols/dxInput/dxFormCombobox/dxFormCombobox')
  },
  mounted () {
    this.GetCurrentUser()
  },
  data () {
    return {
      currentUser: null,
      globalRoles: constant.role,
      selectedLanguage: constant.language.TR,
      languageList: [{ value: constant.language.TR, text: 'TR' }, { value: constant.language.EN, text: 'EN' }],
    }
  },
  methods: {
    onLanguageChange: function (item) {
      i18n.locale = item
    },
    GetCurrentUser: function () {
      this.currentUser = this.$store.getters.currentUser;
      console.log(this.currentUser)
    },
    AuthorizationCheck: function (page) {
      if (this.$store.getters.currentUser) { return this.$store.getters.currentUser.Roles.includes(page) } else { return false }
    },
    LogOut: function () {

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    
      this.$store.dispatch(AUTH_LOGOUT)
        .then(response => {
          localStorage.clear()
          location.reload()
        })
    }

  }
}
</script>
<style>
.language{
  width: 100px;
  text-align: center;
}
</style>
