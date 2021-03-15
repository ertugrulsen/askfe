<template>
    <div>
      <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary" fab x-small dark class="mb-2" @click="newItem"><v-icon>mdi-plus</v-icon>

          </v-btn>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="row">
         <v-icon
          small
          class="mr-2"
          @click="editItem(row)"
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
    </div>
</template>

<script>

export default {
  name: 'dxTableComponent',
  data: function () {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      selectedItem: -1,
      editedItem: {},
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
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

  props: {
    headers: {
      type: Array,
      default: () => [],
      note: 'JSON formatted data that will be listed in the Table'
    },
    items: {
      type: Array,
      default: () => [],
      note: 'JSON formatted data that will be listed in the Table'
    },
    showFields: {
      type: Array,
      default: () => [],
      note: 'String array that will be filtered in the Table'
    },
    showToolbar: {
      type: Boolean,
      required: false,
      default: false
    },
    isAddButtonVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    showFooter: {
      type: Boolean,
      required: false,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      required: false,
      default: false
    },
    showRowAction: {
      type: Boolean,
      required: false,
      default: false
    },
    renderAddDialog: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    newItem () {
      this.$emit('new-item')
    },
    editItem (row) {
      this.$emit('edit-item', row.item)
    },

    deleteItem (row) {
      this.selectedItem = row.item
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      var index = this.items.indexOf(this.selectedItem);
      this.$emit('delete-item', this.selectedItem, index)
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
    }
  }

}
</script>
