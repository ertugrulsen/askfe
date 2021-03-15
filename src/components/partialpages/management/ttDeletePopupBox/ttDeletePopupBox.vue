<template>
  <div>
        <div class="delete-box popup-box active" >
                    <button type="button" class="icon-btn" v-on:click="DeleteFunction(deletedItem.value)"  >
                      <i class="fal fa-trash-alt"></i>
                    </button>
        </div>
  </div>
</template>

<script>
export default {
  name: 'ttDeletePopupBox',
  props: {
    deletedItem: {
      type: Object,
      required: false
    },
    from: {
      type: String,
      required: true
    }
  },
  methods: {
    DeleteFunction: function (id) {
      this.$emit('deleteParentMethod', id, this.$props.from)
    }
  }
}
</script>

<style>

</style>
