<template>
  <v-app id="app">
    <router-view />
</v-app>
</template>

<script>

import Axios from 'axios'
import configStore from './library/helpers/configStore'

export default {

  mounted () {
    Axios.get('../settings.json')
      .then((response) => {
        configStore.settings = response.data
      })
  }
}
</script>
