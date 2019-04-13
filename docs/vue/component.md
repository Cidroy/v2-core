### Vue Functions and Life-cycles methods
If you do not wish to add a method or member into the `methods` or `data` fields of vue respectively or you intent to use vue life-cycles, then you must add those methods into the component decorator.
```ts
// Typescript
import { Component, Vue } from "vue-property-decorator"

// @ts-ignore
@Component({
	beforeCreate(){}
	'vue-meta': {}
})
export default class AppSFC extends Vue.default {
	validator(){}
}
```
```js
// Javascript
export default {
	methods: {
		validator(){}
	},
	beforeCreate(){}
	'vue-meta': {}
}
```