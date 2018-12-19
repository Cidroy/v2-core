### State

All the class members are converted into the stores state.
It is advised that all the states be declared as private to mitigate any errors that may come as a result of trying to access state directly.

This makes the declaration as follows
```ts
// Typescript
// declaration in `store/moduleA.ts`
import { VuexModule, Module, getModule } from "vuex-module-decorators"
import store from "@/state/store"

@Module({ dynamic: true, store, name: "moduleA" })
class _moduleA extends VuexModule{
	private count: number = 0
}

export const moduleA = getModule(_moduleA)
```
```js
// Javascript
// moduleA.js
export default {
	state : {
		count: 0,
	}
}
// store.js
const moduleA = require('./moduleA.js')

const store = new Vuex.Store({
	modules: {
		moduleA
	}
})
```

It is advised to use an interface implementation of the Vuex module as follows for better understating
```ts
// Typescript
// declaration in `store/moduleA.ts`
interface iModuleA{
	...
}

@Module({ dynamic: true, store, name: "moduleA" })
class _moduleA extends VuexModule implements iModuleA{
	...
}
```

Since we make the states private, we can not use them. Although incase of public states the usage is as follows
```ts
// Typescript
// @/store/moduleA.ts
import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"

@Module({ dynamic: true, store, name: "moduleA" })
class _moduleA extends VuexModule{
	public count: number = 0
}

export const moduleA = getModule(_moduleA)

// @/App.vue
import { Component, Vue } from "vue-property-decorator"
import { moduleA }from "@/store/moduleA"

@Component({})
export default class AppSFC extends Vue{
	get count(){
		return moduleA.count
	}
}
```
```js
// Javascript
// @/store/index.js
export default Vuex.store({
	state : {
		count: 0,
	}
})

// App.vue
export default {
	computed: {
		count(){
			return this.$store.state.count
		}
	}
}

```