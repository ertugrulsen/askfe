<template>
  <div>
      <input type="text" @blur="validate()" v-model="inputVal" :placeholder="placeholder" :class="{ 'error': ($v.inputVal.$error && isRequired)}"/>
      <span v-if="!$v.inputVal.required && isRequired && $v.inputVal.$error" class="form-text text-danger"> *Bu alan zorunludur.</span>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

/**
   * This is the only one text component that is used in all part of application.
   */
export default {
  mixins: [validationMixin],
  name: 'dxFormTextInput',
  props: {
    /**
       * The value prop of the component.
       */
    value: String,
    /**
       * The placeholder prop of the component.
       */
    placeholder: {
      type: String,
      required: false
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
  data () {
    return {
      inputVal: ''
    }
  },
  validations: {
    inputVal: {
      required
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
      if (input) { this.inputVal = '' }
    }

  },
  methods: {
    validate: function (inputVal) {
      this.$v.inputVal.$touch()
      if (this.$v.inputVal.$invalid) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<docs>
```jsx
    <input type="text" v-model="inputVal"/>
```
</docs>
