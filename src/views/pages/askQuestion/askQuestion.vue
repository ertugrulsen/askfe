<template>
  <v-container >
    <v-card class="pa-2 ">
      <v-row :align="center" no-gutters>
        <v-col cols="12" class="px-3 text-center">
          <v-form  ref="form" v-model="valid" lazy-validation>
            <v-card-title>{{ GetLabel(this, 'navbar_ask_question') }}</v-card-title>
            <dxFormTextInput id="question_title"  ref="titleComponentRef" v-model="title" placeholder="question_title" :clear="true" :isRequired=true />
          </v-form>
        </v-col>
        <v-col cols="12" class="px-3 pa-3 text-center quill-container">
        <!-- Or manually control the data synchronization -->
          <quill-editor
            :content="content"
            :options="editorOption"
            @change="onEditorChange($event)"
            :isRequired=true />
        </v-col>
        <v-col cols="12" class="px-3">
          <v-alert v-if="this.content === ''"
                dense
                outlined
                type="error"
              >
              {{ GetLabel(this, 'warning_question_body') }}
          </v-alert>
        </v-col>
        <v-col cols="12" class="px-3 text-center">
          <v-btn color="btn btn-lg primary btn-block"  @click="askQuestion">
            {{ GetLabel(this, 'navbar_ask_question') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import dxFormTextInput from '../../../components/customcontrols/dxInput/dxFormTextInput/dxFormTextInput'
import { ADD_QUESTION } from '../../../store/actions/question'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AskQuestion',
  data () {
    return {
      tags: [],
      content: ``,
      editorOption: {},
      center: 'center',
      title: '',
      valid: ''
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  components: {
    dxFormTextInput,
    quillEditor
  },
  methods: {
    onEditorChange ({ quill, html, text }) {
      this.content = html
    },
    askQuestion: function () {
      if (!this.$refs.form.validate()) {
        return
      }

      if (this.content === null || this.content === "") {
        return
      }

      this.$store.dispatch(ADD_QUESTION, {
        Header: this.$refs.titleComponentRef.inputVal,
        Detail: this.content,
        UserId: JSON.parse(localStorage.getItem('currentUser')).UserId,
        IsActive: true,
        IsAccepted: true
      }).then(response => {
        if (this.$store.getters.questionId.Id !== '') {
          this.$router.push({ name: 'QuestionDetail', query: { id: this.$store.getters.questionId } })
        } else if (this.$store.getters.questionId.IsSucceed === false) {
          this.$dialog.alert(this.GetErrorMessage(this, this.$store.getters.questionId.ErrorCode), this.alertoptions) 
        }
      }).catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    }
  }
}
</script>

<style scoped>
.quill-container{
  height: 250px;
}
.quill-editor{
  height: calc(100% - 65px)
}
</style>

