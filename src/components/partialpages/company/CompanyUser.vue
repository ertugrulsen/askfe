<template>
  <div class="card shadow">
    <div class="card-body">
      <h4 class="card-title">{{GetLabel(this, "company_company_users")}}</h4>

      <TableComponent :items="userList" :headers="headers" :showToolbar="true" :showFooter="false" :showCheckbox="false" :showRowAction="true" :showFields="showFields" @new-item="addUserClicked"  @edit-item="editUserClicked" @delete-item="deleteUserClicked">
        </TableComponent>
        <div v-if="isAddUserModalVisible">
            <v-dialog v-model="isAddUserModalVisible" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{formTitle}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                  <v-col cols="12" sm="12">
                    <dxFormTextInput id="company_user_email" ref="userUsernameRef" v-model="selectedItem.UserName" placeholder="company_user_email" :showLabel="true" labelText="company_user_email" :clear="true" type="email" :isRequired=true />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <dxFormTextInput id="company_user_password" ref="userPasswordRef" v-model="selectedItem.Password" placeholder="company_user_password" :showLabel="true" labelText="company_user_password" type="password" :clear="true" :isRequired=true />
                   </v-col>
                  <v-col cols="12" sm="12">
                    <dxFormTextInput id="company_user_name" ref="userNameRef" v-model="selectedItem.Name" placeholder="company_user_name" :showLabel="true" labelText="company_user_name" :clear="true" :isRequired=true />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <dxFormTextInput id="company_user_surname" ref="userSurnameRef" v-model="selectedItem.Surname" placeholder="company_user_surname" :showLabel="true" labelText="company_user_surname" :clear="true" :isRequired=true />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <dxFormCheckboxInput name="Aktif" :label="GetLabel(this, 'active')" :value="selectedItem.IsActive" :checked="true"/>
                  </v-col>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeAddUserModal"
                >
                  Cancel
                </v-btn>
                 <v-btn :disabled="!valid" class="btn mt-4 btn-primary" color="btn-block" text @click="saveOrUpdateUser">{{GetLabel(this, "save")}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </div>
    </div>
  </div>
</template>

<script>
import { LIST_COMPANY_USERS, SAVE_USER, UPDATE_USER, DELETE_USER } from '../../../store/actions/user'
import dxFormTextInput from '../../../components/customcontrols/dxInput/dxFormTextInput/dxFormTextInput'
import dxFormCheckboxInput from '../../../components/customcontrols/dxInput/dxFormCheckboxInput/dxFormCheckboxInput'

export default {
  name: 'CompanyUser',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      headers: [
        { text: 'Name', align: 'start', value: 'Name' },
        { text: 'Surname', value: 'Surname' },
        { text: 'User Name', value: 'UserName' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      valid: true,
      companyId: 0,
      userList: [],
      showFields: ['Name', 'Surname', 'UserName'],
      isAddUserModalVisible: false,
      alertoptions: {
        okText: 'Tamam'
      },
      editedIndex: -1,
      selectedItem: {
        Id: 0,
        UserName: '',
        Password: '',
        Name: '',
        Surname: '',
        IsActive: true
      },
      defaultItem: {
        Id: 0,
        UserName: '',
        Password: '',
        Name: '',
        Surname: '',
        IsActive: true
      },
      isSubmitted: false
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  components: {
    TableComponent: () => import('../../customcontrols/dxTableComponent/dxTableComponent'),
    dxFormTextInput,
    dxFormCheckboxInput
  },
  created () {
    this.companyId = this.$store.getters.currentUser ? this.$store.getters.currentUser.CompanyId : 0
    this.listUsers()
  },
  methods: {
    listUsers: function () {
      var ctx = this
      const request = {
        companyId: this.companyId
      }
      this.$store.dispatch(LIST_COMPANY_USERS, request).then(() => {
        if (ctx.$store.getters.companyUsers) {
          ctx.userList = ctx.$store.getters.companyUsers
        }
      })
        .catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    },
    saveOrUpdateUser: function () {
      if (!this.$refs.form.validate()) {
        return
      } if (this.editedIndex > -1) {
        return this.updateUser()
      } else {
        return this.saveUser()
      }
    },
    addUserClicked: function () {
      this.selectedItem = Object.assign({}, null)
      this.editedIndex = -1
      this.isAddUserModalVisible = true
    },
    editUserClicked: function (item) {
      this.editedIndex = this.userList.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.isAddUserModalVisible = true
    },
    saveUser: function () {
      var request = {}
      Object.assign(request, this.selectedItem)
      request.CompanyId = this.companyId

      this.$store.dispatch(SAVE_USER, request).then(response => {
      })
        .catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })

      this.isAddUserModalVisible = false
    },
    updateUser: function () {
      var request = {}
      Object.assign(request, this.selectedItem)
      request.CompanyId = this.companyId

      this.$store.dispatch(UPDATE_USER, request).then(response => {
      })
        .catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })

      this.isAddUserModalVisible = false
    },

    deleteUserClicked: function (item, index) {
      var request = { Id: item.Id }
      this.$store.dispatch(DELETE_USER, request).then(() => {
      })
        .catch(errorCode => { this.$dialog.alert(this.GetErrorMessage(this, errorCode), this.alertoptions) })
    },
    closeAddUserModal: function () {
      this.isAddUserModalVisible = false
      this.editedIndex = -1
    }
  }
}
</script>
