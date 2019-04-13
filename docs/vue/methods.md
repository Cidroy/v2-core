### Methods
All the public methods in the class are converted into methods by default unless a decorator specifies otherwise.
```ts
// Typescript
import { Component, Vue } from "vue-property-decorator"

// @ts-ignore
@Component({})
export default class AppSFC extends Vue.default {
	validator(){}
}
```
```js
// Javascript
export default {
	methods: {
		validator(){}
	}
}
```