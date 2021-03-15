 <template>
 <v-row >
    <v-col cols="12" md="6">
      <h2 class="page-title">{{ GetLabel(this, 'management') }}</h2>
    </v-col>
       <v-col cols="12" md="12" class="mt-12" >
            <v-btn class="btn dark small top" color="white" text @click="clickManagementNewRole"><v-icon>fal fa-plus-circle</v-icon>{{GetLabel(this, "management_users_new_role")}}</v-btn>
            <v-btn class="btn dark small top second" color="white" text @click="clickManagementNewUser"><v-icon>fal fa-plus-circle</v-icon>{{GetLabel(this, "management_users_new_user")}}</v-btn>
       </v-col>
       <v-col cols="12" md="12" >
      <div class="scene-header">
        <button
          type="button"
          :class="{'active': activeTab == 1}"
          @click="clickManagementUserTable()"
          ref="ttManagementUserAdd"
        >{{GetLabel(this, "users")}}</button>
        <button
          type="button"
          :class="{'active': activeTab == 2}"
          @click="clickManagementRoleTable()"
        >{{GetLabel(this, "roles")}}</button>
      </div>
      <div class="scene active" id="management__user" v-if="showManagementUserTable" >
        <div class="part white-bg equal">
            <div class="card shadow">
                <div class="card-body">
                  <h4 class="card-title">{{GetLabel(this, "company_company_users")}}</h4>
                      <v-data-table
                  :headers="headersforUser"
                  :items="userData"
                  :search="search"
                  sort-by="name"
                    hide-default-footer
                    @page-count="pageCount = $event"
                    :page.sync="page"
                     :items-per-page="itemsPerPage"
                  class="elevation-1"
                >
                <template v-slot:top>
                   <v-col cols="12" md="6" >
                   <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                              ></v-text-field>
                   </v-col>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                          <v-card-title class="headline"> {{GetMessage(this, "approve_delete")}}</v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">{{GetLabel(this, "cancel")}}</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteUser" :from="'user'">{{GetLabel(this, "ok")}}</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                  </template>
                    <template v-slot:item.Roles="{ item }">
                      <td v-for="index in item.Roles" :key="index">
                      {{index.RoleName}}
                      </td>
                    </template>
                  <template v-slot:item.Statu="{ item }">
                  <v-simple-checkbox
                    v-model="item.Statu"
                    disabled
                  ></v-simple-checkbox>
                </template>
                  <template v-slot:item.actions="row">
                    <v-icon
                      small
                      class="mr-2"
                      @click="clickManagementUserEdit(row)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      @click="deleteItem(row)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                  <template v-slot:no-data>
                    <span>No data found</span>
                  </template>
                </v-data-table>
                <div class="text-center pt-2">
                    <v-pagination
                      v-model="page"
                      :length="pageCount"
                    ></v-pagination>
                  </div>
                </div>
            </div> 
        </div>
      </div>

      <div class="scene active" id="management__group" v-if="showManagementRoleTable" >
        <div class="part white-bg equal">
                   <div class="card shadow">
                        <div class="card-body">
                          <h4 class="card-title">{{GetLabel(this, "roles")}}</h4>
                                    <v-data-table
                          :headers="headersforRole"
                          :items="roleData"
                          :search="search"
                          sort-by="name"
                          hide-default-footer
                          @page-count="pageCount = $event"
                          :page.sync="page"
                          :items-per-page="itemsPerPage"
                          class="elevation-1"
                         >
                          <template v-slot:top>
                             <v-col cols="12" md="6" >
                              <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                              ></v-text-field>
                             </v-col>
                              <v-spacer></v-spacer>
                              <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                  <v-card-title class="headline">{{GetMessage(this, "approve_delete")}}</v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">{{GetLabel(this, "cancel")}}</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteRole">{{GetLabel(this, "ok")}}</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                          </template>
                           <template v-slot:item.Users="{ item }">
                            <td v-for="index in item.Users" :key="index">
                            {{index.UserNameSurname}}
                            </td>
                    </template>
                          <template v-slot:item.actions="row">
                            <v-icon
                              small
                              class="mr-2"
                              @click="clickManagementRoleEdit(row)"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              small
                              @click="deleteItem(row)"
                            >
                              mdi-delete
                            </v-icon>
                          </template>
                          <template v-slot:no-data>
                            <span>No data found</span>
                          </template>
                        </v-data-table>
                         <div class="text-center pt-2">
                            <v-pagination
                              v-model="page"
                              :length="pageCount"
                            ></v-pagination>
    </div>
                        </div>
                   </div>
        </div>
      </div>
      <ttManagementUserEdit :user="selectedUser" :visible="showManagementUserEdit" @return-users="clickManagementUserTable" />
      <ttManagementUserAdd  v-if="showManagementNewUser" :visible="showManagementNewUser" @return-users="clickManagementUserTable"/>
      <ttManagementRoleEdit :role="selectedRole" :visible="showManagementRoleEdit" @return-roles="clickManagementRoleTable"/>
      <ttManagementRoleAdd  v-if="showManagementNewRole" :visible="showManagementNewRole" @return-roles="clickManagementRoleTable"/>
       </v-col>
    </v-row>
