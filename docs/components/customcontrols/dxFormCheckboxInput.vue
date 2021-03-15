<template>
  <input type="checkbox"
  :value="value"
  :checked="checked"
  v-model="data"
  :disabled="disabled"
  @change="change(data)">
</template>

<script>
/**
   * This is the only one checkbox component that is used in all part of application.
   */

export default {
  name: 'dxFormCheckboxInput',
  props: {
    /**
       * The value for the component.
       * @values true, false
       */
    value: {
      type: Number,
      required: false
    },
    /**
       * As same as the value props, checked property for checkbox.
       * @values true, false
       */
    checked: {
      type: Boolean,
      required: false
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
       * Disable property makes enable or disble the component.
       * @values true, false
       */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  data () {
    return {
      data: this.checked
    }
  },
  watch: {
    checked: function (value) {
      this.data = this.checked
    },
    clear: function (input) {
      if (input) { this.data = false }
    }
  },
  methods: {
    change: function (input) {
      /**
      * This event throws the value of component to upper components.
      */
      this.$emit('input', input)
    }
  }
}
</script>

<docs>
```jsx
      <input type="checkbox" v-model="data"><label> This is a simple checkbox component.</label>
```
</docs>
