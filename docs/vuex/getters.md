### Getters

Sometimes we may need to compute derived state based on store state, for example filtering through a list of items and counting them

```js
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```
If more than one component needs to make use of this, we have to either duplicate the function, or extract it into a shared helper and import it in multiple places - both are less than ideal.

Vuex allows us to define "getters" in the store. You can think of them as computed properties for stores. Like computed properties, a getter's result is cached based on its dependencies, and will only re-evaluate when some of its dependencies have changed.

In Typescript class style getters all you have to do is create a getter function which is automatically detected and used as a getter.
```ts
// Typescript
// declaration in `store/moduleA.ts`
import { VuexModule, Module, getModule } from "vuex-module-decorators"
import store from "@/state/store"

type Todo = { id: number, text: string, done: boolean }

@Module({ dynamic: true, store, name: "moduleA" })
class _moduleA extends VuexModule{
	private todos: Todo[] = []
	public get doneTodos(){ return this.todos.filter(todo => todo.done) }
	public get allTodos(){ return this.todos }
}

export const moduleA = getModule(_moduleA)
```
```js
// Javascript
// moduleA.js
export default {
	state : {
		todos: [],
	},
	getters: {
		doneTodos: state => {
			return state.todos.filter(todo => todo.done)
		},
		allTodos: state => {
			return state.todos
		},
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

Which makes the usage as follows :
```ts
// Typescript
// @/App.vue
import { Component, Vue } from "vue-property-decorator"
import { moduleA }from "@/store/moduleA"

// @ts-ignore
@Component({})
export default class AppSFC extends Vue.default {
	get doneTodos(){ return moduleA.doneTodos }
	get allTodos(){ return moduleA.allTodos }
}
```
```js
// Javascript
// App.vue
export default {
	computed: {
		doneTodos(){
			return this.$store.getters.doneTodos
		},
		allTodos(){
			return this.$store.getters.allTodos
		}
	}
}
```