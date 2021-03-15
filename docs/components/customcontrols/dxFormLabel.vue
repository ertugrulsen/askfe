<template>
  <label >{{value}}</label>
</template>

<script>
/**
   * This is the only one label component that is used in all part of application.
   */

export default {
  name: 'dxFormLabel',
  props: {
    /**
       * The value prop of component.
       */
    value: String
  }
}
</script>

<docs>
```jsx
    <label >This is a simple label component.</label>
```
</docs>
