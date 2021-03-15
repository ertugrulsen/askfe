<template>
    <div>
        <table aria-describedby="responseTable" v-if="data.length > 0">
            <thead>
                <th id="th" :key="value" v-for="(value, key) in data[0]">{{key}}</th>
            </thead>
            <tbody>
                <tr :key="value" v-for="(value, key) in data">
                    <td :key="_value" v-for="(_value) in data[key]">{{ _value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/**
   * This is the only one table component that is used in all part of application.
   */
export default {
  name: 'dxTableComponent',
  data: function () {
    return {
    }
  },
  props: ['data']

}
</script>

<docs>
```jsx
    <table style="width: 100%;text-align: left;border-collapse:collapse;">
            <thead>
                <th>Header1</th>
                <th>Header2</th>
                <th>Header3</th>
            </thead>
            <tbody>
                <tr>
                    <td>Row1</td>
                    <td>Row2</td>
                    <td>Row3</td>
                </tr>
            </tbody>
        </table>
```
</docs>
