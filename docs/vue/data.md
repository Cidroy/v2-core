### Data
All the public members in the class are converted into data elements by default unless a decorator specifies otherwise.
```ts
// Typescript
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class AppSFC extends Vue{
	username: string = ""
	password: string = ""
	valid: boolean = false
}
```
```js
// Javascript
export default {
	data: () => ({
		username: "",
		password: "",
		valid: false,
	})
}
```