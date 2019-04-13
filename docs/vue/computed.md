### Computed Properties
All the class getters are converted into computed properties
```ts
// Typescript
import { Component, Vue } from "vue-property-decorator"

// @ts-ignore
@Component({})
export default class AppSFC extends Vue.default {
	firstName: string = ""
	lastName: string = ""
	get name(){
		return this.firstName + this.lastName
	}
}
```
```js
// Javascript
export default {
	data: () => ({
		firstName: "",
		lastName: "",
	}),
	computed: {
		name(){
			return this.firstName + this.lastName
		}
	}
}
```