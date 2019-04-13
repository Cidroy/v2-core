### Watch variables
`@Watch(variable: string, options?: WatchOptions = {})`

To create a watcher just add the watch class decorator infront of a member function.
```ts
// Typescript
import { Component, Vue, Watch } from "vue-property-decorator"

// @ts-ignore
@Component({})
export default class AppSFC extends Vue.default {
	username: string = ""

	@Watch('username')
	onUsernameChange(newVal: string, oldVal: string){
		//logic
	}
}
```
```js
// Javascript
export default {
	data: () => ({
		username: "",
	}),
	watch: {
		'username' : {
			handler: 'onUsernameChange',
			deep: false,
			immediate: false,
		}
	},
	methods: {
		onUsernameChange(newVal, oldVal){
			// logic
		}
	}
}
```