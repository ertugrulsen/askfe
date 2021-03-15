<template>
  <v-container class="main-tabs" >
    <v-card >
      <v-tabs
        v-model="tabs"
        fixed-tabs >
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          href="#mobile-tabs-5-1"
          class="primary--text"  >
          {{ GetLabel(this, 'all_question') }}
        </v-tab>
        <v-tab
          href="#mobile-tabs-5-2"
          class="primary--text"  >
          {{ GetLabel(this, 'all_unanswered') }}
        </v-tab>
        <v-tab
          href="#mobile-tabs-5-3"
          class="primary--text" >
          {{ GetLabel(this, 'most_viewed') }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item
          :key="1"
          :value="'mobile-tabs-5-' + 1" >
          <v-list three-line>
            <template v-if="allQuestion.length === 0">
              <v-skeleton-loader v-for="item in [1,2,3,4]" :key="item"
                v-bind="attrs"
                type="list-item-avatar-three-line">
              </v-skeleton-loader>
            </template>
            <question v-else v-for="item in allQuestion" :key="item.id" v-bind:question="item" />
            <div v-intersect="{handler: onIntersect1}"></div>
            <v-progress-linear v-if="request1IsWorking && allQuestion.length > 0" class="progress" indeterminate color="cyan" ></v-progress-linear>
          </v-list>
        </v-tab-item>
        <v-tab-item
          :key="2"
          :value="'mobile-tabs-5-' + 2" >
          <v-list three-line>
            <template v-if="allUnanswered.length === 0">
              <v-subheader> {{ GetLabel(this, 'question_not_found') }} </v-subheader>
            </template>
            <question v-else v-for="item in allUnanswered" :key="item.id" v-bind:question="item" />
            <div v-intersect="{handler: onIntersect2}"></div>
            <v-progress-linear v-if="request2IsWorking && allUnanswered.length > 0" class="progress" indeterminate color="cyan" ></v-progress-linear>
          </v-list>
        </v-tab-item>
        <v-tab-item
          :key="3"
          :value="'mobile-tabs-5-' + 3" >
          <v-list three-line>
            <template v-if="mostVoted.length === 0">
              <v-subheader> {{ GetLabel(this, 'question_not_found') }} </v-subheader>
            </template>
            <question v-else v-for="item in mostVoted" :key="item.id" v-bind:question="item" />
            <div v-intersect="{handler: onIntersect3}"></div>
            <v-progress-linear v-if="request3IsWorking && mostVoted.length > 0" class="progress" indeterminate color="cyan" ></v-progress-linear>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <span ref="lastElement"></span>
  </v-container>
</template>

<script>
import question from '../../../components/question/question'
import { ALL_QUESTION, ALL_MOST_VOTED, ALL_UNANSWERED } from '../../../store/actions/question'
import moment from 'moment'

// data part is example
export default {
  name: 'Home',
  data () {
    return {
      attrs: {
        class: 'm-3',
        elevation: 1
      },
      allQuestion: [],
      allUnanswered: [],
      mostVoted: [],
      tabs: null,
      currentPage: 0,
      currentPageMostVoted: 0,
      currentPageUnanswered: 0,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  components: {
    question
  },
  created () {
    this.GetQuestionAll()
    this.GetUnanswered()
    this.GetMostVoted()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    offsetTop (val) {
      console.log(val)
      //  this.callbackFunc()
    }
  },
  methods: {
    handleScroll: function (e) {
      if (this.isElementInViewport(this.$refs.lastElement)) {
        console.log('request for next page')
      }
    },
    isElementInViewport (el) {
      var rect = el.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    GetQuestionAll: function () {
      this.allQuestion = []
      this.$store.dispatch(ALL_QUESTION, { currentPage: this.currentPage }).then(() => {
        console.log(this.$store.getters.allQuestion.data.Response)
        this.$store.getters.allQuestion.data.Response.forEach(element => {
          element.CreateTime = moment(String(element.CreateDate)).format('HH:mm')
          element.CreateDate = moment(String(element.CreateDate)).format('DD/MM/YYYY')
          this.allQuestion.push(element)
        })
        this.request1IsWorking = false
      })
    },
    GetUnanswered: function () {
      this.$store.dispatch(ALL_UNANSWERED, { currentPage: this.currentPageUnanswered }).then(() => {
        this.$store.getters.allUnanswered.data.Response.forEach(element => {
          element.CreateTime = moment(String(element.CreateDate)).format('HH:MM')
          element.CreateDate = moment(String(element.CreateDate)).format('DD/MM/YYYY')
          this.allUnanswered.push(element)
        })
        this.request2IsWorking = false
      })
    },
    GetMostVoted: function () {
      this.$store.dispatch(ALL_MOST_VOTED, { currentPage: this.currentPageMostVoted }).then(() => {
        this.$store.getters.mostVoted.data.Response.forEach(element => {
          element.CreateTime = moment(String(element.CreateDate)).format('HH:MM')
          element.CreateDate = moment(String(element.CreateDate)).format('DD/MM/YYYY')
          this.mostVoted.push(element)
        })
        this.request3IsWorking = false
      })
    }
  }
}
</script>

<style>
@import "home.css";
</style>
