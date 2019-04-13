### Model
`@Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})`

```ts
// Typescript
import { Vue, Component, Model } from 'vue-property-decorator'

// @ts-ignore
@Component({})
export default class YourComponent extends Vue.default {
  @Model('change', { type: Boolean }) checked!: boolean
}
```
```js
// Javascript
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean
    },
  },
}
```
