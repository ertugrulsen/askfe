<template>
  <v-container>
    <v-card elevation="2" class="pt-4">
      <v-row>
        <v-col cols="9">
          <votes v-bind:type="1" v-bind:parent="this.question"/>
          <v-card-title class="pl-9"><h5>{{question.Header}}</h5></v-card-title>
        </v-col>
        <v-col cols="3" class="pb-0 text-right">
          <div class="d-block pa-3 text-right">{{question.CreateUser}},  {{question.CreateDate}}</div>
          <v-btn class="deleteQuestionBtn" v-if="activeUser == question.UserId" icon v-on:click="deleteQuestion()">
            <v-icon> mdi-minus-circle</v-icon>
          </v-btn>
          <v-btn v-if="activeUser == question.UserId" icon v-on:click="pasiveQuestion()">
            <v-icon> mdi-lock</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="quill-container">
          <v-divider></v-divider>
          <div class="detail" v-html="question.Detail"></div>
        </v-col>
        <v-col cols="12" class="mx-0 ">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="pt-0">
          <comments v-bind:type="1" v-if="this.question.Id" v-bind:parent="this.question.Id.toString()" v-bind:comments="this.question.CommentList" />
        </v-col>
      </v-row>
    </v-card>
    <answers v-if="this.question.AnswerList" v-bind:parent="this.question.Id.toString()" v-bind:answers="this.question.AnswerList" />
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import moment from 'moment'
import { DELETE_QUESTION, GET_QUESTION_BY_ID, CLOSE_QUESTION } from '../../../store/actions/question'
import comments from '../../../components/comments/comments'
import answers from '../../../components/answers/answers'
import votes from '../../../components/votes/votes.vue'

export default {
  name: 'QuestionDetail',
  data () {
    return {
      question: {},
      activeUser: '',
      overlay: false
    }
  },
  components: {
    comments,
    answers,
    votes
  },
  created () {
    this.getQuestion()
    this.activeUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).UserId : ''
  },
  methods: {
    getQuestion: function () {
      this.allQuestion = []
      this.overlay = true
      this.$store.dispatch(GET_QUESTION_BY_ID, { id: this.$route.query.id }).then(() => {
        this.$store.getters.question.data.Response.CreateDate = this.formatDate(this.$store.getters.question.data.Response.CreateDate)
        this.overlay = false
        const question = this.$store.getters.question.data.Response
        // answers date
        question.AnswerList.forEach(answer => {
          answer.CreateDate = this.formatDate(answer.CreateDate)
          // answer > comment
          answer.CommentList.forEach(comment => {
            comment.CreateDate = this.formatDate(comment.CreateDate)
          })
        })

        // question > comment
        question.CommentList.forEach(com => {
          com.CreateDate = this.formatDate(com.CreateDate)
        })
        // fill question
        this.question = this.$store.getters.question.data.Response
      })
    },
    formatDate (date) {
      return moment(String(date)).format('DD/MM/YYYY')
    },
    deleteQuestion () {
      this.overlay = true
      this.$store.dispatch(DELETE_QUESTION, this.getParams()).then(response => {
        this.overlay = false
        this.$router.push('/')
      }).catch(errorCode => { this.overlay = false; this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    },
    pasiveQuestion () {
      this.overlay = true
      this.$store.dispatch(CLOSE_QUESTION, this.getParams()).then(response => {
        this.overlay = false
        this.getQuestion()
      }).catch(errorCode => { this.overlay = false; this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    },
    getParams () {
      return { Id: parseInt(this.$route.query.id), IsActive: this.question.IsActive }
    }
  }
}
</script>

<style>
.detail-text{
  margin: 10px;
  width: calc(100% - 22px);
}
.vote-icon{
  position: absolute !important;
}
.down{
  top:53px;
}
.up{
  top:10px
}
.disable-down{
  cursor: no-drop !important;
}
.disable-up{
  cursor: no-drop !important;
}
.votes{
  position: absolute;
  top: 30px;
  text-align: center;
  width: 36px;
}
.detail{
 padding: 10px 20px;
}
.deleteQuestionBtn{
  color:#980505d9 !important
}
</style>
