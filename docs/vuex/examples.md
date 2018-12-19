## Examples

### Example 1

We create and use a basic counter

`@/state/index.ts`
```ts
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store({})
```

`@/state/counter.ts`
```ts
import { VuexModule, Module, getModule, Mutation } from "vuex-module-decorators"
import store from "@/state/store"

interface iCounter{
	COUNT: number,
	increment(delta ?: number): Promise<object>
	decrement(delta ?: number): Promise<object>
}

@Module({ dynamic: true, store, name: "Counter" })
class _counter extends VuexModule implements iCounter{
	private count: number = 0

	get COUNT(){ return this.count }

	@Mutation
	increment(delta: number = 1){ 
		if(delta < 0) throw "Increment Step cannot be less than Zero"
		this.count += delta
	}
	@Mutation
	decrement(delta: number = 1){ 
		if(delta < 0) throw "Decrement Step cannot be less than Zero"
		this.count -= delta
	}
}

export const Counter = getModule(_counter)
```

`@/App.vue`
```html
<template>
	<v-app>
		<v-label v-text="count" />
		<v-btn @click="increment" v-text="++" />
		<v-btn @click="Decrement" v-text="--" />
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Counter } from "@/state/counter"

@Component({})
export default class AppSFC extends Vue{
	get count(){ return Counter.count }
	increment(){ Counter.increment() }
	decrement(){ Counter.decrement() }
}
</script>
```

## Example 2

We create an interface that mimics the logic of the Government on petrol prices.

`@/state/index.ts`
```ts
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store({})
```

`@/state/petrol.ts`
```ts
import { VuexModule, Module, getModule, MutationAction, Mutation, Action } from "vuex-module-decorators"
import store from "@/state/store"
import CrudeService from "@/helpers/crude-service"

interface iPetrol{
	PRICE: number,
	HIKES: number,
	FALLS: number,
	initialize(delta ?: number): Promise<object>
	increment(delta ?: number): Promise<object>
	decrement(delta ?: number): Promise<object>
	inflate(delta ?: number): Promise<object>
	deflate(delta ?: number): Promise<object>
}

const TAX = 50 // in %

@Module({ dynamic: true, store, name: "Petrol" })
class _petrol extends VuexModule implements iPetrol{
	// stores international crude price
	private basePrice: number = 0
	private _hikes: number =0
	private _falls: number =0

	// returns market price
	// market price = original price + tax %
	public get PRICE(){
		return this.basePrice * ((100+TAX) / 100)
	}

	// return number of hikes
	public get HIKES(){ return this._hikes }
	// return number of falls
	public get FALLS(){ return this._falls }

	// Asynchronously initialize the petrol price
	@MutationAction({ mutate: ['basePrice'] })
	public async initialize(){
		let price = await CrudeService.current() // get market rate
		price += 10 // add 10 bucks for no reason
		return price
	}

	@Mutation
	public increment(delta: number = 1){ 
		if(delta < 0) throw "Increment Step cannot be less than Zero"
		this.basePrice += delta
		this._hikes++
	}
	@Mutation
	public decrement(delta: number = 1){ 
		if(delta < 0) throw "Decrement Step cannot be less than Zero"
		this.basePrice -= delta
		this._falls++
	}

	@MutationAction({ mutate: ['basePrice', '_hikes'] })
	public async inflate(){
		let delta = await CrudeService.getChanges({ lastPrice: this.basePrice })
		if(delta < 0) throw "Its time to increase taxes to maintain high petrol price"
		let newPrice = basePrice + delta + 2
		return { basePrice: newPrice, _hikes: this.hikes+1 }
	}

	@MutationAction({ mutate: ['basePrice', '_falls'] })
	public async deflate(){
		let delta = await CrudeService.getChanges({ lastPrice: this.basePrice })
		if(delta > 0) throw "Its time to increase the petrol price"
		let newPrice = basePrice - (delta/10)
		return { basePrice: newPrice,  _falls: this._falls+1 }
	}
}

export const Petrol = getModule(_petrol)
```

`@/App.vue`
```html
<template>
	<v-app>
		<h1>Price : Rs. {{ price }}</h1>
		<br>
		<label>Hikes : {{ hikes }}</label>
		<label>Fall : {{ falls }}</label>
		<br>
		<input type="number" v-model="step" />
		<v-btn @click="increment" v-text="Increment">
		<v-btn @click="decrement" v-text="Decrement">
		<br>
		<v-btn @click="inflate" v-text="Inflate">
		<v-btn @click="deflate" v-text="Deflate">
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Petrol } from "@/state/petrol"

@Component({})
export default class AppSFC extends Vue{
	step: number

	constructor(){
		super()
		this.step = 1
	}

	get price(){ return Petrol.PRICE }
	get hikes(){ return Petrol.HIKES }
	get falls(){ return Petrol.FALLS }

	increment(){ 
		try{ Petrol.increment(step) } 
		catch(e){ this.error(e) }
	}
	decrement(){ 
		try{ Petrol.decrement(step) } 
		catch(e){ this.error(e) }
	}

	inflate(){ 
		try{ Petrol.inflate() } 
		catch(e){ this.error(e) }
	}
	deflate(){ 
		try{ Petrol.deflate() } 
		catch(e){ this.error(e) }
	}

	error(message: string){ alert(message) }
}
</script>
```