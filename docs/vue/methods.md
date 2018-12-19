### Methods
All the public methods in the class are converted into methods by default unless a decorator specifies otherwise.
```ts
// Typescript
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class AppSFC extends Vue{
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