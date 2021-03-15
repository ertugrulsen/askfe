<template>
  <div>
    <span v-for="item in items" :key="item.value" >
        <label v-if="position == 'before'">{{ item.text }}</label>
        <input @blur="validate()" type="radio" :value="item.value"  v-model="inputVal" :class="{ 'error': ($v.inputVal.$error ) }" :id="item.value" @click="unCheck(item.value)">
        <label :for="item.value" v-if="position == 'after'"  >{{ item.text }}</label>
    </span>
      <p v-if="!isValid && isValidForMultiple" class="form-text text-danger"> *Bu alan zorunludur.</p>
  </div>

</template>

<script>
import { required } from 'vuelidate/lib/validators'

/**
   * This is the only one radiobutton component that is used in all part of application.
   */

export default {
  name: 'dxFormRadioInput',
  props: {
    /**
       * This is the list of radiobuttons, consists of all options.
       * @values Array
       */
    items: {
      type: Array,
      required: false
    },
    /**
       * This prop sets the position of label and radiobutton.
       * @values before, after
       */
    position: {
      type: String,
      required: false,
      default: 'after'
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
       * This prop makes required to one area.
       * @values true, false
       */
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    isRequiredForMultiple: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      inputVal: false,
      isValid: true,
      isValidForMultiple: true
    }
  },
  watch: {
    inputVal: function (input) {
      /**
      * This event throws the value of component to upper components.
      */
      this.$emit('input', input)
    },
    clear: function (input) {
      if (input) { this.inputVal = false }
    },
    '$v.inputVal.$model': function (input) {
      this.validate()
      this.$emit('input', input)
    }

  },
  validations: {
    inputVal: {
      required
    }
  },
  methods: {
    validate: function (inputVal) {
      this.$v.inputVal.$touch()
      if (this.$props.isRequiredForMultiple) {
        if (!this.$v.inputVal.$model) {
          this.isValidForMultiple = false
          return false
        } else {
          this.isValidForMultiple = true
          return true
        }
      } else {
        if (!this.$v.inputVal.$model) {
          this.isValid = false
          return false
        } else {
          this.isValid = true
          return true
        }
      }
    },
    unCheck: function (val) {
      if (val === this.inputVal) {
        this.inputVal = false
      } else {
        this.inputVal = val
      }
    }
  }
}
</script>

<docs>
```jsx
    <input type="radio" v-model="inputVal"><label >  This is a simple radiobutton component.</label>
```
</docs>
