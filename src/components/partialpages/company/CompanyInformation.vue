<template>
  <div>
      <div class="row align-items-center">
        <div class="col-md-3 text-center mb-5">
          <div class="avatar avatar-xl">
            <v-img lazy-src="../../../assets/images/definex-pic.jpg"  max-height="120" max-width="120" class="avatar-img rounded-circle" src="../../../assets/images/definex-pic.jpg"></v-img>
          </div>
        </div>
        <div class="col">
          <div class="row align-items-center">
            <div class="col-md-11">
              <h4 class="mb-1">{{companyInformation.Name}}</h4>
              <p class="small mb-3">
                 <v-chip color="grey darken-2" label  x-small>
                  {{companyInformation.CityCountry}}
                </v-chip>
              </p>
            </div>
            <div class="col">
              <v-btn type="button" fab small gray @click="editCompanyClicked"><v-icon>mdi-pencil</v-icon></v-btn>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-7">
              <p class="text-muted"> {{companyInformation.Description}} </p>
              <p class="text-muted"> {{GetLabel(this, "industry")}}: {{companyInformation.Industry}} </p>
            </div>
            <div class="col">
              <p class="small mb-0 text-muted">{{GetLabel(this, "address")}}: </p>
              <p class="small mb-0 text-muted">{{companyInformation.Address}}</p>
              <p class="small mb-0 text-muted">{{companyInformation.Phone}}</p>
              <p class="small mb-0 text-muted">{{GetLabel(this, "company_company_information_contact")}}: {{companyInformation.ContactName}}</p>
            </div>
          </div>
        </div>
      </div>

      <v-dialog
        v-model="isShowEditDialog"
        max-width="500px">
        <v-card>
          <v-card-title>
              <h4 class="modal-title" id="companyInformationModal2">{{GetLabel(this, "company_company_information_edit_title")}}</h4>
            <v-spacer></v-spacer>
              <v-btn type="button" fab x-small @click="closeModal"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <div>
              <dxFormTextInput id="company_name" ref="companyNameRef" v-model="companyModel.Name" placeholder="company_company_information_name" :clear="true" :isRequired="true" />
            </div>
            <div>
              <dxFormTextInput id="company_description" ref="companyDescriptionRef" v-model="companyModel.Description" placeholder="company_company_information_description" :clear="true" :isRequired="false" />
            </div>
            <div>
              <dxFormTextInput id="company_email" ref="companyEmailRef" v-model="companyModel.Email" placeholder="company_company_information_email" type="email" :clear="true" :isRequired="true" />
            </div>
            <div>
              <dxFormTextInput id="company_address" ref="companyAddressRef" v-model="companyModel.Address" placeholder="company_company_information_address" :clear="true" :isRequired="true" />
            </div>
            <div>
              <dxFormTextInput id="country" ref="companyCountryRef" v-model="companyModel.Country" placeholder="country" :clear="true" :isRequired="true" />
            </div>
            <div>
              <dxFormTextInput id="city" ref="companyCityRef" v-model="companyModel.City" placeholder="city" :clear="true" :isRequired="true" />
            </div>
            <div>
              <dxFormTextInput id="industry" ref="companyIndustryRef" v-model="companyModel.Industry" placeholder="industry" :clear="true" :isRequired="true" />
            </div>
            <div>
              <dxFormTextInput id="contact_name" ref="companyContactRef" v-model="companyModel.ContactName" placeholder="company_company_information_contact_name" :clear="true" :isRequired="true" />
            </div>
            <div>
              <dxFormTextInput id="phone" ref="companyPhoneRef" v-model="companyModel.Phone" placeholder="phone" :clear="true" :isRequired="true" />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn mb-2 btn-secondary" color="white" text @click="closeModal"> Close</v-btn>
            <v-btn class="btn mb-2 btn-primary" color="white" text @click="updateCompanyInformation">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </div>
</template>

<script>
import { GET_COMPANY_INFORMATION, UPDATE_COMPANY_INFORMATION } from '../../../store/actions/company'

export default {
  name: 'CompanyInformation',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      companyInformation: {
        Id: 0,
        Name: '',
        Description: '',
        Address: '',
        City: '',
        Country: '',
        CityCountry: '',
        ContactName: '',
        Phone: '',
        Email: '',
        Industry: ''
      },
      companyModel: {
        Name: '',
        Description: '',
        Address: '',
        City: '',
        Country: '',
        ContactName: '',
        Phone: '',
        Email: '',
        Industry: ''
      },
      alertoptions: {
        okText: this.GetLabel(this, 'ok')
      },
      isSubmitted: false,
      isShowEditDialog: false
    }
  },
  components: {
    dxFormTextInput: () => import('../../customcontrols/dxInput/dxFormTextInput/dxFormTextInput')
  },
  created () {
    this.companyInformation.Id = this.$store.getters.currentUser ? this.$store.getters.currentUser.CompanyId : 0
    this.getCompanyInformation()
  },
  methods: {
    getCompanyInformation: function () {
      this.$store.dispatch(GET_COMPANY_INFORMATION, { Id: this.companyInformation.Id }).then(() => {
        if (this.$store.getters.companyInformation) {
          Object.assign(this.companyInformation, this.$store.getters.companyInformation)
          this.companyInformation.CityCountry = this.$store.getters.companyInformation.City + ', ' + this.$store.getters.companyInformation.Country
        }
      })
        .catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    },
    editCompanyClicked: function (event) {
      console.log(event)
      this.companyModel.Name = this.companyInformation.Name
      this.companyModel.Description = this.companyInformation.Description
      this.companyModel.Email = this.companyInformation.Email
      this.companyModel.Address = this.companyInformation.Address
      this.companyModel.Country = this.companyInformation.Country
      this.companyModel.City = this.companyInformation.City
      this.companyModel.Industry = this.companyInformation.Industry
      this.companyModel.ContactName = this.companyInformation.ContactName
      this.companyModel.Phone = this.companyInformation.Phone
      this.isShowEditDialog = true
    },
    updateCompanyInformation: function (event) {
      if (!this.$refs.companyNameRef.validate() || !this.$refs.companyEmailRef.validate() || !this.$refs.companyAddressRef.validate() || !this.$refs.companyCountryRef.validate() || !this.$refs.companyCityRef.validate() || !this.$refs.companyIndustryRef.validate() || !this.$refs.companyContactRef.validate() || !this.$refs.companyPhoneRef.validate()) {
        this.$dialog.alert(this.GetMessage(this, 'fill_empty_fields'), this.alertoptions)
        return
      }
      var request = {}
      Object.assign(request, this.companyModel)
      request.id = this.companyInformation.Id

      // service call
      this.$store.dispatch(UPDATE_COMPANY_INFORMATION, request).then(() => {
        Object.assign(this.companyInformation, this.companyModel)
        this.companyInformation.CityCountry = this.companyModel.City + ', ' + this.companyModel.Country
      })
        .catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })

      this.isShowEditDialog = false
    },
    closeModal: function () {
      this.isShowEditDialog = false
      this.$emit('close')
    }
  }
}
</script>
