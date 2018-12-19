### Provide 
`@Provide(key?: string | symbol)` / `@Inject(options?: { from?: InjectKey, default?: any } | InjectKey)`

```ts
// Typescript
import { Component, Inject, Provide, Vue } from 'vue-property-decorator'

const symbol = Symbol('baz')

@Component({})
export class MyComponent extends Vue {
  @Inject() foo!: string
  @Inject('bar') bar!: string
  @Inject({ from: 'optional', default: 'default' }) optional!: string
  @Inject(symbol) baz!: string


  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'
}
```
```js
// Javascript
const symbol = Symbol('baz')

export const MyComponent = Vue.extend({

  inject: {
    foo: 'foo',
    bar: 'bar',
    'optional': { from: 'optional', default: 'default' },
    [symbol]: symbol
  },
  data () {
    return {
      foo: 'foo',
      baz: 'bar'
    }
  },
  provide () {
    return {
      foo: this.foo,
      bar: this.baz
    }
  }
})
```