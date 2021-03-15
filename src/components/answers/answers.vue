<template>
  <v-list >
    <v-card elevation="1"  v-for="answer in answers" :key="parseInt(answer.Id)">
      <v-list-item class="mt-6">
        <v-list-item-content class="answer-content text--disabled px-0">
            <votes v-bind:type="2" v-bind:parent="answer"/>
            <textarea id="answerInput" class="answer-input" v-model="answer.Answer" :readonly=true ></textarea>
          <v-list-item-subtitle class="answer-subtitle text-right"><span class="primary--text">{{answer.CreateUser}}</span>{{ answer.CreateDate? ', '+answer.CreateDate :'' }}</v-list-item-subtitle>
          <v-col v-if="currentUser.UserName == answer.CreateUser" cols="12" class="text-right">
            <v-btn small color="red" class="ma-2" dark v-on:click="deleteAnswer(answer.Id)" v-bind="answer.Id">{{ GetLabel(this, 'answer_delete') }}
              <v-icon small  dark right> mdi-minus-circle</v-icon>
            </v-btn>
          </v-col>
          <v-row>
            <v-col cols="12" class="pt-0">
              <comments v-bind:type="2" v-bind:parent="answer.Id.toString()" v-bind:comments="answer.CommentList" />
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card v-if="currentUser" elevation="1" >
      <v-list-item class="ma-6">
        <v-list-item-content>
          <v-list-item-title class="h6 font-weight-bold">Add your answer</v-list-item-title>
          <v-row>
            <v-col cols="12" >
              <v-form  ref="form" v-model="valid" lazy-validation>
                <textarea id="answerInput" v-model="answerInput" ref="commentsRef" placeholder="Your answer" :clear="true" :isRequired=true ></textarea>
              </v-form>
            </v-col>
           <v-col cols="12" class="text-right">
              <v-btn small color="primary" @click="save">
                <v-icon small  class="comment-icon" >fas fa-plus-circle</v-icon>  {{ GetLabel(this, 'answer_save') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-list>
</template>

<script>
import comments from '../comments/comments'
import votes from '../votes/votes'
import { ADD_ANSWER, DELETE_ANSWER } from '../../store/actions/answer'

import { DELETE_ANSWERS_COMMENTS } from '../../store/actions/comment'

export default {
  name: 'answers',
  mounted () {
    this.GetCurrentUser()
  },
  props: {
    answers: {
      type: Array
    },
    parent: {
      type: String
    }
  },
  components: {
    comments,
    votes
  },
  data () {
    return {
      input: false,
      valid: true,
      answerInput: '',
      currentUser: ''
    }
  },
  methods: {
    GetCurrentUser: function () {
      this.currentUser = this.$store.getters.currentUser
      console.log(this.$store.getters.currentUser)
    },
    save () {
      if (!this.$refs.form.validate() && this.currentUser !== '') {
        return
      }
      this._newAnswer = this.answerInput
      this.UserName = this.currentUser.UserName
      this.UserId = this.currentUser.UserId
      this.$store.dispatch(ADD_ANSWER, { QuestionId: parseInt(this.parent), Answer: this._newAnswer, UserId: this.UserId }).then(response => {
        console.log(this.$store.getters.answerId)
        this.answers.push(
          {
            Id: this.$store.getters.answerId.toString(),
            CreateUser: this.UserName,
            Answer: this._newAnswer,
            CommentList: [],
            CreateDate: undefined,
            UpVotes: 1,
            DownVotes: 1
          })
        this.answerInput = ''
      }).catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    },
    deleteAnswer: function (questionAnswerId) {
      const request = {
        Id: parseInt(questionAnswerId),
        IsActive: true
      }

      this.$store.dispatch(DELETE_ANSWER, request).then(response => {
        this.answers.splice(this.answers.findIndex((el) => {
          return el.Id === questionAnswerId
        }), 1)
      }).catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
      this.$store.dispatch(DELETE_ANSWERS_COMMENTS, request).then(response => {
      }).catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    }
  }
}
</script>

<style scoped>
.comment-content{
  border-bottom:1px solid gray;
  padding-top: 0px;
  padding-bottom: 3px;
}
.comment-icon{
  font-size: 16px;
  padding-right: 6px;
  padding-bottom: 2px;
}
.theme--light.v-list {
  background: transparent;
}
.answer-input{
  width: calc(100% - 40px);
  margin-left: 40px;
  margin-top:-6px;
}
.v-list-item__content > * {
    line-height: 1.1;
    flex: 1 1 100% !important;
}
textarea{
  min-height: 150px;
}
</style>
