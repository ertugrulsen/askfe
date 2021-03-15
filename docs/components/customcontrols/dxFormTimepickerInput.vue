<template>
     <VueCtkDateTimePicker id="TimePicker"
     v-model="yourValue"
     format="hh:mm a"
     formatted="hh:mm a"
     label="Seçiniz"
     inputSize="sm"
     :onlyTime=true
     :overlay=true
     :noLabel=true
     ></VueCtkDateTimePicker>
 </template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'

/**
   * This is the only one timepicker component that is used in all part of application.
   */

export default {
  name: 'dxFormTimepickerInput',
  components: {
    VueCtkDateTimePicker
  },
  props: {
    /**
       * The value prop of the component.
       */
    value: String,
    /**
       * Clear property is a general property that if a page is wanted to be cleared, then whole components of the page triggers with this prop.
       * @values true, false
       */
    clear: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function () {
    return {
      yourValue: null
    }
  },
  watch: {
    yourValue (newValue) {
      /**
      * This event throws the value of component to upper components.
      */
      this.$emit('input', newValue)
    },
    clear: function (input) {
      if (input) { this.yourValue = '' }
    }
  }
}
</script>

<style scoped>
.date-time-picker {
  width: 100px;
  margin: 0 0 0 5px;
  padding-left: 0;
}
</style>
