<template>
  <v-list class="pl-3 pr-3">
    <v-list-item  v-for="comment in comments" :key="parseInt(comment.Id)" >
      <v-list-item-content class="comment-content text--disabled px-0">
        <v-list-item-title v-if="selectedCommentId != comment.Id" v-text="comment.Comment"></v-list-item-title>
        <dxFormTextInput v-if="selectedCommentId == comment.Id" class="commentInput" id="updateCommentInput" ref="commentsRef" v-model="comment.Comment" :clear="true" :isRequired=true />
        <v-list-item-subtitle v-if="selectedCommentId != comment.Id" class="comment-subtitle text-right"><span class="primary--text">{{comment.CreateUser }}</span> {{comment.CreateDate ?', '+ comment.CreateDate:''}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="comment-update-delete-area">
        <v-icon small @click="deleteComment(comment.Id)" v-if="isUpdateable(comment)&& selectedCommentId != comment.Id" class="comment-icon px-2 comment-update">mdi-minus-circle</v-icon>
        <v-icon small @click="selectedCommentId = comment.Id" v-if="isUpdateable(comment) && selectedCommentId != comment.Id" class="comment-icon px-2 comment-update">fas fa-pencil-alt</v-icon>
        <v-icon small @click="selectedCommentId=-1" v-if="isUpdateable(comment) && selectedCommentId == comment.Id" class="comment-icon px-2 comment-update">mdi-cancel</v-icon>
        <v-icon small @click="updateComment(comment)" v-if="isUpdateable(comment) && selectedCommentId == comment.Id" class="comment-icon px-2 comment-update"> mdi-checkbox-marked-circle</v-icon>
        </v-list-item-action>
    </v-list-item>
    <v-list-item >
      <v-list-item-content >
        <v-row >
          <v-col v-if="input" cols="12" >
            <v-form  ref="form" v-model="valid" lazy-validation>
              <dxFormTextInput  id="commentInput" ref="commentsRef" v-model="newComment" placeholder="your_comment" :clear="true" :isRequired=true />
            </v-form>
          </v-col>
          <v-col v-if="activeUser" cols="12"  class="text-right">
            <v-btn x-small outlined  color="blue darken-2"  v-if="!input" @click="input = !input" >
              <v-icon small  class="comment-icon">fas fa-pencil-alt</v-icon> Add comment
            </v-btn>
            <v-btn x-small outlined color="blue-grey"  class="mx-2 white--text" v-if="input" @click="input = !input" >
              <v-icon small  class="comment-icon">fas fa-times</v-icon>  Cancel
            </v-btn>
            <v-btn x-small outlined color="success" v-if="input" @click="save">
              <v-icon small  class="comment-icon" >fas fa-plus-circle</v-icon>  Save
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import dxFormTextInput from '../customcontrols/dxInput/dxFormTextInput/dxFormTextInput'
import { ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from '../../store/actions/comment'

export default {
  name: 'comments',
  mounted () {
    this.GetCurrentUser()
  },
  props: {
    comments: {
      type: Array
    },
    parent: {
      type: String
    },
    type: {
      type: Number,
      required: true
    }
  },
  components: {
    dxFormTextInput
  },
  created: function () {
    this.activeUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).UserId : ''
  },
  data () {
    return {
      input: false,
      valid: true,
      newComment: '',
      addedComent: '',
      selectedCommentId: -1,
      activeUser: ''
    }
  },
  methods: {
    GetCurrentUser: function () {
      this.currentUser = this.$store.getters.currentUser
    },
    save () {
      if (!this.$refs.form.validate()) {
        return
      }

      this._newComment = this.newComment

      this.$store.dispatch(ADD_COMMENT, { IsActive: true, type: parseInt(this.type), Question_Answer_Id: parseInt(this.parent), Comment: this._newComment, UserId: JSON.parse(localStorage.getItem('currentUser')).UserId }).then(response => {
        console.log(this.comments)
        // // this.$store.getters.comment
        // this.comments.includes
        this.comments.push({
          Id: this.$store.getters.commentId,
          UserId: JSON.parse(localStorage.getItem('currentUser')).UserId,
          Comment: this._newComment,
          CreateUser: JSON.parse(localStorage.getItem('currentUser')).UserName,
          CreateDate: undefined
        })
        this.newComment = ''
        this.input = false
      }).catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    },
    updateComment (comment) {
      // eslint-disable-next-line no-undef
      var newCommentText = $('#updateCommentInput').val()
      if (newCommentText.length > 0) {
        comment.Comment = newCommentText
        this.$store.dispatch(UPDATE_COMMENT, { Id: comment.Id, IsActive: true, type: parseInt(this.type), Question_Answer_Id: parseInt(this.parent), Comment: newCommentText, UserId: JSON.parse(localStorage.getItem('currentUser')).UserId }).then(response => {
          this.selectedCommentId = -1
        }).catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
      }
    },
    isUpdateable (comment) {
      if (comment.UserId === this.activeUser) {
        return true
      }

      return false
    },
    isSelected (comment) {
      if (comment.Id === this.selectedComment.Id) {
        return true
      }

      return false
    },
    deleteComment: function (commentAnswerId) {
      const request = {
        Id: commentAnswerId,
        IsActive: true
      }

      this.$store.dispatch(DELETE_COMMENT, request).then(response => {
        this.comments.splice(this.comments.findIndex((el) => {
          return el.Id === commentAnswerId
        }), 1)
      }).catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    }
  }
}
</script>

<style>
.comment-content{
  border-bottom: 1px solid #a4a4a4;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 5px;
}
.comment-icon{
  font-size: 16px;
  padding-right: 6px;
  padding-bottom: 2px;
  padding-top: 2px;
}
.comment-update{
  cursor: pointer;
}
.comment-update-delete-area{
  display: flow-root;
}
.commentInputforUpdate{
  font-size: 12px;
  height: 25px;
}
</style>
