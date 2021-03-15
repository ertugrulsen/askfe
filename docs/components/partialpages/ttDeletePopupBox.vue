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
/**
   * This is the only one delete popup component that is used in all part of application.
   */

export default {
  name: 'ttDeletePopupBox',
  props: {
    /**
       * Takes the deleted item's value.
       */
    deletedItem: {
      type: Object,
      required: false
    },
    /**
       * For general delete method, this prop is used to understand where emit called.
       */
    from: {
      type: String,
      required: true
    }
  },
  methods: {
    DeleteFunction: function (id) {
      /**
      * This event throws the delete event for this component and sends from property.
      */
      this.$emit('deleteParentMethod', id, this.$props.from)
    }
  }
}
</script>

<style>

</style>
