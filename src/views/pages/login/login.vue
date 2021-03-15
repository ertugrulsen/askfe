<template>
  <v-container class="login-contain lighten-5 mb-6 mt-6">
    <v-row :align="center" no-gutters >
      <v-col class="col-lg-5 col-md-7 col-10 mx-auto text-center">
        <v-card class="p-4" elevation="2" >
          <v-form  ref="form" v-model="valid" lazy-validation>
            <div id="login__logo" class="d-flex flex-column justify-space-between align-center">
              <v-img lazy-src="../../../assets/images/definex-pic.jpg" max-height="110" max-width="150" alt="DefineX" src="../../../assets/images/definex-pic.jpg" ></v-img>
            </div>
            <div class="form-group">
              <dxFormTextInput id="login_username" v-model="UserName" ref="usernameComponentRef" placeholder="username" :clear="true" type="text" :isRequired=true />
            </div>
            <div class="form-group">
              <dxFormTextInput id="login_password" type="password" ref="passwordComponentRef" v-model="Password" placeholder="password" :clear="true" :isRequired=true />
            </div>
            <div class="my-2">
              <v-btn :disabled="!valid" color="btn btn-lg primary btn-block"  @click="recaptcha"> 
                {{ GetLabel(this, 'authentication_login') }}
              </v-btn>
            </div>
            <v-row class="pt-2">
              <v-col cols="12" sm="6" >
                <copyright/>
              </v-col>
              <v-col cols="12" sm="6" >
                <p class="h6 ">{{ GetLabel(this, 'authentication_login_dont_have_account') }}
                  <a href="/register">
                    <span class="item-text">{{ GetLabel(this, 'authentication_register') }}</span>
                  </a>
                </p>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dxFormTextInput from '../../../components/customcontrols/dxInput/dxFormTextInput/dxFormTextInput'
import copyright from '../../../components/copyright/copyright'
import { AUTH_REQUEST } from '../../../store/actions/auth'

export default {
  name: 'login',
  data () {
    return {
      valid: true,
      UserName: '',
      Password: '',
      alertoptions: {
        okText: this.GetLabel(this, 'ok')
      },
      center:"center"
    }
  },
  components: {
    dxFormTextInput,
    copyright
  },
  methods: {
    async recaptcha() {
       // (optional) Wait until recaptcha has been loaded.
      await this.$recaptchaLoaded()

      if (!this.$refs.form.validate()) {
        return
      }

      let request = {
        UserName: this.$refs.usernameComponentRef.inputVal,
        Password: this.$refs.passwordComponentRef.inputVal
      };

      //execute captcha
      this.$recaptcha("login").then((token) => {
        request["RecaptchaToken"] = token;

        this.$store.dispatch(AUTH_REQUEST, request).then(response => {
          if(this.$route.query.returnUrl){
            this.$router.push({path:this.$route.query.returnUrl,query:{id:this.$route.query.id}})
          }else{
            this.$router.push('/')
          }       
        }).catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
      });
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

</style>
