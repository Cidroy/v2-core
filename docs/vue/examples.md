## Examples

### Example 1

A Basic Counter Component
`couter.vue`
```html
<template>
	<v-layout row wrap>
		<v-flex xs12>
			<h1 class="title" v-text="count">
		</v-flex>
		<v-flex xs6> <v-btn flat block @click="increment" v-text="'+'"> </v-flex>
		<v-flex xs6> <v-btn flat block @click="decrement" v-text="'-'"> </v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

// @ts-ignore
@Component({
	created(){
		this.count = this.start
	}
})
export default class CounterComponent extends Vue.default {
	count!: number

	increment(){ this.count++ }
	decrement(){ this.count-- }

	@Prop({ type: Number, default: 0 })
	start !: number
}
</script>
```

Usage
`@/App.vue`
```html
<template>
	<v-app>
		<app-counter :start="1" />
		<app-counter :start="2" />
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import appCounter from "./counter.vue"

@Component({
	components: { appComponent }
})
export default AppSFC extends Vue.default {}
</script>
```

### Example 2

A petrol Price controller component

`petrol.vue`
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
import { Component, Emit, Vue } from "vue-property-decorator"
import { Petrol } from "@/state/petrol"

@Component({})
export default class AppSFC extends Vue.default {
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
		this.updated()
	}
	decrement(){
		try{ Petrol.decrement(step) }
		catch(e){ this.error(e) }
		this.updated()
	}

	inflate(){
		try{ Petrol.inflate() }
		catch(e){ this.error(e) }
		this.updated()
	}
	deflate(){
		try{ Petrol.deflate() }
		catch(e){ this.error(e) }
		this.updated()
	}

	@Emit()
	error(message: string){
		alert(message)
		return message
	}

	@Emit()
	updated(){
		return Petrol.PRICE
	}
}
</script>
```

Usage
`@/App.vue`
```html
<template>
	<v-app>
		<app-petrol @updated="onUpdate" @error="onError" />
		<br>
		<label> Total Updates : {{ updates }} </label>
		<label> Last Error : {{ error }} @ {{ time }} </label>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import appPetrol from "./petrol.vue"

@Component({
	components: { appPetrol }
})
export default class AppSFC extends Vue.default {
	updates: number = 0
	error: strinig = "None"
	time: Date = new Date()

	onError(e){
		this.error = e
		this.time = new Date()
	}
	onUpdate(){ this.updates++ }
}
```
