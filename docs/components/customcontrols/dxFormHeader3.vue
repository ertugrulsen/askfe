<template>
  <div>
      <h3>{{ value }}</h3>
  </div>
</template>

<script>
/**
   * This is the one of the header components with the h3 tag.
   */

export default {
  name: 'dxFormHeader3',
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
    <h3>This is a simple h3 component.</h3>
```
</docs>
