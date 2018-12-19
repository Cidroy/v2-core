## Actions
Actions are similar to mutations, the differences being that:

Instead of mutating the state, actions commit mutations.
Actions can contain arbitrary asynchronous operations.
Let's register a simple action:
```js
// Javascript
// petrol.js
const store = new Vuex.Store({
	state: {
		price: 1
	},
	mutations: {
		increment (state, delta = 1) { state.price += delta }
	},
	actions: {
		increment (context) {
			context.commit('increment',2)
		}
	}
})
```

To perform the same in Typescript we just need to add the Action decorator and state the mutation that needs to be performed in the decorator parameter. Although unlike the javascript part here mutations and actions cannot have the same name, so do change that.

The Value returned by the Action method is used as the payload for the commit
```ts
// Typescript
// declaration in `store/petrol.ts`
import { VuexModule, Module, getModule, Mutation, Action } from "vuex-module-decorators"
import store from "@/state/store"

@Module({ dynamic: true, store, name: "petrol" })
class _petrol extends VuexModule{
	private price: number = 0
	
	@Mutation
	public increment(delta: number){ this.price += delta }
	@Mutation
	public decrement(delta: number){ this.price -= delta }

	@Action({ commit: 'increment' })
	public inflate(){ return 5 }
	@Action({ commit: 'decrement' })
	public deflate(){ return 2 }
}

export const petrol = getModule(_petrol)
```
```js
// Javascript
// petrol.js
export default {
	state : {
		price: 0,
	},
	mutations: {
		increment (state, delta) { state.price += delta }
		decrement (state, delta) { state.price -= delta }
	},
	actions: {
		inflate (context) {
			context.commit('increment', 5)
		},
		deflate ({ commit }) { // if you do not want to use context
			commit('decrement', 2)
		}
	}
}
```

Which makes the usage as follows
```ts
// Typescript
// @/App.vue
import { Component, Vue } from "vue-property-decorator"
import { petrol }from "@/store/petrol"

@Component({})
export default class PetrolPrices extends Vue{
	onInflation(){ petrol.inflate() }
	onDeflation(){ petrol.deflate() }
}
```
```js
// Javascript
// App.vue
export default {
	methods: {
		onInflation(){ this.$store.dispatch('inflate') }
		onDeflation(){ this.$store.dispatch('deflate') }
	}
}
```

A Simple demonstration of the async capability of the actions are as follows:

Here the `updateInflation` will wait till the updated changes has been received and then commits the changes.
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
	public update(delta: number){ this.price += delta }

	@Action({ commit: 'update' })
	public async updateInflation(){ 
		let delta = await crudePriceService.getChanges({ lastPrice: this.price })
		if(delta > 0)
			return delta++
		else 
			return delta/10
	}
}

export const petrol = getModule(_petrol)
```
```js
// Javascript
// petrol.js
import crudePriceService from "crude-price"

export default {
	state : {
		price: 0,
	},
	mutations: {
		update (state, delta) { state.price += delta }
	},
	actions: {
		async updateInflation (context) {
			var delta = await crudePriceService.getChanges({ 
				lastPrice: context.state.price 
			})
			context.commit('update', delta)
		}
	}
}
```
