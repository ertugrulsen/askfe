<template>
  <input type="file" id="fileId" name="Toplu Gözat" v-on:change="ExcelUpload" ref="file" />
    <!-- <v-file-input
     ref="file"
     id="fileId"
    v-on:change="ExcelUpload"
    placeholder="Upload your documents"
    label="File input"
    multiple
    prepend-icon="mdi-paperclip"
  >
    <template v-slot:selection="{ text }">
      <v-chip
        small
        label
        color="primary"
      >
        {{ text }}
      </v-chip>
    </template>
  </v-file-input> -->
</template>

<script>
import FileUpload from '../../../../library/helpers/fileupload'
import EventBus from '../../../../library/helpers/eventbus'

export default {
  name: 'dxFormFileInput',
  props: {
    clear: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      bulkFileJsonData: '',
      bulkQuery: false
    }
  },
  methods: {
    ExcelUpload: function (e) {
      FileUpload.handleFileUpload(e.target.files)
        .then(response => {
          this.bulkFileJsonData = response
          this.bulkQuery = true
          EventBus.EmitMethodWithValue('excelUploaded', JSON.stringify(this.bulkFileJsonData))
        })
    }
  },
  watch: {
    clear: function (input) {
      if (input) { this.bulkQuery = false; this.bulkFileJsonData = ''; document.getElementById('#fileId').value = '' }
    }

  }
}
</script>
