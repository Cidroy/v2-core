### Props
`@Prop(options: (PropOptions | Constructor[] | Constructor) = {})`

To define any class member as prop just add the Prop decorator to that variable.

```ts
// Typescript
import { Vue, Component, Prop } from 'vue-property-decorator'

// @ts-ignore
@Component({})
export default class YourComponent extends Vue.default {
  @Prop(Number) propA!: number
  @Prop({ default: 'default value' }) propB!: string
  @Prop([String, Boolean]) propC: string | boolean
}
```
```js
// Javascript
export default {
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    },
  }
}
```