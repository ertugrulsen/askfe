<template>
  <v-card elevation="2" class="m-4 questions-card" >
    <v-icon class="question-icon lock" small v-if="!question.IsActive">fas fa-lock</v-icon>
    <v-list-item :key="question.title">
      <v-list-item-avatar>
      <v-avatar
        color="#1976d2"
        size="20"
      >
        <span class="questionVoteCount">{{question.UpVotes-question.DownVotes}}</span>
      </v-avatar>
            </v-list-item-avatar>
      <router-link :to="{ name: 'QuestionDetail', query:{ id:this.question.Id}}" class="nav-link v-list-item__content">
        <v-list-item-content>

          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip1 }">
              <v-list-item-title v-on="{ ...tooltip1 }" v-html="question.Header" ></v-list-item-title>
            </template>
            <span>{{question.Header}}</span>
          </v-tooltip>

        </v-list-item-content>
      </router-link>
      <div class="right-side">

        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip2 }">
            <div class="writername" v-on="{ ...tooltip2 }" >{{question.CreateUser}}</div>
          </template>
          <span>{{question.CreateUser}}</span>
        </v-tooltip>
                  <v-divider class="questionDivider"></v-divider>
        <div>{{question.CreateDate}}</div>
        <div>{{question.CreateTime}}</div>
      </div>
    </v-list-item>
  </v-card>
</template>

<script>

export default {
  name: 'question',
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    GetCurrentIcon: function (question) {
      console.log(question)
      if (question.closed === true) {
        return 'fas fa-lock'
      } else if (question.done === true) {
        return 'mdi-checkbox-marked-circle'
      }
    }
  }
}
</script>

<style>
@import "question.css";
</style>
