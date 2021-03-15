<template>
  <div>
    <div class="info-box popup-box" :class="{active :showInfo}">
        <button type="button" @click="clickshowInfo">
      <i class="fal fa-info-square"></i>
    </button>
      <div class="info-box__info popup">
        <div class="white-bg">
          <button type="button" class="info-box__info__close green" @click="clickhidePopUp">
            <i class="fal fa-times"></i>
          </button>
          <div v-if="userRoles" class="grey-bg">
            <p v-for="(role, i) in userRoles" :key="i" >{{role.name}}</p>
          </div>
          <div v-else-if="roleUsers" class="grey-bg">
            <p v-for="(user, i) in roleUsers" :key="i" >{{user.name + ' ' + user.surname}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ttInfoPopupBox',
  props: {
    userRoles: {
      type: Array,
      required: false
    },
    roleUsers: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      showInfo: false
    }
  },
  methods: {
    clickshowInfo: function () {
      this.showInfo = !this.showInfo
    },
    clickhidePopUp: function () {
      this.showInfo = false
    }
  }
}
</script>

<style>
</style>
