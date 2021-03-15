<template>
    <select v-if="!multiple" @blur="validate()" v-model="selectedItem" >
      <option v-if="showDefaultSelection" disabled>Seçiniz</option>
      <option v-for="(data) in dataList" :key="data.value" :value="data.value" >{{ data.text }}</option>
    </select>
    <select v-else multiple @blur="validate()" v-model="selectedItem" >
      <option v-if="showDefaultSelection" disabled>Seçiniz</option>
      <option v-for="(data) in dataList" :key="data.value" :value="data.value" >{{ data.text }}</option>
    </select>
</template>

<script>

import { required } from 'vuelidate/lib/validators'

/**
   * This is the only one combobox component that is used in all part of application.
   */
export default {
  name: 'dxFormCombobox',
  props: {
    /**
       * Makes multiple choice or single choice the component.
       * @values true, false
       */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
       * This prop is the itemlist of the component that is assigned to the vmodel.
       * @values Array
       */
    dataList: {
      type: Array,
      required: false
    },
    /**
       * This prop shows the 'seçiniz' keyword if it is true.
       * @values true, false
       */
    showDefaultSelection: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
       * Clear property is a general property that if a page is wanted to be cleared, then whole components of the page triggers with this prop.
       * @values true, false
       */
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
       * This prop is works to enable clear prop. Sometimes it is useful when you use two same component in one page.
       * @values true, false
       */
    enableClear: {
      type: Boolean,
      default: true
    },
    /**
       * This prop makes required to one area.
       * @values true, false
       */
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      selectedItem: -1,
      isValid: true
    }
  },
  watch: {
    selectedItem: function (input) {
      /**
      * This event throws the value of component to upper components.
      */
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

<docs>
```jsx
    <select v-model="selectedItem" >
      <option disabled>Seçiniz</option>
      <option>Option A</option>
      <option>Option B</option>
      <option>Option C</option>
    </select>
```
</docs>
