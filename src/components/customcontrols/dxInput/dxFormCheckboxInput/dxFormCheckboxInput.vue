<template>
  <!-- <input type="checkbox"
  :value="value"
  :checked="checked"
  v-model="data"
  :disabled="disabled"
  @change="change(data)"> -->
     <v-checkbox
              v-model="data"
              color="primary"
              :value="value"
              :checked="checked"
              :disabled="disabled"
              :label="label"
              @change="change(data)"
              hide-details
            ></v-checkbox>
</template>

<script>
export default {
  name: 'dxFormCheckboxInput',
  props: {
    value: {
      type: Number,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    checked: {
      type: Boolean,
      required: false
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    isCheckedshowPhoneBaseStation: {
      type: Boolean,
      default: false
    }
  },
  // model: {
  //   prop: 'checked',
  //   event: 'change'
  // },
  data () {
    return {
      data: this.$props.checked
    }
  },
  watch: {
    checked: function (value) {
      debugger
      this.data = this.$props.checked
    },
    clear: function (input) {
      if (input) { this.data = false }
    }
  },
  methods: {
    change: function (input) {
      this.$emit('input', input)
    }
  }
}
</script>

<style>

</style>
