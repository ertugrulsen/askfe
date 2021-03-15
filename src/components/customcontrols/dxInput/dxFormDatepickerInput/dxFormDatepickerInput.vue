<template>

 <v-row>
     <v-col cols="12" sm="8">
      <v-menu
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="yourValue"
            :label="lbvalue"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
            ref="menu"
            type="date"
            v-model="yourValue"
            :min-date="minDate"
            :max-date="maxDate"
            :error="!dateIsValid || !dateIsValidForFQ"
            @change="checkDateIsValid(yourValue)"
            max="9999-12-31"
            no-title
            scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import CustomDateFormatter from '../../../../library/helpers/customdateformatter'
export default {
  name: 'dxFormDatepickerInput',
  props: {
    value: {
      type: String
    },
    lbvalue: {
      type: String
    },
    isRequired: {
      type: Boolean,
      default: false,
      required: false
    },
    minDate: {
      type: String
    },
    maxDate: {
      type: String
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function () {
    return {
      yourValue: null,
      dateIsValid: true,
      dateIsValidForFQ: true
    }
  },
  watch: {
    yourValue (newValue) {
      if (newValue) {
        this.$emit('input', CustomDateFormatter.GetDate(new Date(newValue)))
      } else {
        this.$emit('input', null)
      }
    },
    clear: function (input) {
      if (input) { this.yourValue = null }
    }
  },
  methods: {
    checkDateIsValid: function () {
      if (this.isRequired) {
        if (this.yourValue == null || this.yourValue === '') {
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
    },
    checkDateIsValidForFQ: function (date) {
      if (this.isRequired) {
        if (date) {
          this.dateIsValidForFQ = true
          return true
        } else {
          this.dateIsValidForFQ = false
          return false
        }
      } else {
        this.dateIsValidForFQ = true
        return true
      }
    }
  }
}
</script>

<style scoped>
.form-control {
  width: 197px;
  margin: 0;
  padding-left: 0;
  text-transform: uppercase;

   padding: 0 15px;
}
.sd-container {
  position: relative;
  float: left;
}

.sd {
  padding: 5px 10px;
  height: 30px;
  width: 150px;
}

.open-button {
  position: absolute;
  top: 5px;
  right: 11px;
  width: 25px;
  height: 25px;
  background: #fff;
  pointer-events: none;
}

.open-button button {
  border: none;
  background: transparent;
}
</style>
