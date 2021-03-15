<template>
  <v-container class="main-tab" >
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
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item
          :key="1"
          :value="'mobile-tabs-5-' + 1" >
          <v-list three-line>
            <template v-if="allQuestionSearchList.length === 0">
               <v-subheader> {{ GetLabel(this, 'question_not_found') }} </v-subheader>
            </template>
            <question v-else v-for="item in allQuestionSearchList" :key="item.Id" v-bind:question="item" />
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import { SEARCH_QUESTION } from '../../../store/actions/question'
import moment from 'moment'
import question from '../../../components/question/question'
import EventBus from '../../../../src/library/helpers/eventbus'

export default {
  name: 'Search',
  mounted () {
    EventBus.GetEventBus().$on('search-updated', (eventData) => {
      if (eventData !== null || eventData !== undefined) {
        this.SearchWithElastic(eventData.data)
      }
    })
  },
  data () {
    return {
      attrs: {
        class: 'm-3',
        elevation: 1
      },
      allQuestionSearchList: [],
      tab: null,
      currentPage: 1,
      pageSize: 5,
      tabs: [],
      onDataFound: false
    }
  },
  components: {
    question
  },
  created () {
    this.SearchWithElastic()
  },
  methods: {
    SearchWithElastic: function (searchText) {
      var query = ''
      if (searchText !== undefined) {
        query = searchText
      } else {
        query = this.$route.query.text
      }
      this.allQuestionSearchList = []
      this.$store.dispatch(SEARCH_QUESTION, { page: this.currentPage, query: query, pageSize: this.pageSize }).then((response) => {
        var data = response.data.Response.SearchModelList
        if (data.length === 0) {
          this.onDataFound = false
        } else {
          data.forEach(element => {
            element.CreateTime = moment(String(element.CreateDate)).format('HH:mm')
            element.CreateDate = moment(String(element.CreateDate)).format('DD/MM/YYYY')
            this.allQuestionSearchList.push(element)
          })
          this.onDataFound = true
        }
      })
    }
  }
}
</script>
<style>
.v-subheader{
  text-align: center;
  display: grid;
  font-size: 15px;
}
</style>
