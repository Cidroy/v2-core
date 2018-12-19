### Mutations
The only way to actually change state in a Vuex store is by committing a mutation. Vuex mutations are very similar to events: each mutation has a string type and a handler. The handler function is where we perform actual state modifications, and it will receive the state as the first argument:
```js
// Javascript
// @/store/index.js
const store = new Vuex.Store({
  state: {
    price: 1
  },
  mutations: {
    increment (state, delta) {
      // mutate state
      state.price += delta
    }
  }
})
```

In Typescript we need to define a mutation decorator before the class to show that the function is a mutator.
```ts
// Typescript
// declaration in `store/petrol.ts`
import { VuexModule, Module, getModule, Mutation } from "vuex-module-decorators"
import store from "@/state/store"

@Module({ dynamic: true, store, name: "petrol" })
class _petrol extends VuexModule{
	private price: number = 0
	
	@Mutation
	public increment(delta: number){ this.price += delta }
	@Mutation
	public decrement(delta: number){ this.price -= delta }
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
	}
}
```

With usage as follows
```ts
// Typescript
// @/App.vue
import { Component, Vue } from "vue-property-decorator"
import { petrol }from "@/store/petrol"

@Component({})
export default class PetrolPrices extends Vue{
	onIncrementButtonClick(){ petrol.increment(2) }
	onDecrementButtonClick(){ petrol.decrement(0.02) }
}
```
```js
// Javascript
// App.vue
export default {
	methods: {
		onIncrementButtonClick(){ this.$store.commit('increment', 2) }
		onDecrementButtonClick(){ this.$store.commit('decrement', 0.02) }
	}
}
```