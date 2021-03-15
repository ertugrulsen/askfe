<template>
  <v-row v-if="activeUser">
    <v-col cols="12" >
      <v-icon :class="bindDownClass()" small @click="DownVote">fas fa-thumbs-down</v-icon>
      <div class="votes">{{parent.UpVotes-parent.DownVotes}}</div>
      <v-icon :class="bindUpClass()" small @click="UpVote" >fas fa-thumbs-up</v-icon>
    </v-col>
  </v-row>
</template>
<script>
import { QUESTION_VOTE_UP, QUESTION_VOTE_DOWN } from '../../store/actions/question'
import { VOTE_UP, VOTE_DOWN } from '../../store/actions/answer'
export default {
  name: 'votes',
  props: {
    parent: {
      type: Object
    },
    type: {
      type: Number
    }
  },
  created: function () {
    this.activeUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).UserId : ''
  },
  data () {
    return {
      input: false,
      valid: true,
      downClass: 'vote-icon down',
      upClass: 'vote-icon up',
      disableDown: false,
      disableUp: false
    }
  },
  methods: {
  // metods
    bindDownClass: function () {
      if (this.disableDown === true) {
        return 'disable-down ' + this.downClass
      }

      return this.downClass
    },
    bindUpClass: function () {
      if (this.disableUp === true) {
        return 'disable-up ' + this.upClass
      }

      return this.upClass
    },
    UpVote: function () {
      if (this.disableUp === true) {
        return
      }

      const request = {
        Id: this.parent.Id
      }

      this.disableUp = true
      // type = 1 question, type = 2 answer
      this.$store.dispatch(this.getUrl('up'), request).then(response => {
        this.parent.UpVotes++

        if (this.disableDown === true) {
          this.disableDown = false
          this.parent.UpVotes++
        }
      }).catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    },
    DownVote: function () {
      if (this.disableDown === true) {
        return
      }

      const request = {
        Id: this.parent.Id
      }

      this.disableDown = true
      // type = 1 question, type = 2 answer
      this.$store.dispatch(this.getUrl('down'), request).then(response => {
        this.parent.DownVotes++

        if (this.disableUp === true) {
          this.disableUp = false
          this.parent.DownVotes++
        }
      }).catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    },
    getUrl: function (param) {
      // up
      if (param === 'up') {
        return this.type === 1 ? QUESTION_VOTE_UP : VOTE_UP
      }
      // down
      return this.type === 1 ? QUESTION_VOTE_DOWN : VOTE_DOWN
    }
  }
}
</script>
