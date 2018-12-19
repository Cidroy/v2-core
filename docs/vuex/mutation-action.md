### Mutation Action
Sometimes we would like to always do a certain mutation on data after a specific action. It is very tedious to write a mutation and action separately. For example to initialize the default price: 
```js
// Javascript
// petrol.js
import crudePriceService from "crude-price"

const store = new Vuex.Store({
	state: {
		price: 0
	},
	mutations: {
		initialize (state, delta) { state.price = delta }
	},
	actions: {
		async initialize (context) {
			var delta = await crudePriceService.current()
			context.commit('initialize',delta + 3)
		}
	}
})
```
The above is the only way to do an initialization. This is still seen in typescript with an implementation like the following
```ts
// Typescript
// declaration in `store/petrol.ts`
import { VuexModule, Module, getModule, Mutation, Action } from "vuex-module-decorators"
import store from "@/state/store"
import crudePriceService from "crude-price"

@Module({ dynamic: true, store, name: "petrol" })
class _petrol extends VuexModule{
	private price: number = 0
	
	@Mutation
	public initialize(delta: number){ this.price += delta }

	@Action({ commit: 'initialize' })
	public async Initialize(){ 
		let delta = await crudePriceService.current()
		return delta + 3
	}
}
export const petrol = getModule(_petrol)
```

### `MutationAction` Decorator to the rescue!

We can combine the functionality of mutation and action together into a single function making it asynchronous and able to commit data itself. All the decorator needs is a list of values it will be modifying, it can modify a single state or multiple state. 

Example:
```ts
// Typescript
// declaration in `store/petrol.ts`
import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"
import crudePriceService from "crude-price"

@Module({ dynamic: true, store, name: "petrol" })
class _petrol extends VuexModule{
	private price: number = 0
	
	@MutationAction({ mutate: ['price'] })
	public async Initialize(){ 
		let delta = await crudePriceService.current()
		return { price: delta + 3 }
	}
}
export const petrol = getModule(_petrol)
```

To update multiple entities at once
```ts
// Typescript
// declaration in `store/petrol.ts`
import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"
import crudePriceService from "crude-price"

@Module({ dynamic: true, store, name: "petrol" })
class _petrol extends VuexModule{
	private price: number = 0
	private updatedTime!: DateTime
	
	@MutationAction({ mutate: ['price', 'updatedTime'] })
	public async Initialize(){ 
		let delta = await crudePriceService.current()
		return { price: delta + 3, updatedTime: new Date() }
	}
}
export const petrol = getModule(_petrol)
```
