<template>
<div>
  <div>
    <VueCtkDateTimePicker
      id="DatePicker"
      v-model="yourValue"
      format="YYYY-MM-DD"
      formatted="ll"
      locale="tr"
      label="Seçiniz"
      inputSize="sm"
      buttonNowTranslation="Şuan"
      :onlyDate=true
      :overlay=true
      :noHeader=true
      :noLabel=true
      :min-date="minDate"
      :max-date="maxDate"
      :error="!dateIsValid"
      @is-hidden="checkDateIsValid(yourValue)"
    ></VueCtkDateTimePicker>
    </div>
    <div>
    <span
      v-if="!dateIsValid"
      class="form-text text-danger"
    >*Bu alan zorunludur.</span>
    </div>
</div>
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import CustomDateFormatter from '../../../src/library/helpers/customdateformatter'

/**
   * This is the only one datepicker component that is used in all part of application and is also extends from vue-ctk-date-time-picker npm packages.
   */

export default {
  name: 'dxFormDatepickerInput',
  components: {
    VueCtkDateTimePicker
  },
  props: {
    /**
       * The value for the component.
       */
    value: {
      type: String
    },
    /**
       * This prop makes required to one area.
       * @values true, false
       */
    isRequired: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * This prop makes the dates starts with this value in the picker.
       */
    minDate: {
      type: String
    },
    /**
       * This prop makes the dates ends with this value in the picker.
       */
    maxDate: {
      type: String
    },
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
      yourValue: null,
      dateIsValid: true
    }
  },
  watch: {
    yourValue (newValue) {
      if (newValue) {
        /**
      * This event throws the value of component to upper components.
      */
        this.$emit('input', CustomDateFormatter.GetDate(new Date(newValue)))
      } else { this.$emit('input', null) }
    },
    clear: function (input) {
      if (input) { this.yourValue = null }
    }
  },
  methods: {
    checkDateIsValid: function () {
      if (this.isRequired) {
        if (this.yourValue == null) {
          this.dateIsValid = false
          return false
        } else {
          this.dateIsValid = true
          return true
        }
      } else {
        this.dateIsValid = true
        return true
      }
    }
  }
}
</script>

<style scoped>
.date-time-picker {
  width: 197px;
  margin: 0;
  padding-left: 0;
}
</style>
