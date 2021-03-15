<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" fixed temporary>
      <LeftMenu />
    </v-navigation-drawer>
    <v-app-bar class="main-header" app>
      <div class="first-row">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field class="search-header"
          v-bind:placeholder="GetLabel(this, 'search')"
          @keyup.enter="search"
          filled
          rounded
          clearable
          v-model="searchText"
          append-outer-icon="fa-search">
        </v-text-field>
        <v-spacer></v-spacer>
        <NavBar />
      </div>
    </v-app-bar>
    <!-- It will visible only main search page -->
    <v-carousel v-if="$route.meta.carosel" hide-delimiters>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src">
      </v-carousel-item>
    </v-carousel>
    <v-main style="background-color:#f8f8f8;">
      <router-view></router-view>
    </v-main>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import LeftMenu from '../../components/left-menu/left-menu'
import NavBar from '../../components/nav-bar/nav-bar'
import EventBus from '../../../src/library/helpers/eventbus'

export default {
  name: 'DefaultLayout',
  components: {
    LeftMenu,
    NavBar
  },
  data: function () {
    return {
      searchText: '',
      items: [
        {
          src: 'https://teamdefinex.com/assets/images/company/banner/the_company_banner.jpg'
        },
        {
          src: 'https://teamdefinex.com/assets/images/careers/sliders/careers-17jul.jpg'
        },
        {
          src: 'https://teamdefinex.com/assets/images/company/banner/the_company_banner.jpg'
        },
        {
          src: 'https://teamdefinex.com/assets/images/careers/sliders/careers-17jul.jpg'
        }
      ],
      message: 'Lütfen Bekleyin',
      drawer: null
    }
  },
  methods: {
    search: function () {
      if (this.searchText.trim() !== '') {
        if (this.$router.currentRoute.name === 'Search') {
          EventBus.EmitMethodWithValue('search-updated', { data: this.searchText })
        } else {
          this.$router.push({ path: '/search', query: { text: this.searchText } })
        }
      }
    }
  }
}
</script>
