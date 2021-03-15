<template>
 <v-select
          style="height:55px; width:100px"
          v-if="!multiple"
          :key="items.value"
          @blur="validate()"
          v-model="selectedItem"
          :items="items"
          :value="items.text"
          :label="items.text"
></v-select>

<v-select
          v-else multiple
          :key="items.value"
          @blur="validate()"
          v-model="selectedItem"
          :items="items"
          :value="items.text"
          :label="items.text"
  ></v-select>
    <!-- <select class="custom-select" v-if="!multiple" @blur="validate()" v-model="selectedItem">
      <option v-if="showDefaultSelection" disabled>Seçiniz</option>
      <option v-for="(data) in items" :key="data.value" :value="data.value" >{{ data.text }}</option>
    </select>
    <select v-else multiple @blur="validate()" v-model="selectedItem" >
      <option v-if="showDefaultSelection" disabled>Seçiniz</option>
      <option v-for="(data) in items" :key="data.value" :value="data.value" >{{ data.text }}</option>
    </select> -->
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'dxFormCombobox',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      required: false
    },
    showDefaultSelection: {
      type: Boolean,
      required: false,
      default: false
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    enableClear: {
      type: Boolean,
      default: true
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedValue: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      selectedItem: -1,
      isValid: true
    }
  },
  created () {
    this.selectedItem = this.items.find(o => o.value === this.selectedValue)
  },
  watch: {
    selectedItem: function (input) {
      this.$emit('input', input)
    },
    clear: function (input) {
      if (this.$props.enableClear) {
        if (input) { this.selectedItem = -1 }
      }
    }
  },
  validations: {
    selectedItem: {
      required
    }
  },
  methods: {
    validate: function () {
      if (this.isRequired) {
        if (this.selectedItem === -1) {
          this.isValid = false
          return false
        } else {
          this.isValid = true
          return true
        }
      }
    }
  }
}
</script>

<style>
</style>
