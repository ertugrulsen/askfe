<template>
  <nav class="topnav navbar navbar-light">
    <ul class="nav">
      <li class="nav-item d-none d-sm-block">
        <dxFormCombobox id="language_selection" :selectedValue="selectedLanguage" :items="languageList" @input="onLanguageChange"/>
      </li>

      <v-menu transition="slide-y-transition" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <a class="nav-link dropdown-toggle text-muted pr-0" href="#"
            id="navbarDropdownMenuLink" role="button"  v-bind="attrs"
            v-on="on"  aria-expanded="false">
            <span class="avatar avatar-sm mt-2">
              <v-avatar  size="30px">
                <img src="../../assets/images/avatars/avatar (4).png" alt="..." >
              </v-avatar>
            </span>
          </a>
        </template>
        <v-list>
          <router-link v-if="currentUser" :to="{ name: 'AskQuestion'}" >
            <v-list-item link>
              <v-list-item-title>{{ GetLabel(this, 'navbar_ask_question') }}</v-list-item-title>
            </v-list-item>
          </router-link>

        <router-link v-if="!currentUser" :to="{ name: 'login'}" >
          <v-list-item link>
            <v-list-item-title>{{ GetLabel(this, 'navbar_login') }}</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link v-if="currentUser" :to="{ name: 'Home'}" >
          <v-list-item v-if="currentUser" link @click="LogOut">
            <v-list-item-title>{{ GetLabel(this, 'navbar_logout') }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-menu>
    </ul>
  </nav>
</template>

<script>
import constant from '../../library/constants/constants'
import { AUTH_LOGOUT } from '../../store/actions/auth'
import i18n from '../../library/plugins/i18n.js'

export default {
  name: 'nav-menu',
  mounted () {
    this.GetCurrentUser()
  },
  data () {
    return {
      drawer: false,
      selectedLanguage: constant.language.TR,
      languageList: [{ value: constant.language.TR, text: 'TR' }, { value: constant.language.EN, text: 'EN' }],
      currentUser: null,
      globalRoles: constant.role
    }
  },
  components: {
    dxFormCombobox: () => import('../customcontrols/dxInput/dxFormCombobox/dxFormCombobox')
  },
  methods: {
    GetCurrentUser: function () {
      this.currentUser = this.$store.getters.currentUser
    },
    onLanguageChange: function (item) {
      i18n.locale = item
    },
    AuthorizationCheck: function (page) {
      return this.$store.getters.currentUser.Roles.includes(page)
    },
    LogOut: function () {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(response => {
          localStorage.clear()
          location.reload()
        })
    },
    AskQuestion: function () {
      this.$router.push('/askQuestion')
    },
    Profile: function () {
      this.$router.push('/profile')
    }
  }
}
</script>
