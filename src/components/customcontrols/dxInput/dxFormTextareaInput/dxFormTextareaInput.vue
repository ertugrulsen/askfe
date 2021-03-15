<template>
       <textarea v-model="inputVal" :readonly="readonly"></textarea>
</template>

<script>
export default {
  name: 'dxFormTextareaInput',
  props: {
    readonly: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: String,
      require: false
    },
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
      this.$emit('input', input)
    },
    clear: function (input) {
      if (input) { this.inputVal = '' }
    }

  }
}
</script>
