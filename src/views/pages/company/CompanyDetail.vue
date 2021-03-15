 <template>
 <v-row>
      <v-col cols="12" md="6">
      <h2 class="page-title"> {{GetLabel(this, "company_company_information")}} </h2>
        </v-col>
   <v-col cols="12" md="12">
      <div>
          <CompanyInformation :visible="true"/>
      </div>
           <v-row>
            <v-col cols="12" md="12">
              <CompanyUser :visible="true"/>
            </v-col>
          </v-row>
   </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'CompanyDetail',
  data () {
    return {
    }
  },
  components: {
    CompanyInformation: () => import('../../../components/partialpages/company/CompanyInformation'),
    CompanyUser: () => import('../../../components/partialpages/company/CompanyUser')
  },
  created () {
  },
  methods: {
  }
}
</script>