</template>

<script>
import ttManagementUserEdit from '../../../components/partialpages/management/ttManagementUserEdit/ttManagementUserEdit'
import ttManagementRoleEdit from '../../../components/partialpages/management/ttManagementRoleEdit/ttManagementRoleEdit'
import { LOAD_USER, LOAD_ROLES, DELETE_USER, DELETE_ROLES } from '../../../store/actions/management'
import EventBus from '../../../library/helpers/eventbus'
export default {
  name: 'management',
  data () {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dialog: false,
      dialogDelete: false,
      selectedItem: -1,
      editedIndex: -1,
      search: '',
      isAddUserModalVisible: false,
      showManagementRoleTable: false,
      showManagementUserTable: true,
      showManagementNewUser: false,
      showManagementNewRole: false,
      showManagementUserEdit: false,
      showManagementUsers: false,
      showManagementRoleEdit: false,
      showDeleteBox: false,
      activeTab: 1,
      showInfo: false,
      hasUser: null,
      selectedRole: {},
      selectedUser: {},
      alertoptions: {
        okText: 'Tamam'
      },
      confirmoptions: {
        okText: 'Evet',
        cancelText: 'Hayır',
        animation: 'bounce'
      },
      userData: [
        {
          ID: 1,
          NameSurname: 'Erdinç DEĞİRMENCİ',
          Username: 'ED',
          UserType: 'Admin',
          Roles: [
            {
              value: 1,
              RoleName: 'Role1'
            },
            {
              value: 2,
              RoleName: 'Role2'
            }
          ],
          Statu: false
        },
        {
          ID: 2,
          NameSurname: 'Emre SOLUGAN',
          Username: 'ES',
          UserType: 'Admin',
          Roles: [
            {
              value: 2,
              RoleName: 'Role2'
            }
          ],
          Statu: true
        },
        {
          ID: 3,
          NameSurname: 'Nurullah TURKYILMAZ',
          Username: 'NT',
          UserType: 'Admin',
          Roles: [
            {
              value: 3,
              RoleName: 'Role3'
            }
          ],
          Statu: true
        },
        {
          ID: 4,
          NameSurname: 'Mehmet KARLI',
          Username: 'MK',
          UserType: 'Admin',
          Roles: [
            {
              value: 4,
              RoleName: 'Role4'
            }
          ],
          Statu: false
        },
        {
          ID: 5,
          NameSurname: 'Definex Definex',
          Username: 'DD',
          UserType: 'Admin',
          Roles: [
            {
              value: 5,
              RoleName: 'Role5'
            }
          ],
          Statu: true
        },
        {
          ID: 6,
          NameSurname: 'Definex Definex',
          Username: 'DD',
          UserType: 'Admin',
          Roles: [
            {
              value: 6,
              RoleName: 'Role6'
            }
          ],
          Statu: true
        }
      ],
      roleData: [
        {
          ID: 1,
          RoleName: 'Role1',
          Description: 'Role Description',
          Users: [
            {
              value: 1,
              UserNameSurname: 'Erdinç DEĞİRMENCİ'
            }
          ]
        },
        {
          ID: 2,
          RoleName: 'Role2',
          Description: 'Role Description',
          Users: [
            {
              value: 2,
              UserNameSurname: 'Emre SOLUGAN'
            }
          ]
        },
        {
          ID: 3,
          RoleName: 'Role3',
          Description: 'Role Description',
          Users: [
            {
              value: 3,
              UserNameSurname: 'Nurullah TURKYILMAZ'
            }
          ]
        },
        {
          ID: 4,
          RoleName: 'Role4',
          Description: 'Role Description',
          Users: [
            {
              value: 4,
              UserNameSurname: 'Mehmet KARLI'
            }
          ]
        },
        {
          ID: 5,
          RoleName: 'Role5',
          Description: 'Role Description',
          Users: [
            {
              value: 5,
              UserNameSurname: 'Mehmet KARLI'
            }
          ]
        },
        {
          ID: 6,
          RoleName: 'Role6',
          Description: 'Role Description',
          Users: [
            {
              value: 6,
              UserNameSurname: 'Mehmet KARLI'
            }
          ]
        }
      ]
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  components: {
    ttManagementUserEdit,
    ttManagementRoleEdit,
    ttManagementUserAdd: () => import('../../../components/partialpages/management/ttManagementUserAdd/ttManagementUserAdd'),
    ttManagementRoleAdd: () => import('../../../components/partialpages/management/ttManagementRoleAdd/ttManagementRoleAdd')
  },
  created () {
    this.GetUsers()
    this.GetRoles()
  },
  mounted () {
    EventBus.GetEventBus().$on('refresh-user-table', () => {
      this.GetUsers()
    })
    EventBus.GetEventBus().$on('refresh-role-table', () => {
      this.GetRoles()
    })
  },
  computed: {
    headersforUser () {
      return [
        { text: 'ID', align: 'start', value: 'ID' },
        { text: this.GetLabel(this, 'Name_Surname'), value: 'NameSurname' },
        { text: this.GetLabel(this, 'UserName'), value: 'Username' },
        { text: this.GetLabel(this, 'UserType'), value: 'UserType' },
        { text: this.GetLabel(this, 'roles'), value: 'Roles' },
        { text: this.GetLabel(this, 'Statu'), value: 'Statu' },
        { text: this.GetLabel(this, 'Actions'), value: 'actions', sortable: false }
      ]
    },
    headersforRole () {
      return [
        { text: 'ID', align: 'start', value: 'ID' },
        { text: this.GetLabel(this, 'management_role_name'), value: 'RoleName' },
        { text: this.GetLabel(this, 'management_role_description'), value: 'Description' },
        { text: this.GetLabel(this, 'users'), value: 'Users' },
        { text: this.GetLabel(this, 'Actions'), value: 'actions', sortable: false }
      ]
    }

  },
  methods: {
    clickshowInfo: function () {
      this.showInfo = !this.showInfo
    },
    clickhidePopUp: function () {
      this.showInfo = false
    },
    deleteItem (row) {
      this.selectedItem = row.item
      this.dialogDelete = true
    },

    deleteUser () {
      var index = this.userData.indexOf(this.selectedItem)
      this.userData.splice(index, 1)
      this.closeDelete()
    },
    deleteRole () {
      var index = this.roleData.indexOf(this.selectedItem)
      this.roleData.splice(index, 1)
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
    },
    parentDeleteMethod: function (id, from) {
      var index
      if (from === 'user') {
        const deleteUserAreaModel = {
          Id: id
        }
        index = this.userData.findIndex(x => x.value === id)
        this.$dialog.confirm(this.userData[index].name + ' ' + this.userData[index].surname + ' ' + this.GetMessage(this, 'approve_delete'), this.confirmoptions).then(dialog => {
          this.$store.dispatch(DELETE_USER, deleteUserAreaModel).then((response) => {
            this.$dialog.alert(this.GetMessage(this, 'operation_success'), this.alertoptions).then(dialog => {
              this.userData = this.userData.filter(x => x.value !== id)
            })
          }).catch(() => this.$dialog.alert(this.GetMessage(this, 'operation_failed'), this.alertoptions))
        })
      } else if (from === 'role') {
        const deleteRoleAreaModel = {
          Id: id
        }
        index = this.roleData.findIndex(x => x.value === id)
        this.$dialog.confirm(this.roleData[index].name + ' ' + this.GetMessage(this, 'approve_delete'), this.confirmoptions).then(dialog => {
          if (this.roleData[index].users.length > 0) {
            this.$dialog.alert(this.GetMessage(this, 'role_cannot_be_deleted'), this.alertoptions)
          } else {
            this.$store.dispatch(DELETE_ROLES, deleteRoleAreaModel).then((response) => {
              this.$dialog.alert(this.GetMessage(this, 'operation_success'), this.alertoptions).then(dialog => {
                this.roleData = this.roleData.filter(x => x.value !== id)
              })
            }).catch(() => this.$dialog.alert(this.GetMessage(this, 'operation_failed'), this.alertoptions))
          }
        })
      }
    },
    clickManagementUserTable: function () {
      this.showManagementUserTable = true
      this.showManagementRoleTable = false
      this.activeTab = 1
      this.showManagementNewUser = false
      this.showManagementNewRole = false
      this.showManagementUserEdit = false
      this.showManagementRoleEdit = false
    },
    clickManagementUsers: function () {
      this.showManagementUserTable = true
      this.showManagementNewUser = false
      this.showManagementNewRole = false
      this.showManagementUserEdit = false
    },
    clickManagementRoleTable: function () {
      this.showManagementUserTable = false
      this.showManagementRoleEdit = false
      this.showManagementRoleTable = true
      this.activeTab = 2
      this.showManagementNewUser = false
      this.showManagementNewRole = false
      this.showManagementUserEdit = false
    },
    clickManagementNewUser: function () {
      this.showManagementNewUser = true
      this.showManagementNewRole = false
      this.showManagementUserTable = false
      this.showManagementRoleTable = false
      this.activeTab = 1
      this.showManagementUserEdit = false
      this.showManagementRoleEdit = false
    },
    clickManagementNewRole: function () {
      this.showManagementNewRole = true
      this.showManagementNewUser = false
      this.showManagementUserTable = false
      this.showManagementRoleTable = false
      this.activeTab = 2
      this.showManagementUserEdit = false
      this.showManagementRoleEdit = false
    },
    clickManagementUserEdit: function (row) {
      this.editedIndex = this.userData.indexOf(row.item)
      this.selectedUser = Object.assign({}, row.item)
      // this.selectedUser = this.userData[this.userData.findIndex(x => x.value === id)]
      this.showManagementUserEdit = true
      this.showManagementUserTable = false
      this.showManagementNewRole = false
      this.showManagementNewUser = false
      this.showManagementRoleEdit = false
    },
    clickManagementRoleEdit: function (row) {
      this.editedIndex = this.roleData.indexOf(row.item)
      this.selectedRole = Object.assign({}, row.item)
      // this.selectedRole = this.roleData[this.roleData.findIndex(x => x.value === id)]
      this.showManagementRoleEdit = true
      this.showManagementRoleTable = false
      this.showManagementNewRole = false
      this.showManagementNewUser = false
      this.showManagementUserEdit = false
    },
    clickDeleteBox: function () {
      this.showDeleteBox = true
    },
    GetUsers: function () {
      this.$store.dispatch(LOAD_USER).then(() => {
        this.userData = []
        this.$store.getters.userData.forEach(element => {
          this.userData.push(element)
        })
      })
    },
    GetRoles: function () {
      this.$store.dispatch(LOAD_ROLES).then(() => {
        this.roleData = []
        this.$store.getters.roleData.forEach(element => {
          this.roleData.push(element)
        })
      })
    }
  }
}
</script>
