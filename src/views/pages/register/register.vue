<template>
  <v-container class="login-contain lighten-5 mb-6 mt-8"  >
    <v-row :align="center" no-gutters >
      <v-col class="register-card col-lg-5 col-md-7 col-10 mx-auto text-center"  >
        <v-card class="p-4" elevation="3" >
          <v-form class="">
            <div id="login__logo" class="d-flex flex-column justify-space-between align-center">
                <v-img lazy-src="../../../assets/images/definex-pic.png" max-height="110" max-width="150" alt="DefineX" src="../../../assets/images/definex-pic.png" ></v-img>
            </div>
            <v-expansion-panels v-model="panel" multiple>
              <v-expansion-panel >
                <v-expansion-panel-header>
                  {{GetLabel(this,"user_info")}}
                  <template v-slot:actions>
                    <v-icon color="primary">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="12" sm="6" >
                      <dxFormTextInput id="name" ref="companyUserNameRef" v-model="Name" placeholder="authentication_register_user_name" :clear="true" :isRequired=true />
                    </v-col>
                    <v-col cols="12" sm="6" >
                      <dxFormTextInput id="surname" ref="companyUserSurnameRef" v-model="Surname" placeholder="authentication_register_user_surname" :clear="true" :isRequired=true />
                    </v-col>
                    <v-col cols="12" sm="12">
                      <dxFormTextInput id="email" ref="emailRef" type="test" v-model="UserName" placeholder="authentication_register_email" :clear="true" :isRequired=true />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{GetLabel(this,"password_information")}}
                  <template v-slot:actions>
                    <v-icon color="primary">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="12" sm="6" >
                      <div class="form-group">
                        <dxFormTextInput id="password" ref="passwordRef" type="password" v-model="Password" placeholder="password" :clear="true" :isRequired=true />
                      </div>
                      <div class="form-group">
                        <dxFormTextInput id="confirm_password" ref="confirmPasswordRef" type="password" v-model="ConfirmPassword" placeholder="confirm_password" :clear="true" :isRequired=true />
                      </div>
                    </v-col>
                    <div class="col-md-6">
                      <div style="margin-left:15px;margin-top:-5px;">
                        <p class="mb-2">{{GetLabel(this, "authentication_password_requirement")}}</p>
                        <ul class="small text-muted pl-4 mb-0">
                          <li>{{GetLabel(this,"authentication_password_requirement_at_least_eight_character")}} </li>
                          <li>{{GetLabel(this, "authentication_password_requirement_at_least_one_special_character")}}</li>
                          <li>{{GetLabel(this, "authentication_password_requirement_at_least_one_number")}}</li>
                        </ul>
                      </div>
                    </div>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-row class="pt-2">
              <v-col cols="12" sm="12" >
                <v-btn
                  x-large
                  color="btn btn-lg primary btn-block"
                  dark
                  @click="register">
                    {{ GetLabel(this, 'authentication_register') }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="pt-2">
              <v-col cols="12" sm="6" >
                <copyright/>
              </v-col>
              <v-col cols="12" sm="6" >
                <p class="h6 ">{{GetLabel(this, "authentication_register_already_have_account")}}
              <router-link :to="{ name: 'Login'}" class="nav-link v-list-item__content"> 
              <span class="item-text">{{ GetLabel(this, 'authentication_login') }}</span> 
              </router-link> 
                </p>
              </v-col>
            </v-row>
          </v-form>
        </v-card >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dxFormTextInput from '../../../components/customcontrols/dxInput/dxFormTextInput/dxFormTextInput'
import copyright from '../../../components/copyright/copyright'
import { REGISTER_REQUEST } from '../../../store/actions/auth'

export default {
  name: 'register',
  data () {
    return {
      Name: '',
      Surname: '',
      UserName: '',
      Password: '',
      ConfirmPassword: '',
      alertoptions: {
        okText: this.GetLabel(this, 'ok')
      },
      panel: [0],
      center:"center"
    }
  },
  watch:{
    panel:function(newVal,oldVal){
      if(newVal.length === 2){
        if(oldVal[0] === 1){
          this.panel = [0]
        }else{
          this.panel = [1]
        }
      }
    }
  },
  components: {
    dxFormTextInput,
    copyright
  },
  methods: {
    register () {
      if ( !this.$refs.companyUserNameRef.validate() || !this.$refs.companyUserSurnameRef.validate() || !this.$refs.emailRef.validate() || !this.$refs.passwordRef.validate() || !this.$refs.confirmPasswordRef.validate()) {
        this.$dialog.alert(this.GetMessage(this, 'fill_empty_fields'), this.alertoptions)
        
        return
      }

      if (this.Password !== this.ConfirmPassword) {
        this.$dialog.alert(this.GetMessage(this, 'passwords_does_not_match'), this.alertoptions)
        
        return
      }

      const request = {
        Name: this.Name,
        Surname: this.Surname,
        UserName: this.UserName,
        Password: this.Password
      }
      this.$store.dispatch(REGISTER_REQUEST, request).then(response => {
        this.$router.push('/')
      })
        .catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    }
  }
}
</script>

<style >
#app{
  background:url('~@/assets/images/balloon.jpg')
    no-repeat center center fixed !important;
    background-size: cover;
}
.register-card > .v-card{
  background-color: #ffffffb5 !important;
}
</style>
