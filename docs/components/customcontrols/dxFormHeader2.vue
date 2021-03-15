<template>
  <div>
      <h2>{{ value }}</h2>
  </div>
</template>

<script>

/**
   * This is the one of the header components with the h2 tag.
   */

export default {
  name: 'dxFormHeader2',
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
    <h2>This is a simple h2 component.</h2>
```
</docs>
