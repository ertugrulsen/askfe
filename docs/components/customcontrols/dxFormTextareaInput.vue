<template>
       <textarea v-model="inputVal" :readonly="readonly"></textarea>
</template>

<script>
/**
   * This is the only one textarea component that is used in all part of application.
   */

export default {
  name: 'dxFormTextareaInput',
  props: {
    /**
       * This property works to make readonly or not.
       * @values true, false
       */
    readonly: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
       * The value prop of the component.
       */
    value: {
      type: String,
      require: false
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

  }
}
</script>

<docs>
```jsx
    <textarea v-model="inputVal"> This is a simple textarea component.</textarea>
```
</docs>
