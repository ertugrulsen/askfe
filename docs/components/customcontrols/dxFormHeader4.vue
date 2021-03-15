<template>
  <div>
      <h4 class="blue empty-left-side seperator-header" >{{ value }}</h4>
  </div>
</template>

<script>
/**
   * This is the one of the header components with the h4 tag.
   */

export default {
  name: 'dxFormHeader4',
  props: {
    /**
       * The value prop of component.
       */
    value: {
      type: String,
      required: false
    }
  }
}
</script>

<docs>
```jsx
    <h4>This is a simple h4 component.</h4>
```
</docs>
